const prisma = require("../config/prisma");
const { ClientError, NotFoundError } = require("../config/error");
const messageSchema = require("../utils/validators/message.validator");

async function saveMessage(data) {
    const { error, value } = messageSchema.validate(data, { stripUnknown: true });

    if (error) {
        throw new ClientError({ text: error.message, data: value });
    }

    try {
        return await prisma.messages.create({ data: value });
    } catch (err) {
        console.error(err);
        throw new ClientError("Failed to save message.");
    }
}

async function removeMessage(messageId) {
    try {
        return await prisma.messages.delete({
            where: { id: messageId }
        });
    } catch (err) {
        throw new NotFoundError("Message not found");
    }
}

async function getMessages(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
        prisma.messages.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" }
        }),
        prisma.messages.count()
    ]);

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: messages
    };
}

async function getMessage(messageId) {
    const message = await prisma.messages.findUnique({
        where: { id: messageId }
    });

    if (!message) {
        throw new NotFoundError("Message not found");
    }

    if (message.isRead) {
        return message;
    }

    return await prisma.messages.update({
        where: { id: messageId },
        data: { isRead: true }
    });
}

async function countUnreadMessages(userId) {
    return await prisma.messages.count({
        where: { isRead: false }
    });
}

module.exports = {
    saveMessage,
    removeMessage,
    getMessages,
    getMessage,
    countUnreadMessages
};

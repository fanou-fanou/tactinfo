const prisma = require("../config/prisma").default;
const { ClientError } = require("../config/error");
const messageSchema = require("../utils/validators/message.validator");


async function saveMessage(data) {
    const { error, value } = messageSchema.validate(data);
    delete value._csrf;

    if (error) {

        throw new ClientError({
            text: error.message,
            data: value
        });
    }

    const message = await prisma.messages.create({ ...value });
    return message ? message : value;
}

module.exports = {
    saveMessage
}
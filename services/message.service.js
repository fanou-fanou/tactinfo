const prisma = require("../config/prisma");
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


    try {
        const message = await prisma.messages.create({ data: { ...value } });

        return message ? message : value;
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    saveMessage
}
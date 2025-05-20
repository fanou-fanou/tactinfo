const prisma = require("../config/prisma");
const messageSchema = require("../utils/validators/message.validator");


const saveMessage = async (data) => {
    const { error, value } = messageSchema.validate(data);
    delete value._csrf;

}
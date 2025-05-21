const MessageResource = require("../resources/messages.resource");
const ModuleResource = require("../resources/module.resource");

module.exports = [
    { prefix: "/messages", resource: MessageResource },
    { prefix: "/modules", resource: ModuleResource }
]
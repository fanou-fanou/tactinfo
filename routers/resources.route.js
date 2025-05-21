const MessageResource = require("../resources/messages.resource");
const ModuleResource = require("../resources/module.resource");
const TrainingResource = require("../resources/training.resource");

module.exports = [
    { prefix: "/messages", resource: MessageResource },
    { prefix: "/modules", resource: ModuleResource },
    { prefix: "/trainings", resource: TrainingResource }
]
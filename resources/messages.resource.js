const { Router } = require("express");
const {
    getMessages,
    getMessage,
    removeMessage,
    countUnreadMessages,
} = require("../services/message.service");
const { hasAnyRole } = require("../config/authorization");

const MessageResource = Router();

MessageResource.get("/all", hasAnyRole(["ADMIN", "STAFF"]), async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    try {
        const data = await getMessages(page, limit);
        return res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});


MessageResource.get("/:id", hasAnyRole(["ADMIN", "STAFF"]), async (req, res, next) => {
    try {
        const message = await getMessage(req.params.id);
        return res.status(200).json(message);
    } catch (err) {
        next(err);
    }
});


MessageResource.delete("/:id", hasAnyRole(["ADMIN"]), async (req, res, next) => {
    try {
        const result = await removeMessage(req.params.id);
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

MessageResource.get("/count/unread", hasAnyRole(["ADMIN", "STAFF"]), async (req, res, next) => {
    try {
        const count = await countUnreadMessages();
        return res.status(200).json({ unread: count });
    } catch (err) {
        next(err);
    }
});

module.exports = MessageResource;

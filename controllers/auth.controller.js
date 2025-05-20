const { Router } = require("express");

const AuthController = Router();

AuthController.get("/login", (request, response) => {
    return response.render("home/base", {
        title: "login",
        body: "auth/login"
    });
});

AuthController.get("/register", (request, response) => {
    return response.render("home/base", {
        title: "register",
        body: "auth/register"
    });
});

module.exports = AuthController;

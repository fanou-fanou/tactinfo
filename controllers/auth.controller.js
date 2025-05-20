const { Router } = require("express");
const passport = require("passport");

const AuthController = Router();

AuthController.get("/login", function (request, response) {
    return response.render("auth/login");
});

AuthController.post("/login", passport.authenticate("local", {
    successRedirect: "/app",
    failureRedirect: "/login",
    failureFlash: true,
}), function (request, response) {
    response.redirect("/login");
});

AuthController.post("/logout", function (request, response) {
    request.logout(function () {
        request.flash('success', "you're logged out");
        response.redirect('/login');
    });
});

module.exports = AuthController;

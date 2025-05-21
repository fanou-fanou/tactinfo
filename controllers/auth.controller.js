const { Router } = require("express");
const passport = require("passport");
const { isNotAuthenticated, isAuthenticated } = require("../config/authorization");

const AuthController = Router();

AuthController.get("/login", isNotAuthenticated, function (request, response) {
    return response.render("auth/login");
});

AuthController.post("/login", isNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/app",
    failureRedirect: "/login",
    failureFlash: true,
}), function (request, response) {
    response.redirect("/login");
});

AuthController.post("/logout", isAuthenticated, function (request, response) {
    request.logout(function () {
        request.flash('success', "you're logged out");
        response.redirect('/login');
    });
});

AuthController.get("/current/user", isAuthenticated, function (request, repsonse) {
    return repsonse.status(200).json(request.user);
})

module.exports = AuthController;

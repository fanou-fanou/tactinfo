const { saveMessage } = require("../services/message.service");

const { Router } = require("express");

const HomeController = Router();

HomeController.get("/", function (request, response) {
    response.render("home/index");
});

HomeController.get("/about", function (request, response) {
    response.render("home/about");
});


HomeController.get("/service", function (request, response) {
    response.render("home/service");
});

HomeController.get("/contact", function (request, response) {
    response.render("home/contact");
});

HomeController.post("/contact", async function (request, response) {
    try {
        await saveMessage(request.body);
        request.flash("success", "message sent");
        return response.redirect('/contact');
    } catch (error) {
        return response.render("home/contact", {
            title: "contact",
            body: "home/contact",
            form: error.message.data,
            error: error.message.text
        });
    }
});



module.exports = HomeController;

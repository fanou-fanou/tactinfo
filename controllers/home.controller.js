const { Router } = require("express");

const HomeController = Router();

HomeController.get("/", (request, response) => {
    return response.render("home/base", {
        title: "home ",
        body: "home/index"
    });
});

HomeController.get("/about", (request, response) => {
    return response.render("home/base", {
        title: "about ",
        body: "home/about"
    });
});

HomeController.get("/contact", (request, response) => {
    return response.render("home/base", {
        title: "contact ",
        body: "home/contact"
    });
});

HomeController.get("/service", (request, response) => {
    return response.render("home/base", {
        title: "service",
        body: "home/service"
    })
})

module.exports = HomeController;

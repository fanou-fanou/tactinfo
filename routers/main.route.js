const AuthController = require("../controllers/auth.controller");
const HomeController = require("../controllers/home.controller");


module.exports = [
    { prefix: "/", controller: HomeController },
    { prefix: "/", controller: AuthController }
];


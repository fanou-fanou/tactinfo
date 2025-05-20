const path = require("path");
const { Eta } = require("eta");
const env = require("./env");

const eta = new Eta({
    views: path.join(__dirname, "..", "templates"),
    cache: env.mode != "dev"
});

module.exports = eta;

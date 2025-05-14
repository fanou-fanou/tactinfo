const path = require("path");
const { Eta } = require("eta");

const eta = new Eta({
    views: path.join(__dirname, "templates"),
    cache: false
});

module.exports = eta
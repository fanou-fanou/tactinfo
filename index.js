const express = require("express");
const etaConfig = require("./config/eta");
const mainRoute = require("./routers/main.route");
const buildEtaEngine = require("./config/engine");
const env = require("./config/env");
const middlewares = require("./config/middlewares/middlewares");
const errorHandler = require("./config/middlewares/error.middleware");

const app = express();
const isDev = env.mode !== "prod";

middlewares.forEach(middleware => app.use(middleware));

app.engine("eta", buildEtaEngine());
app.set("view engine", "eta");
app.set("views", etaConfig.config.views);

mainRoute.forEach(route => app.use(route.prefix, route.controller));
app.use(errorHandler);

app.listen(9000, () => {
    if (isDev) {
        console.log("http://localhost:9000");
    }
});
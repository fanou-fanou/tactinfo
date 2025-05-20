const express = require("express");
const mainRoute = require("./routers/main.route");
const env = require("./config/env");
const engine = require("./config/engine");
const middlewares = require("./config/middlewares/middlewares");
const errorHandler = require("./config/middlewares/error.middleware");

const app = express();
const isDev = env.mode == "dev";

middlewares.forEach(middleware => app.use(middleware));

engine(app);

mainRoute.forEach(route => app.use(route.prefix, route.controller));
app.use(errorHandler);

app.listen(9000, () => {
    if (isDev) {
        console.log("http://localhost:9000");
    }
});

const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("../cors");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("../env");
const compression = require("compression");
const session = require("express-session");
const sessionConfig = require("../session");
const flash = require("connect-flash");
const csurf = require("csurf");
const passport = require("passport");
const shared = require("../shared");

const csrfProtection = csurf();

module.exports = [
    cors(corsOptions),
    helmet(),
    morgan(env.mode),
    compression(),
    express.static(path.join(__dirname, "../..", "public")),
    express.urlencoded({ extended: false }),
    express.json(),
    session(sessionConfig),
    flash(),
    csrfProtection,
    passport.initialize(),
    passport.session(),
    shared
];

const env = require("./env");

const sessionConfig = {
    secret: env.session_secret || "session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: 'lax',
        httpOnly: true,
        secure: env.mode === 'prod',
    }
}

module.exports = sessionConfig
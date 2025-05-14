const { config } = require("dotenv");

config();

module.exports = {
    port: process.env.PORT || 8000,
    mode: process.env.NODE_ENV || "dev",
    session_secret: process.env.SESSION_SECRET || "SESSION_SECRET"
}
const env = require("../env");
const { CustomError } = require("../error");

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            message: err.message,
        });
    }

    if (env.mode === "development") {
        console.error(err);
    }

    return res.status(500).json({
        status: 500,
        message: "An unexpected error occurred",
    });
};

module.exports = errorHandler;

function CustomError(status, message) {
    Error.call(this, message);
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

function ClientError(message) {
    CustomError.call(this, 400, message);
}
ClientError.prototype = Object.create(CustomError.prototype);
ClientError.prototype.constructor = ClientError;

function NotFoundError(message) {
    CustomError.call(this, 404, message);
}
NotFoundError.prototype = Object.create(CustomError.prototype);
NotFoundError.prototype.constructor = NotFoundError;

function ServerError(message) {
    CustomError.call(this, 500, message);
}
ServerError.prototype = Object.create(CustomError.prototype);
ServerError.prototype.constructor = ServerError;

function BadGatewayError(message) {
    CustomError.call(this, 405, message || "bad gateway");
}
BadGatewayError.prototype = Object.create(CustomError.prototype);
BadGatewayError.prototype.constructor = BadGatewayError;

function Unauthorized(message) {
    CustomError.call(this, 401, message);
}
Unauthorized.prototype = Object.create(CustomError.prototype);
Unauthorized.prototype.constructor = Unauthorized;

function Forbiden(message) {
    CustomError.call(this, 403, message);
}
Forbiden.prototype = Object.create(CustomError.prototype);
Forbiden.prototype.constructor = Forbiden;

module.exports = {
    CustomError,
    ClientError,
    NotFoundError,
    ServerError,
    BadGatewayError,
    Unauthorized,
    Forbiden
};

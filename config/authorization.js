const { Unauthorized } = require("./error");

function isProtected(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    throw new Unauthorized("Unauthorized");
};

function isAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    return response.redirect('/login');
};

function isNotAuthenticated() {
    if (!request.isAuthenticated()) {
        return next();
    }
    const redirectPath = {
        ADMIN: "/admin",
        STUDENT: "/app",
        PROFESSOR: "/app",
        STAFF: "/app",
    };
    return response.redirect(redirectPath[request.user.role]);
}

function hasRole(role) {
    return function (request, response, next) {
        if (request.isAuthenticated() && request.user.role === role) {
            return next();
        }
        return response.render('errors/404.error.njk');
    }
}

function hasAnyRole(roles) {
    return function (request, response, next) {
        if (request.isAuthenticated() && roles.includes(request.user.role)) {
            return next();
        }
        return response.render('error/404.error.njk');
    }
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    isProtected,
    hasAnyRole,
    hasRole
}
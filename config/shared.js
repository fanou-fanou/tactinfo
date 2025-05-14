module.exports = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    response.locals.error = request.flash('error');
    response.locals.success = request.flash('success');
    next();
};
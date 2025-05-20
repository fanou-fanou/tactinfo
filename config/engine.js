const nunjucks = require('nunjucks');
const path = require("path");
const env = require("./env");

const isDev = env.mode == 'dev';

module.exports = function engine(app) {
    nunjucks.configure(path.join(__dirname, '..', 'templates'), {
        autoescape: true,
        express: app,
        noCache: isDev,
        watch: isDev,
        throwOnUndefined: false,
        watch: isDev,
    });

    app.set('view engine', 'njk');
}


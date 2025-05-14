const buildEtaEngine = () => {
    return (filePath, options, callback) => {
        try {
            const template = eta.readFile(filePath);
            const rendered = eta.renderString(template, options);
            callback(null, rendered);
        } catch (err) {
            callback(err);
        }
    };
};

module.exports = buildEtaEngine;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (config) => {
    config.plugins.push(
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(html|css|js|json)/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    );

    return config;
};

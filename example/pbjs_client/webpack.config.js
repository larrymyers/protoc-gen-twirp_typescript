const path = require('path');

module.exports = {
    entry: './main',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },

    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        contentBase: 'public',
        host: '0.0.0.0',
        port: 8081
    }
};

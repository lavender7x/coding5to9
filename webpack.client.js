const path = require('path');

const webpackMode = process.env.mode || 'development';

module.exports = {
    entry: './misc/script.ts',
    target: 'web',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'script.js',
        publicPath: '/'
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }]
                        ]
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
};


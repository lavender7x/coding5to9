const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMode = process.env.mode || 'development';

module.exports = {
    entry: './src/server/index.tsx',
    target: 'node',
    mode: webpackMode,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    // TODO
    optimization: {
        minimize: false
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
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../static/style.css',
        })
    ]
};


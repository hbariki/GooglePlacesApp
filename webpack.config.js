const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: './js/index.js'
    },
    target: 'web',
    output: {
        path: path.resolve('dist'),
        publicPath: '/dist',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './'
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    module: {
        rules: [
            { test: /\.js$/, enforce: 'pre', exclude: /node_modules/, loader: 'eslint-loader' },
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            {test: /(\.css)$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap') },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
            {test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"}
        ]
    }
};

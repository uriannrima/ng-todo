var webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {
    const path = `${__dirname}/dist/${env}`;
    return Merge(CommonConfig, {
        devtool: 'cheap-module-eval-source-map',
        output: {
            path: path,
            publicPath: 'http://localhost:24028/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },
        plugins: [
            new ExtractTextPlugin('[name].css')
        ],
        devServer: {
            historyApiFallback: true,
            stats: 'minimal'
        }
    })
}
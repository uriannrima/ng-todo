var webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {
    const path = `${__dirname}/src`;
    return Merge(CommonConfig, {
        devtool: 'inline-sourcemap',
        output: {
            path: path,
            filename: "index.js"
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
            new ExtractTextPlugin('styles.css'),
            new HtmlWebpackPlugin({ template: 'index.ejs', alwaysWriteToDisk: true }),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)@angular/, path
            )
        ]
    })
}
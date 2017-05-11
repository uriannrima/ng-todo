var webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {
    const path = `${__dirname}/dist/${env}`;
    return Merge(CommonConfig, {
        devtool: 'cheap-module-source-map', 
        output: {
            path: path, 
            filename: "scripts.[chunkhash].js" 
        },
        plugins: [
            new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
            new CleanWebpackPlugin([path]),
            new HtmlWebpackPlugin({ minify: { collapseWhitespace: true }, template: 'index.ejs' }),
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[chunkhash].js' }),
            new ExtractTextPlugin('styles.[chunkhash].css'),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true, beautify: false, comments: false, sourceMap: true,
                mangle: { screw_ie8: true, keep_fnames: true }, compress: { screw_ie8: true }
            }),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)@angular/, path
            )
        ]
    })
}
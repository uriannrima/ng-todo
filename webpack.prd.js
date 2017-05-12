const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const helpers = require('./helpers');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {
    const path = `${__dirname}/dist/${env}`;
    return Merge(CommonConfig, {
        devtool: 'cheap-module-source-map',
        output: {
            path: helpers.root('dist', env),
            filename: '[name].[hash].js',
            chunkFilename: '[id].[hash].chunk.js'
        },
        plugins: [
            new CleanWebpackPlugin(
                [path]
            ),
            new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
                sourceMap: true,
                mangle: { keep_fnames: true }
            }),
            new ExtractTextPlugin('[name].[hash].css'),
            new webpack.DefinePlugin({
                'process.env': { 'ENV': JSON.stringify(ENV) }
            }),
            new webpack.LoaderOptionsPlugin({
                htmlLoader: {
                    minimize: false // workaround for ng2
                }
            })
        ]
    })
}
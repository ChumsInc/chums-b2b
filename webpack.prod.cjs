const {merge} = require('webpack-merge');
const common = require('./webpack.common.cjs');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {ecma: 8},
                    compress: {ecma: 5, warnings: false, inline: 2},
                    mangle: {safari10: true},
                    output: {ecma: 5, comments: false, ascii_only: true},
                    keep_fnames: true,
                    keep_classnames: true,
                },
                parallel: true,
                extractComments: false,
                // cache: true,
            })
        ],
    },
    output: {
        filename: "[name].[contenthash].js",
        clean: true,
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
        new WebpackManifestPlugin(),
    ]
});

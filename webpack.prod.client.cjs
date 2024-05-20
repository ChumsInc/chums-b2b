const {merge} = require('webpack-merge');
const common = require('./webpack.common.cjs');
const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {WebpackManifestPlugin} = require("webpack-manifest-plugin");
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const clientConfig = {
    target: 'web',
    mode: 'production',
    devtool: 'source-map',
    entry: './src/client/index.tsx',

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {ecma: 8},
                    compress: {ecma: 5, warnings: false, inline: 2},
                    mangle: {safari10: true},
                    output: {ecma: 5, comments: false, ascii_only: true}
                },
                parallel: true,
                extractComments: false,
                // cache: true,
            })
        ],
    },
    output: {
        path: path.resolve(__dirname, './public/build'),
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        publicPath: '/build',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin({}),
        new BundleAnalyzerPlugin(),

    ]
}

module.exports = merge(common, clientConfig);
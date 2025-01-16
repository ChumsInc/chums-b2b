import {merge} from 'webpack-merge';
import common from './webpack.common.mjs';
import path from 'node:path';
import process from 'node:process'
import webpack from 'webpack';
import {WebpackManifestPlugin} from "webpack-manifest-plugin";
import TerserPlugin from 'terser-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

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
        path: path.resolve(process.cwd(), './public/build'),
        filename: "[name].[contenthash:8].js",
        sourceMapFilename: '[file].map',
        publicPath: '/build',
        clean: true,
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            append: `\n //# sourceMappingURL=/build/[url]`
        }),
        new WebpackManifestPlugin({}),
        new BundleAnalyzerPlugin({}),
    ]
}

export default merge(common, clientConfig);

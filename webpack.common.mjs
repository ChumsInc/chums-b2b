import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import path from "node:path";
import process from "node:process";

export default {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@src': path.resolve(process.cwd(), 'src'),
            '@api': path.resolve(process.cwd(), 'src/api'),
            '@app': path.resolve(process.cwd(), 'src/app'),
            '@components': path.resolve(process.cwd(), 'src/components'),
            '@constants': path.resolve(process.cwd(), 'src/constants'),
            '@ducks': path.resolve(process.cwd(), 'src/ducks'),
            '@hooks': path.resolve(process.cwd(), 'src/hooks'),
            '@typeDefs': path.resolve(process.cwd(), 'src/types'),
            '@utils': path.resolve(process.cwd(), 'src/utils'),
        },
        plugins: [
            new TsconfigPathsPlugin({
                extensions: ['.tsx', '.ts', '.js'],
            }),
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                chums: {
                    test: /[\\/]common-components[\\/]/,
                    name: 'chums',
                    chunks: 'all',
                },
            }
        }
    },
}

import {merge} from 'webpack-merge';
import common from './webpack.common.mjs';
import path from 'node:path';
import process from 'node:process';

const serverConfig = {
    target: 'node',
    mode: 'development',
    name: 'server',
    entry: {
        server: './src/server/index.tsx'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(process.cwd(), './dist'),
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        publicPath: '/',
    },
}

export default merge(common, serverConfig);

import {merge} from 'webpack-merge';
import common from './webpack.common.mjs';
import path from 'node:path';
import process from 'node:process'

const localProxy = {
    target: 'http://localhost',
    changeOrigin: true,
    secure: false,
};

const clientConfig = {
    target: 'web',
    mode: 'development',
    entry: {
        main: [
            './src/client/index.tsx',
        ],
    },
    devtool: 'source-map',
    devServer: {
        compress: true,
        client: {
            // logging: 'warn',
            overlay: {
                runtimeErrors: (error) => {
                    console.log(error);
                    return error instanceof DOMException && error.name === 'ResizeObserver';
                }
            }
        },
        historyApiFallback: true,
        static: [
            {directory: path.join(process.cwd(), 'public'), watch: false},
            {directory: path.join(process.cwd()), watch: false}
        ],
        hot: true,
        proxy: [
            {
                context: ['/api', '/node_modules', '/node-sage', '/sage', '/version'],
                ...localProxy
            },
            {
                context: ['/images', '/pdf', '/files'],
                target: 'https://b2b.chums.com',
                changeOrigin: true,
                secure: true
            }
        ],
        watchFiles: 'src/**/*',
    },
    plugins: [
    ],
    stats: {
        errorDetails: true,
    }
}

export default merge(common, clientConfig);

import 'dotenv/config';
import {defineConfig} from 'vite';
import process from "node:process";
import {visualizer} from "rollup-plugin-visualizer";
import {commonConfig} from "./vite.common.config.ts";

export default defineConfig({
    ...commonConfig,
    server: {
        port: 8080,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost',
                changeOrigin: true,
            },
            '/images': {
                target: 'https://b2b.chums.com',
                changeOrigin: true,
            },
            '/pdf': {
                target: 'https://b2b.chums.com',
                changeOrigin: true,
            },
            '/version': {
                target: `http://localhost:${process.env.DEV_VERSION_PROXY_PORT ?? 3001}`,
                changeOrigin: true,
            }
        }
    },
    build: {
        // minify: false,
        outDir: 'dist-client',
        emptyOutDir: true,
        rolldownOptions: {
            input: './src/client/index.tsx',
            plugins: [visualizer({filename: 'stats.html', gzipSize: true})],
            output: {
                codeSplitting: {
                    groups: [
                        {name: 'react', test: /node_modules\/(react|react-dom)/},
                        {name: 'mui', test: /node_modules\/@mui/},
                        {name: 'vendor', test: /node_modules/},
                    ]
                }
            }
        },
        manifest: true,
        sourcemap: true,
    },

})

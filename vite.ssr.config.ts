import 'dotenv/config';
import {defineConfig} from 'vite';
import * as path from "node:path";
import * as process from "node:process";
import {commonConfig} from './vite.common.config'


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
            '/version': {
                target: 'https://b2b.chums.com',
                changeOrigin: true,
            }
        }
    },
    build: {
        outDir: 'dist-server',
        lib: {
            entry: path.resolve(process.cwd(), 'src/server/index.ts'),
            name: 'chums-ssr',
            formats: ['es'],
        },
        emptyOutDir: true,
        rolldownOptions: {
            input: './src/server/index.ts',
            output: {
                preserveModules: true,
                // codeSplitting: false
            },
            shimMissingExports: true,
        },
        ssr: true,
        ssrManifest: true,
        ssrEmitAssets: true,
        manifest: true,
        sourcemap: false,
    },
    ssr: {
        resolve: {
            conditions: ['development', 'browser'],
            externalConditions: ['node']
        },
        optimizeDeps: {
            holdUntilCrawlEnd: true,
        }
    }
})

import 'dotenv/config';
import {defineConfig} from 'vite';
import process from "node:process";
import {visualizer} from "rollup-plugin-visualizer";

import react from "@vitejs/plugin-react";
import path from "node:path";

const commonConfig = defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@/": path.resolve(process.cwd(), 'src'),
            "@/api": path.resolve(process.cwd(), 'src/api'),
            "@/app": path.resolve(process.cwd(), 'src/app'),
            "@/components": path.resolve(process.cwd(), 'src/components'),
            "@/constants": path.resolve(process.cwd(), 'src/constants'),
            "@/ducks": path.resolve(process.cwd(), 'src/ducks'),
            "@/hooks": path.resolve(process.cwd(), 'src/hooks'),
            "@/slices": path.resolve(process.cwd(), 'src/slices'),
            "@/types": path.resolve(process.cwd(), 'src/types'),
            "@/utils": path.resolve(process.cwd(), 'src/utils'),
        }
    },
});

const serverConfig = defineConfig({
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
    }
})

export default defineConfig(({command, isSsrBuild}) => {
    if (command === 'serve') {
        return defineConfig({
            ...commonConfig,
            ...serverConfig
        })
    }
    if (isSsrBuild) {
        return defineConfig({
            ...commonConfig,
            build: {
                outDir: 'dist-server',
                lib: {
                    entry: path.resolve(process.cwd(), 'src/server/index.ts'),
                    name: 'chums-ssr',
                    formats: ['es'],
                },
                emptyOutDir: true,
                rolldownOptions: {
                    input: path.resolve(process.cwd(), './src/server/index.ts'),
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
    }

    return defineConfig({
        ...commonConfig,
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
})

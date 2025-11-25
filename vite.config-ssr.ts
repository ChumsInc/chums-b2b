import { defineConfig } from 'vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import react from '@vitejs/plugin-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import path from "node:path";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import process from "node:process";


export default defineConfig({
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
            // fileName: (format, fileName) => {
            //     // const extension = format === 'cjs' ? 'js' : 'mjs';
            //     return `${fileName}.mjs`;
            // },
            name: 'chums-ssr',
            formats: ['es'],
        },
        emptyOutDir: true,
        rollupOptions: {
            input: './src/server/index.ts',
            output: {
                preserveModules: true,
                inlineDynamicImports: false
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

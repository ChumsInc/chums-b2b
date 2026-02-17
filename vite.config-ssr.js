"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
var plugin_react_1 = require("@vitejs/plugin-react");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
var node_path_1 = require("node:path");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
var node_process_1 = require("node:process");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    resolve: {
        alias: {
            "@/": node_path_1.default.resolve(node_process_1.default.cwd(), 'src'),
            "@/api": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/api'),
            "@/app": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/app'),
            "@/components": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/components'),
            "@/constants": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/constants'),
            "@/ducks": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/ducks'),
            "@/hooks": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/hooks'),
            "@/slices": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/slices'),
            "@/types": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/types'),
            "@/utils": node_path_1.default.resolve(node_process_1.default.cwd(), 'src/utils'),
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
            entry: node_path_1.default.resolve(node_process_1.default.cwd(), 'src/server/index.ts'),
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
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
// @ts-ignore
var plugin_react_1 = require("@vitejs/plugin-react");
// @ts-ignore
var node_path_1 = require("node:path");
// @ts-ignore
var node_process_1 = require("node:process");
function manualChunks(id) {
    if (id.includes('node_modules')) {
        if (id.includes('react')) {
            return 'react';
        }
        if (id.includes('mui')) { }
        return 'mui';
    }
    return null;
}
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
        emptyOutDir: true,
        rollupOptions: {
            input: './src/server/index.ts',
            output: {
                manualChunks: manualChunks,
            },
            shimMissingExports: true,
        },
        ssr: true,
        ssrManifest: true,
        ssrEmitAssets: true,
        manifest: true,
        sourcemap: false,
    },
});

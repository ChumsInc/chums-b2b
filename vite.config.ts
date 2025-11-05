import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "node:path";
import process from "node:process";

function manualChunks(id: string):string | null {
    if (id.includes('node_modules')) {
        if (id.includes('react')) {
            return 'react'
        }
        if (id.includes('mui')) {}
        return 'mui';
    }
    return null;
}

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
        outDir: 'dist-client',
        emptyOutDir: true,
        rollupOptions: {
            input: './src/client/index.tsx',
            output: {
                manualChunks: manualChunks,
            }
        },
        manifest: true,
        sourcemap: true,
    },

})

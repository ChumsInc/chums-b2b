import * as path from "node:path";
import * as process from "node:process";
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';


export const commonConfig = defineConfig({
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
})

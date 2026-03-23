"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var vite_1 = require("vite");
var path = require("node:path");
var process = require("node:process");
var vite_common_config_1 = require("./vite.common.config");
exports.default = (0, vite_1.defineConfig)(__assign(__assign({}, vite_common_config_1.commonConfig), { server: {
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
    }, build: {
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
    }, ssr: {
        resolve: {
            conditions: ['development', 'browser'],
            externalConditions: ['node']
        },
        optimizeDeps: {
            holdUntilCrawlEnd: true,
        }
    } }));

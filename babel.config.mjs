import path from 'node:path'
import process from "node:process";

export default function (api) {
    api.cache(true);
    const presets = [
        "@babel/preset-env",
        "@babel/preset-react"
    ];

    const plugins = [
        "@babel/plugin-transform-property-mutators",
        "@babel/plugin-transform-regenerator",
        "@babel/plugin-transform-async-to-generator",
        ["module-resolver", {
            "root": ["./src"],
            "alias": {
                "@src": path.resolve(process.cwd(), "src"),
                "@api": path.resolve(process.cwd(), "src/api"),
                '@app': path.resolve(process.cwd(), 'src/app'),
                '@components': path.resolve(process.cwd(), 'src/components'),
                '@constants': path.resolve(process.cwd(), 'src/constants'),
                '@ducks': path.resolve(process.cwd(), 'src/ducks'),
                '@hooks': path.resolve(process.cwd(), 'src/hooks'),
                '@typeDefs': path.resolve(process.cwd(), 'src/types'),
                '@utils': path.resolve(process.cwd(), 'src/utils'),
            }
        }]
    ];


    return {
        presets,
        plugins,
    };
};

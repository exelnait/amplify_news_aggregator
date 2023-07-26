import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';
import json from '@rollup/plugin-json';
import path from "path";

export default {
    input: 'index.ts',
    output: {
        dir: '.',
        format: 'cjs'
    },
    plugins: [ autoExternal({
        builtins: true,
        dependencies: true,
        packagePath: path.resolve('./package.json'),
        peerDependencies: false,
    }), json(), commonjs(), typescript()],
};

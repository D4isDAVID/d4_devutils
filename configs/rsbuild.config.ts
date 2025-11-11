import { resolve } from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import PostCssPresetMantine from 'postcss-preset-mantine';

const dirname = import.meta.dirname;

export default defineConfig({
    tools: {
        postcss(_, { addPlugins }) {
            addPlugins([PostCssPresetMantine()]);
        },
    },
    source: {
        entry: {
            index: resolve(dirname, '../src/web/index.tsx'),
        },
        tsconfigPath: resolve(dirname, './tsconfig.web.json'),
    },
    output: {
        assetPrefix: './',
        distPath: {
            root: resolve(dirname, '../dist/web'),
        },
    },
    plugins: [pluginReact()],
});

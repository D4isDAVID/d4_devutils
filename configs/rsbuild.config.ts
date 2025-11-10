import { resolve } from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import PostCssPresetMantine from 'postcss-preset-mantine';
import PostCssSimpleVars from 'postcss-simple-vars';

const dirname = import.meta.dirname;

export default defineConfig({
    tools: {
        postcss(_, { addPlugins }) {
            addPlugins([
                PostCssPresetMantine(),
                PostCssSimpleVars({
                    variables: {
                        'mantine-breakpoint-xs': '36em',
                        'mantine-breakpoint-sm': '48em',
                        'mantine-breakpoint-md': '62em',
                        'mantine-breakpoint-lg': '75em',
                        'mantine-breakpoint-xl': '88em',
                    },
                }),
            ]);
        },
    },
    source: {
        entry: {
            index: resolve(dirname, '../src/web/index.tsx'),
        },
        tsconfigPath: resolve(dirname, './tsconfig.web.json'),
    },
    output: {
        distPath: {
            root: resolve(dirname, '../dist/web'),
        },
    },
    plugins: [pluginReact()],
});

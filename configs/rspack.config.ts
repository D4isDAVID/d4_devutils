import { resolve } from 'node:path';
import { defineConfig } from '@rspack/cli';
import type { RspackOptions, SwcLoaderOptions } from '@rspack/core';

const tsFilesRegex = /\.ts$/;
const dirname = import.meta.dirname;

function createConfig(project: string): RspackOptions {
    return {
        entry: `./src/${project}/index.ts`,
        devtool: false,
        output: {
            filename: `${project}.js`,
            path: resolve(dirname, '../dist'),
        },
        resolve: {
            tsConfig: {
                configFile: resolve(dirname, `./tsconfig.${project}.json`),
            },
            extensions: ['.ts'],
        },
        module: {
            rules: [
                {
                    test: tsFilesRegex,
                    loader: 'builtin:swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                            },
                        },
                    } satisfies SwcLoaderOptions,
                    type: 'javascript/auto',
                },
            ],
        },
    };
}

export default defineConfig([createConfig('client'), createConfig('server')]);

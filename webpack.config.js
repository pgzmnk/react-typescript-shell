import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';
import Dotenv from 'dotenv-webpack';
import webpack from 'webpack';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    target: 'web',
    // externalsPresets: { node: true },
    mode: 'production',
    entry: {
        // app: ["./src/app.tsx"],
        app: ['./src/index.tsx'],
    },
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: 'static/js/[name].[contenthash].js',
        chunkFilename: 'static/js/[name].[contenthash].js',
        assetModuleFilename: 'static/assets/[name].[contenthash][ext]',
        webassemblyModuleFilename: 'static/wasm/[hash].wasm',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.mjs', '.jsx', '.css', '.wasm'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { allowTsInNodeModules: true }, // also introduced this to mitigate errors
                // exclude: /node_modules/, // commenting this vanishes the "unexpected token" error in node_modules
            },
            {
                test: /.*\.wasm$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/wasm/[name].[contenthash][ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                auto: true,
                                exportGlobals: true,
                                localIdentContext: path.resolve(__dirname, 'src'),
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './templates/index.html',
            // filename: "./index.html",
        }),
        new webpack.ProgressPlugin(),
        new Dotenv({
            systemvars: true,
        }),
    ],
    experiments: {
        asyncWebAssembly: true,
    },
    devtool: false,
    performance: {
        hints: false,
    },
};

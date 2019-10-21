'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV === 'development';

const webpackConfig = {
    entry: {
        polyfill: '@babel/polyfill',
        main: helpers.root('src', 'main'),
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'vue$': isDev ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
            '@': helpers.root('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: { loaders: {}, esModule: false },
                include: [helpers.root('src')]
            },
            {
                resourceQuery: /blockType=i18n/,
                type: 'javascript/auto',
                loader: '@kazupon/vue-i18n-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [helpers.root('src')]
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 // you can specify a publicPath here
            //                 // by default it uses publicPath in webpackOptions.output
            //                 publicPath: '../',
            //                 hmr: process.env.NODE_ENV === 'development',
            //             },
            //         },
            //         'css-loader',
            //     ],
            // },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: helpers.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(csv)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: helpers.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: helpers.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: {
            //         loaders: {
            //             i18n: '@kazupon/vue-i18n-loader'
            //         },
            //         esModule: false
            //     }
            // }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new VueLoaderPlugin(),
        new HtmlPlugin({ template: 'index.html', chunksSortMode: 'dependency' })
    ]
};

module.exports = webpackConfig;

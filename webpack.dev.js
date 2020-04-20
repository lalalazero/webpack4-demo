'use strict'
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ] // 注意多个 loader 的调用顺序,从右到左
            },
            {
                test: /\.less/,
                use: [
                    'style-loader', 'css-loader', 'less-loader',{
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                overrideBrowserslist: ['last 2 version','>1%','IOS 7']
                            })]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240 // 10kb
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|otf|ttf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}
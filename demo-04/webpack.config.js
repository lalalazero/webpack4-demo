'use strict'
const path = require('path')

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'production',
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
                    'style-loader', 'css-loader', 'less-loader'
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
    }
}
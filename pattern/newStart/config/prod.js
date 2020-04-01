const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 从js中分离css 和extract-text-webpack-plugin功能类似，webpack4开始使用mini-css-extract-plugin
const merge = require('webpack-merge');
const common = require('./common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "less-loader"
                ],
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(),
    ],
    stats: "normal",
});

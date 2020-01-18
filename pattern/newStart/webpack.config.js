const path = require("path");
 //把css提取到单独的文件中的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

// 编辑进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 命令行控制台打印日志
// const DashBoard = require("webpack-dashboard");
// const DashBoardPlugin = require("webpack-dashboard/plugin");
// const dashboard = new DashBoard();

module.exports = {
    mode: "development",
    entry: { index: "./src/index.js" },
    output: {
        path: path.join(__dirname , "dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css', '.json',]
    },
    module: {
        rules: [
            {
                test: /.js$/,
                // exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            },
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//跟webpack-dev-server配合使用热更新
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new ProgressBarPlugin({
            format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false,
            width: 60,
        }),
        // new DashBoardPlugin(dashboard.setData),
    ],
    devServer: {
        contentBase: "./dist",
        // compress: true,//压缩
        port: 3000,//端口
        open: true,//编译完之后在默认浏览器打开
        // clientLogLevel: "none",
        hot: true,
    },
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000
    // }
};

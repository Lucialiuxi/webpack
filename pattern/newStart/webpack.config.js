const path = require("path");
 //把css提取到单独的文件中的插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

//创建多个实例
// const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
// const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');

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
        filename: "[name].js",
        path: path.join(__dirname , "./dist"),
    },
    // resolve: {
    //     extensions: ['.jsx', '.js', '.less', '.css', '.json',]
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            },
            // {
            //     test:/\.css$/,
            //     //把css提取到单独的文件中
            //     use: extractCSS.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            // },
            // {
            //   test: /\.less$/,
            //   use: extractLESS.extract([ 'css-loader', 'less-loader' ])
            // }
        ]
    },
    plugins:[
        // extractCSS ,
        // extractLESS,
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
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
        contentBase: path.join(__dirname, "dist"),
        // compress: true,//压缩
        port: 3000,//端口
        open: true,//编译完之后在默认浏览器打开
        // clientLogLevel: "none",
        hot: true,
    },
    // stats: "normal",
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000
    // }
};

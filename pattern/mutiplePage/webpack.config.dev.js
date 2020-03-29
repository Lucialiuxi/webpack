const path = require("path");
// 从js中分离css 和extract-text-webpack-plugin功能类似，webpack4开始使用mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const chalk = require('chalk');
const merge = require('webpack-merge');
const devMode = process.env.NODE_ENV !== 'production';
const { AutoWebPlugin } = require('web-webpack-plugin');

const autoWebPlugin = new AutoWebPlugin('src/pages', {
    template: './src/template.html', // HTML模板文件所在的文件路径
    postEntrys: ['./src/common.css'], // 所有页面都依赖这份通用的CSS样式文件
    commonsChunk: {
        name: 'common', // 提取出公共代码Chunk的名称
    },
});

// 编辑进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 命令行控制台打印日志
// const DashBoard = require("webpack-dashboard");
// const DashBoardPlugin = require("webpack-dashboard/plugin");
// const dashboard = new DashBoard();

module.exports = {
    mode: "development",
    entry: autoWebPlugin.entry({}),
    output: {
        filename: "[name][hash:8].js",
        path: path.join(__dirname , "./dist"),
    },
    resolve: {
        extensions: ['.tsx', '.ts','.jsx', '.js', '.less', '.css', '.json',],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
              test: /\.(le|sa|sc|c)ss$/,
              use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                "less-loader"
              ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'img/[name][hash:8].[ext]'
                        },
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/, // 字体图标
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts/'
                        }
                    }
                ],
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin({
            format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false,
            width: 60,
        }),
        // new DashBoardPlugin(dashboard.setData),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        autoWebPlugin,
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // compress: true,//压缩
        port: 3000,//端口
        open: true,//编译完之后在默认浏览器打开
        // clientLogLevel: "none",
        hot: true,
    },
    stats: "normal",
    watch: true, //启用watch模式
    watchOptions: { //文件监听
        ignored: /node_modules/, //默认为空，不监听的文件或者文件夹，支持正则匹配
        aggregateTimeout: 300, // 监听到变化发生后回等300毫秒再去执行，默认300毫秒
        poll: 1000, //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒访问1000次
    }
};

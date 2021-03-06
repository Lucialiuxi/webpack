const path = require("path");
// 从js中分离css 和extract-text-webpack-plugin功能类似，webpack4开始使用mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');
const merge = require('webpack-merge');
const devMode = process.env.NODE_ENV !== 'production';


// 编辑进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 命令行控制台打印日志
// const DashBoard = require("webpack-dashboard");
// const DashBoardPlugin = require("webpack-dashboard/plugin");
// const dashboard = new DashBoard();

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
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
        new HtmlWebpackPlugin({
            title: 'webpack列子',
            template: path.join(__dirname, "src/index.html"),//引入的HTML文件的模板路径
            filename: 'index.html',// 将生成的HTML写入到该文件中。默认写入到index.html中。
            // chunks: ['index'], //多入口的时候 对应entry属性名
            inject: true,
            hash: true, // 添加一个唯一的hash给所有已经include的scripts和css文件。对清除缓存十分有用
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
        new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
          })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // compress: true,//压缩
        port: 3000,//端口
        open: true,//编译完之后在默认浏览器打开
        // clientLogLevel: "none",
        hot: true,
        inline: true,
        watchContentBase: true,
    },
    stats: "normal",
    watch: true, //启用watch模式
    watchOptions: { //文件监听
        ignored: /node_modules/, //默认为空，不监听的文件或者文件夹，支持正则匹配
        aggregateTimeout: 300, // 监听到变化发生后回等300毫秒再去执行，默认300毫秒
        poll: 1000, //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒访问1000次
    }
};

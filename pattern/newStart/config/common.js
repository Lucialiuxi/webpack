const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

// 编辑进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
console.log(path.join(__dirname, "../src/index.html"))
module.exports = {
    entry: "../src/index.tsx",
    output: {
        filename: "[name].js",
        path: path.join(__dirname , "./dist"),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.less', '.css', '.json'],
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
        new HtmlWebpackPlugin({
            title: 'webpack列子',
            template: path.join(__dirname, "../src/index.html"),//引入的HTML文件的模板路径
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
    ],
    stats: "normal",
};

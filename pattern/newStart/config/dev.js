const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
    mode: "development",
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    "less-loader"
                ],
            },
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // compress: true,//压缩
        port: 3000,//端口
        // open: true,//编译完之后在默认浏览器打开
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
});

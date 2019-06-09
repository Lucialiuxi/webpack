const path = require("path");
 //把css提取到单独的文件中的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//创建多个实例
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');

module.exports = {
    mode: "development",
    entry: "./main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname , "./dist"),
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                // use: [
                //     { 
                //         loader:"style-loader"
                //     },
                //     {
                //         loader:"css-loader",
                //     }
                // ]
                //把css提取到单独的文件中
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
              test: /\.less$/,
              use: extractLESS.extract([ 'css-loader', 'less-loader' ])
            }
        ]
    },
    plugins:[
        extractCSS ,
        extractLESS,
    ],
    // devServer: {
    //     contentBase: path.join(__dirname, "dist"),
    //     compress: true,//压缩
    //     port: 3000,//端口
    //     open: true,//编译完之后在默认浏览器打开
    // }
}

let path = require('path');

let webpack = require('webpack');
let cleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir)  // f///src
}


module.exports = {
  //entry:'./src/app.js',
  //entry: ['./src/app.js', './src/index.js'],
  entry: {
    app: './src/app.js',
    miaov: './src/index.js',
    vendor: ['jquery'],
  },
  devServer: {
    port: 9000,
    //contentBase:false,
    hot: true,
    open: true
  },
  output: {
    path: resolve('dist'),//绝对路径
    //publicPath: 'dist/',
    filename: 'js/[name]-[hash:5].min.js'  // name就是entry中的key值
  },
  resolve:{
    alias:{
      '@': resolve('src'),  // 代表文件夹
      'v$': resolve('src/vue/vue.js')
    }
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use:['css-loader'],
          fallback: "style-loader" // 不需要抽离，需要使用style-loader生成标签
        })
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000, // 字节 1024字节 = 1kb,
            useRelativePath: true,
            name: '[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  
  plugins:[
    new cleanWebpackPlugin([resolve('dist')]),
    new webpack.HotModuleReplacementPlugin(),
    /* new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    // 没有抽离
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      chunks: ['app','index'],
      minChunks: 2
    }),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }), */
    new ExtractTextPlugin({
      // contentHash如果不更改文件内容，hash不变的
      filename: "css/[id]-[contentHash]-[name].css",
      allChunks: true,
      disable: false  // 不抽离
    }),
    new HtmlWebpackPlugin({
      title: '项目',
      template: 'index.html',  // 模板
      filename: 'index.html',  // 生成后的html
      inject: true,
      //chunks
    })
  ]
}
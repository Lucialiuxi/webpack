let {resolve,join} = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry:{
    index:'./src/index.js',
    app:'./src/app.js'
  },
  output:{
    path: resolve(__dirname,'./dist'),
    publicPath:'/',
    filename: 'js/[name]-[hash].min.js'
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
          publicPath:'/',
          //outputPath: 'images/'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          }
        ]
      }
    ]
  },
  devServer:{
    port: 9000,
    //inline: false,
    hot: true,
    contentBase: resolve2('dist')
  },
  resolve:{
    alias:{
      m$:resolve2('src/provide/vues.js'),  // 简化引入时候路径 带$是精准匹配
      "@": resolve2('src')  // 定在某个目录
    }
  },
  plugins:[
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin("css/styles.css"),
    new HtmlWebpackPlugin({
     title: 'Output Management',
     filename: 'index.html',
     template: 'index.html',
     minify: false,
     chunksSortMode: 'dependency'
    }),
    new webpack.ProvidePlugin({
      //'$':'jquery',
      'm':['m','default']  // 在每个模块中都可以使用
    }),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NamedChunksPlugin()
  ]
}

function resolve2 (dir) {
  return join(__dirname, dir)
}

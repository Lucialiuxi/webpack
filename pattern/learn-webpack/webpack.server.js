
let path = require('path');

let webpack = require('webpack');
let cleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)  // f///src
}


module.exports = {
  //entry:'./src/app.js',
  //entry: ['./src/app.js', './src/index.js'],
  entry: {
    app: './src/app.js',
    miaov: './src/index.js'
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
    filename: 'js/[name].min.js'  // name就是entry中的key值
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      /* {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options:{
            publicPath: './dist/img',
            //outputPath: '',
            useRelativePath: true,
            name:'[name]-[hash:5].[ext]'
          }
        }]
      } */
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
    new HtmlWebpackPlugin({
      title: '项目',
      template: 'index.html',  // 模板
      filename: 'index.html',  // 生成后的html
      inject: true,
      //chunks
    })
  ]
}
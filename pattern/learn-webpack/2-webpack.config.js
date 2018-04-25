
let path = require('path');

let cleanWebpackPlugin = require('clean-webpack-plugin')


function resolve(dir) {
  return path.join(__dirname, dir)  // f///src
}


module.exports = {
  entry: {
    app: './src/app.js',
    miaov: './src/index.js'
  },
  output: {
    path: resolve('dist'),//绝对路径
    filename: '[name].min.js'  // name就是entry中的key值
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
    new cleanWebpackPlugin([resolve('dist')])
  ]
}
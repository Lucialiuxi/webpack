

// http://www.php.cn/js-tutorial-390965.html

let {resolve,join} = require('path');
let webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 生成结构的
let createHtml = [
	new HtmlWebpackPlugin({
		template: 'index.html',
		chunksSortMode: 'dependency'
	})
]

module.exports = {
	devtool: 'source-map',
	entry: {
		app: './src/app.js',
		index:'./src/index.js'
	},
	output:{
		path: resolve(__dirname,'./dist'),
		publicPath: '',
		filename: 'js/[name]-[hash].min.js'
	},
	module:{
		rules:[
			{
				test: /\.css$/,
				//use:['style-loader','css-loader']
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
			},
			/* {
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader:'file-loader',
						options:{
							publicPath: '../img/',
							outputPath: '',
							useRelativePath: true
						}
					}
				]
			} */
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options:{
							publicPath: '..',
							limit: 1000,  // 超过
							name: 'img/[name]-[hash:7].[ext]'
						}
					}
				]
			}
		]
	},
	plugins:[
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),
		new CleanWebpackPlugin(['dist']),	
		new ExtractTextPlugin({
			filename: 'style/style.css',
			allChunks: false,
			disable: false
		}),	
		new webpack.optimize.CommonsChunkPlugin({
		  name: "manifest",  // 提取公共的webpack启动逻辑代码
		  minChunks: Infinity
		}),
		...createHtml
	]
}
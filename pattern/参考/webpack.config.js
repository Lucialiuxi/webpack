

// http://www.php.cn/js-tutorial-390965.html

let {resolve,join} = require('path');
let webpack = require('webpack');

function resolvePath(dir) {
	return join(__dirname,  dir)
}

console.log(resolvePath('src/sass'))

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
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
			},
			{
				test: /\.js$/,
				include: [resolve('src')],
				use: [
					{
						loader: 'babel-loader',
						
					}
				]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: {
						loader: 'style-loader',
						options:{
							singleton: true // 生成单独的style
						}
					},
					use:[
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader',
							options:{
								includePaths: [resolvePath('src/sass')]
							}
						}
					]
				})
			},
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
			filename: 'style/[name].css',
			allChunks: false,
			disable: false
		}),
		new ExtractTextPlugin({
			filename: 'style/[name].css',
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


// http://www.php.cn/js-tutorial-390965.html

let {resolve,join} = require('path');
let webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 生成结构的
let createHtml = [
	new HtmlWebpackPlugin({
		template: 'index.html',
		chunksSortMode: 'dependency'
	})
]

module.exports = {
	//devtool:'inline-source-map',
	//devtool:'source-map',
	//mode: 'development',
	//entry: ['./src/app.js','./src/index.js'],
	entry: {
		app: './src/app.js',
		index:'./src/index.js'
	},
	output:{
		path: resolve(__dirname,'./dist'),
		filename: 'js/[name]-[hash].min.js'
	},
	
	resolve:{
		alias:{
			'jquery':'jquery'
		}
	},
	plugins:[
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.CommonsChunkPlugin({
		  name: "vendor",  // 提取公共的引入文件，不是第三方组件
		  //minChunks: Infinity  // 引用的次数
		  minChunks(module,count){
		  	return (
	          module.resource &&
	          /\.js$/.test(module.resource) &&
	          module.resource.indexOf(
	            join(__dirname, '../node_modules')
	          ) === 0
	        )
		  }
		}),		
		new webpack.optimize.CommonsChunkPlugin({
		  name: "manifest",  // 提取公共的webpack启动逻辑代码
		  minChunks: Infinity
		}),
		...createHtml
	]
}
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var PostcssSprites = require('postcss-sprites')

module.exports = {
	entry: './src/index.js',
	output: {
		path: './dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!postcss!sass')
			},
			{
				test: /(\.png|\.cur|\.wav|\.jpg|\.ogg)$/,
				loader: 'file?name=[name].[ext]'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('bundle.css')
	],
	postcss: function(){
		return [PostcssSprites({
			stylesheetPath: './src/style',
			spritePath: './src/gen',
			filterBy: function(image){
				if(image.url.match(/(material)|(cur)/)){
					return Promise.reject()
				}
				return Promise.resolve()
			}
		})]
	}
}
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: __dirname + '/app',
	entry: {
		app: './app.js',
		vendor: ['pixi.js', 'lodash']
	},
	output: {
		path: __dirname + '/js',
		filename: 'app.bundle.js'
	},
	resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.js']
  },
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: [
					'vendor.bundle.js'
			]
		}),
		new webpack.OldWatchingPlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
	]
};
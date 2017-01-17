var webpack = require('webpack');

module.exports = {
	context: __dirname + '/app',
	entry: {
		app: './app.js',
		vendor: ['pixi.js', 'lodash', 'event-emitter']
	},
	output: {
		path: __dirname + '/js',
		filename: 'app.bundle.js'
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
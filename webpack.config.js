var path=require("path");
var webpack = require("webpack");

var PUBLIC_DIR=path.resolve(__dirname,"public");
var SRC_DIR=path.resolve(__dirname,"src");

module.exports = {

	entry:SRC_DIR + "/component/App.js",

	output:{

		path: PUBLIC_DIR,
		filename:"bundle.js",
		publicPath: "/"
	},

	node:{
		fs:"empty",
		tls:"empty"
	},

	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/(node_modules)/,
				loader:"babel-loader",
				query: {
					presets:["react","es2015","stage-2"]
				}
			},

			{
				test:/\.css$/,
				loader:"style-loader!css-loader"
			},

			{
				test:/\.(png|jpg)$/,
				loader:"url-loader",
				query: {
    				limit: 8192,
    				name: 'images/[name].[ext]'
					}
			}
		]
	},

	plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
  ],
};
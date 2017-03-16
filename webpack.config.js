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
		]
	},
	node:{
		fs:"empty",
		tls:"empty"
	}

};
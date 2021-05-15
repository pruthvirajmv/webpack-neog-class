const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackConfig = {
    entry: path.resolve(__dirname, "src", "index.js"),

    // output: {
    //     filename: "main.js",
    //     path: path.resolve(__dirname, "dist")
    // },

    // output: {
    //     filename: "main.js",
    //     path: path.resolve(__dirname, "dist"),
    //     clean: true // <----
    // },

    // output: {
	// 	filename: "[name].bundle.js",
	// 	path: path.resolve(__dirname, "dist"),
	// 	clean: true
	// },

    //this helps in to load only files whihc are changed "hashing and caching"
    output: {
		filename: "[name].[contenthash].bundle.js", // <--- small change
		path: path.resolve(__dirname, "dist"),
		clean: true
	},

    //creating to make app faster by downloading two files at the same time
    optimization: {
		splitChunks: {
			cacheGroups: {
				node_vendors: {
					name: "vendor",
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					priority: 1
				}
			}
		}
	},

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },

            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]

            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                //asset - load images inline below 8kb, >8kb seperate file
                type: "asset"
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "vanillaJS app",
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],

    //setup dev server
    devServer: {
        contentBase: "./dist",
        port: 2000
    },

    //this map the source files in console
    devtool: "inline-source-map",

    mode: "development"
}

module.exports = webpackConfig;
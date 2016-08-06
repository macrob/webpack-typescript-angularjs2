var config = require('config');

const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var util = require(process.env.PWD+'/config/etc/util.js');

/* INJECT CSS AND JS TO index.html */
const HtmlElementsPlugin = require('./plugins/html-elements-plugin/html-elements-plugin');
const headStatic = require(util.root('src/config/head'));
var htmlElementsPluginOpt = {
  headStatic: headStatic,
  head: {
    link: [
      // {
      //   chunksName: "app"
      // }
    ],
    script: [
      {
        chunksName: "polyfills",
        type: "text/javascript"
      }
    ]
  },
  footer: {
    script: [
      {
        chunksName: "vendor",
        type: "text/javascript"
      },
      {
        chunksName: "main",
        type: "text/javascript"
      }
  ]
  }
}
/* //// INJECT CSS AND JS TO index.html */



var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: {
    main: util.root('src/app/main.browser.ts'),
    polyfills: util.root('src/app/polyfills.browser.ts'),
    vendor: util.root('src/app/vendor.browser.ts'),
  },
  output: {
    path: config.get('build'),
    filename: 'js/[name].js'
  },

  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.ts', '.js', '.json' , '.css', '.html', '.scss'],
    root: util.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules'],

  },
  module: {
      loaders:
      [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
          { test: /\.css$/,	loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
          { test: /\.scss$/, loader: ExtractTextPlugin.extract('raw-loader', "css-loader", 'sass-loader') },
          {
            test: /\.html$/,
            loader: 'raw',
            exclude: util.root('src/index.html')
          }
      ]
  },
  node:
  {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin(),
    new ExtractTextPlugin("css/[name].css", {
        allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
          compressor: { warnings: false }
      }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    	chunksSortMode: 'dependency',
    	title: 'hello sir',
    	inject: true,
    	// minify: {
    	// 	html5: true,
    	// 	collapseInlineTagWhitespace: true,
    	// 	collapseWhitespace: true,
    	// 	conservativeCollapse: false,
    	// 	minifyCSS: true,
    	// 	minifyJS: true,
    	// 	removeComments: true,
    	// 	removeEmptyAttributes: true,
    	// 	removeEmptyElements: true,
    	// 	removeScriptTypeAttributes: true,
    	// 	removeRedundantAttributes: true,
    	// 	removeStyleLinkTypeAttributes: true,
    	// 	sortClassName: true,
    	// 	sortAttributes: true,
    	// 	useShortDoctype: true
    	// },
    	cache: false,
    	xhtml: true,
    	hash: true
    }),

    new HtmlElementsPlugin(htmlElementsPluginOpt),
    new CopyWebpackPlugin([
      {
        context: util.root('src'),
        from: '*.png'
      },
      {
        context: util.root('src'),
        from: '*.txt'
      },
      {
        context: util.root('src'),
        from: '*.xml'
      },
      {
        context: util.root('src'),
        from: '*.ico'
      },
      {
        context: util.root('src'),
        from: '404.html'
      },
      // {
      //   context: util.root('src'),
      //   from: 'css/*'
      // },
      {
        context: util.root('src'),
        from: 'js/vendor/*'
      }
    ])
  ]
}

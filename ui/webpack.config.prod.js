var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

var webpackConfig = {
    entry: './src/index.js',
    devtool: '#source-map',
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            "vue": "vue/dist/vue.js",
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.less|css$/,
            use:[ 'style-loader','css-loader','less-loader']
        }, {
            test: /\.png|jpg|gif|ico$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "production"
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}

module.exports = webpackConfig;
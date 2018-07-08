const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const extractStyle = new ExtractTextPlugin('style.css');
const extractLib = new ExtractTextPlugin('lib.css');

module.exports = {
    entry: {
        app: './src/app.js',
        component: './src/component/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].[chunkhash].js'
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                include: __dirname + '/src/component',
                use: extractStyle.extract({
                    fallback: 'style-loader',
                    use:["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.scss$/,
                include: __dirname + '/src/app.scss',
                use: extractLib.extract({
                    fallback: 'style-loader',
                    use:["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer:{
        port:9000,
        open:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            // title: 'Custom template',
            template: './src/index.html',
            filename: './index.html',
            minify:{
                conservativeCollapse: true
            },
            chunks: ['app'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            // title: 'Custom template',
            filename: './src/component.html',
            template: './src/component/index.html',
            minify:{
                conservativeCollapse: true
            },
            chunks:['component'],
            hash: true
        }),
        extractStyle,
        extractLib,
        // new ExtractTextPlugin2('style2.css'),
        new CleanWebpackPlugin(['dist'])
    ]
}
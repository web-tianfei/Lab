const webpack = require('webpack');
const path = require('path');

const thirdPartyPath = path.join(__dirname, './thirdParty/');

module.exports = {
    
    entry: [
        // 'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
        './src/main.js',
    ],
    output: {
        path: path.join(__dirname, './build/'),
        //path: __dirname + '/doc/assets/res/',
        filename: 'GlobalPhone.js'
    },
    module: {
        loaders: [
            {test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style!css?module&localIndentName=[hash:base64:5]&-url'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            {
                test: /\.js|jsx$/,
                loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                include: path.join(__dirname, './src/')
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            geovis: path.join(thirdPartyPath, 'GeoVis-0.8.4/GeoVis.js')
        }
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};

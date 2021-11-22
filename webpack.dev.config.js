const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png|svg|ico|icns|glb)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
    ]
};

// const rendererConfig = lodash.cloneDeep(commonConfig);
// rendererConfig.entry = './client/app.js';
// rendererConfig.target = 'electron-renderer';
// rendererConfig.output.filename = 'renderer.bundle.js';
// rendererConfig.plugins = [
//   new HtmlWebpackPlugin({
//     template: path.resolve(__dirname, './client/index.html'),
//   }),
// ];

//module.exports = [mainConfig, rendererConfig];
var path = require('path');
var webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: "#eval-source-map",
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8088',
        'webpack/hot/only-dev-server',
        './src/index.tsx'
    ],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/"
    },
    cssnext: {
        browsers: "last 2 versions"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        // Add `.ts` and `.tsx` and `.css` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css'],
        packageAlias: 'browser',
        modulesDirectories: ['src', 'node_modules', 'custom_typings']
    },
    module: {
        loaders: [
            {
                test:   /\.css$/,
                loaders: ["style-loader", "css-loader", "postcss-loader"]
            },

            {test: /\.(png|woff(2)?|eot|ttf|svg|gif)(\?[a-z0-9=\.\-]+)?$/, loader: 'url-loader'},

            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader'],
                include: path.join(__dirname, 'src')
            }
        ]
    }
};

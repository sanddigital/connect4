'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('copy-html', function () {
    return gulp
        .src([
            'src/index.html'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['webpack-dev-server']);

gulp.task('webpack-dev-server', ['copy-html'], function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(require('./webpack.config.js'));
    myConfig.devtool = 'cheap-module-eval-source-map';
    myConfig.debug = true;

    // Start a webpack-dev-server
    gutil.log('[webpack-dev-server]', '/' + myConfig.output.publicPath);
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/',
        stats: {
            colors: true,
            cached: false,
            cachedAssets: false
        },
        hot: true,
        historyApiFallback: true,
        contentBase: myConfig.output.path
    }).listen(8088, '0.0.0.0', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8088/webpack-dev-server/index.html');
    });
});

"use strict";

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const babelSettings = JSON.parse(fs.readFileSync(".babelrc"));
const environment = process.env.NODE_ENV || 'development';

const config = {
    name: 'js',
    entry: {
        app: './examples/app.js'
    },
    output: {
        path: path.join(__dirname, 'dest'),
        filename: 'build.[name].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            }
        ]
    },
    performance: {
      hints: false
    },
    mode: environment,
};


module.exports = config;

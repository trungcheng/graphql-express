import path from 'path';

const config = {

    context: path.resolve(__dirname, '../client'),

    entry: './index.js',

    output: {
        path: path.resolve(__dirname, '../client/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    // What Webpack should print to a console window
    stats: {
        colors: true,
        reasons: true,
        hash: false,
        version: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        cached: false,
        cachedAssets: false
    },

    // Configure source maps
    debug: true,
    devtool: 'cheap-module-eval-source-map',

    module: {

        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, '../client/components'),
                path.resolve(__dirname, '../client/core'),
                path.resolve(__dirname, '../client/routes'),
                path.resolve(__dirname, '../client/index.js'),
            ],
            query: {
                // https://babeljs.io/docs/usage/options/
                babelrc: false,
                presets: [
                    'react',
                    'es2015',
                    'stage-0'
                ],
                plugins: [
                    'transform-runtime'
                ]
            }
        }]
    }

};

export default config;

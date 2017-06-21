import React from 'react';
import ReactDOM from 'react-dom/server';
import Promise from 'bluebird';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';

import Html from './client/components/Html';
import schema from './graphql';

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/graphql', (err) => {
    if (err) throw err;
    console.log('Connect to db successfully!');
});

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('./tools/webpack.config').default;
    app.use(webpackMiddleware(webpack(webpackConfig), { stats: webpackConfig.stats}));
}

app.use('/client', express.static('./client'));
app.use('/graphql', express.static('./graphql'));

app.use('/graphql', graphQLHTTP(req => ({
    schema,
    graphiql: true,
    pretty: true
})));

app.get('*', (req, res) => {
    const markup = ReactDOM.renderToStaticMarkup(<Html />);
    res.send(`<!doctype html>\n${markup}`);
});

app.listen(port, () => {
    console.log(`Express server is running at http://localhost:${port}`);
});

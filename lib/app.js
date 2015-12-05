import express from 'express';
import React from 'react';
import {join, resolve} from 'path';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';
import morgan from 'morgan';
import errors from 'common-errors';
import compression from 'compression';
import cacheControl from 'connect-cache-control';

const IS_PROD = (process.env.NODE_ENV === 'production'),
  favicon = resolve(__dirname, '../assets/favicon.ico'),
  app = module.exports = express();

app.disable('etag');
app.enable('trust proxy');

// utility middleware
if (!IS_PROD) {
  app.use(morgan('dev'));
  app.use(cacheControl);
}

app.use(compression());
app.use(serveFavicon(favicon));

app.use('/_health', (req, res) => {
  res.sendStatus(200);
});

// app resources
app.use('/assets', serveStatic(join(__dirname, '/dist')));

// placeholder
const initialData = (req, cb) => {
  cb(null, {});
};

app.use('/', (req, res) => {
  initialData(req, function (err, props) {
    if (err) res.send(err);

    var App = React.createFactory(require('./lib/components/App/App'));

    res.send('<!DOCTYPE html>' + React.renderToString(App(props)));

  });
});

app.use(errors.middleware.errorHandler);

import express from 'express';
import {join, resolve} from 'path';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';
import morgan from 'morgan';
import errors from 'common-errors';
import compression from 'compression';
import cacheControl from 'connect-cache-control';
import render from './renderer';

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
app.use('/assets', serveStatic(join(__dirname, '/dist/bundles')));

app.use('/', (req, res) => {
  render(req, (err, html) =>{
    if (err) res.status(500).send(err);

    res.status(200).send(html);
  });
});

app.use(errors.middleware.errorHandler);

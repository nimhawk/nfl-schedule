import React, {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import App from './components/App/App';

// placeholder
const getInitialData = (req, cb) => {
  cb(null, {});
};

export default function(req, cb) {
  getInitialData(req, (err, props) => {
    if (err) return cb(err);

    const component = createElement(App, props);

    return cb(null, '<!DOCTYPE html>' + renderToString(component));
  });
}

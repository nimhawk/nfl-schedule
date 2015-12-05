/* global window, document */

import AppStyle from './App.scss';

import React, {createClass} from 'react';
import {render} from 'react-dom';
import ProcessEnv from '../Scripts/ProcessEnv';

const App = createClass({

  componentWillMount: function() {
    ProcessEnv.toProcess();
  },

  componentDidMount: function() {
    // Provide jQuery on the window since some dependencies require it
    // Use require syntax for dynamic loading and only run it cliet-side
    window.jQuery = window.$ = require('jquery');
  },

  render: function () {
    return (
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/assets/App.css" />
          <ProcessEnv/>
        </head>

        <body>
         <div id="Home" className="clearfix">

          <div style={{"height": "100px"}}> Hello World</div>

        </div>

          <script src="/assets/App.js"></script>
          <script dangerouslySetInnerHTML={{
            __html: 'window.renderApp(' + JSON.stringify(this.props) + ');'
          }}>
          </script>

        </body>
      </html>
    );
  }
});

if ('object' === typeof window) {
  window.renderApp = function (props) {
    var app = React.createElement(App, props);
    render(app, document);
  };
}

export { App as default };


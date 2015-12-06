/* global window, document */

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

    require('bootstrap/js/dropdown');
  },

  render: function () {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>New England Patriots 2015 Schedule</title>
          <link rel="stylesheet" type="text/css" href="/assets/App.css" />
          <ProcessEnv/>
        </head>

        <body>

        <div id="wrapper">
                <div id="page-wrapper">
                  <div className="row">
                    <div className="col-lg-12">
                      <h1 className="page-header"> New England Patriots</h1>
                    </div>
                    {/* /.col-lg-12 */}
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="nav nav-pills">
                        <li role="presentation" className="active"><a href="#">Home</a></li>
                        <li role="presentation" className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                              Seasons <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                            {
                               [2014, 2013, 2012, 2011, 2010].map((year) => {
                                 return <li key={year}><a href="#">{year}</a></li>;
                                })
                            }
                            </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    {/* /.col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                        2015 Schedule and Results

                       </div>
                        {/* /.panel-heading */}
                        <div className="panel-body">
                          <div className="table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Username</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="success">
                                 <td>Week 1 - 09/10/15</td>
                                 <td>Patriots <b>28</b></td>
                                 <td>vs.</td>
                                 <td>Pittsburgh Steelers <i>21</i></td>
                                 <td><b>W</b></td>
                                </tr>
                                <tr className="warning">
                                 <td>Week 4 - ???</td>
                                 <td colSpan="4"><b>BYE</b></td>
                                </tr>

                                <tr className="danger">
                                  <td>Week 12 - 11/29/15</td>
                                 <td>Patriots <i>24</i></td>
                                 <td>@</td>
                                 <td>Denver Broncos <b>30</b></td>
                                 <td><b>L</b></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          {/* /.table-responsive */}
                        </div>
                        {/* /.panel-body */}
                      </div>
                      {/* /.panel */}
                    </div>
                    {/* /.col-lg-6 */}
                  </div>
                  {/* /.row */}
                </div>
                {/* /#page-wrapper */}
              </div> { /* /#wrapper */ }

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


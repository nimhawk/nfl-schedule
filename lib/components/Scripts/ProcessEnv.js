import React, {createClass} from 'react';

const processVars = [
'IS_PROD',
'NODE_ENV'
];

export default createClass({
  statics: {
    toProcess: function () {
      if(typeof window === 'undefined') {
        return;
      }

      if (window.PROCESS_ENV && process.env !== window.PROCESS_ENV) {
        process.env = window.PROCESS_ENV;
      }
    }
  },

  safeStringify: function(obj) {
    delete obj.children;
    return JSON.stringify(obj).replace(/<\/script/g,
      '<\\/script').replace(/<!--/g, '<\\!--');
  },

  render: function () {
    var processEnv = {};
     processVars.forEach(function(v){
       if(typeof process.env[v] !== 'undefined') {
         processEnv[v] = process.env[v];
       }
     });
     return (
       <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: 'window.PROCESS_ENV = ' + this.safeStringify(processEnv) + ';'
       }}/>
     );
  }
});

require('babel/register');

var PORT = process.env.PORT || 5000,
app = require('./lib/app');

if (!module.parent) {
  app.listen(PORT, function () {
    console.log('on :%s', PORT);
  });
}


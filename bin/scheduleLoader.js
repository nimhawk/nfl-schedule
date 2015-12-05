import request from 'request';
import $ from 'cheerio';
import writeFile from 'fs';
import waterfall from 'async';

function load(cb) {
  const url = 'http://espn.go.com/nfl/team/schedule/_/name/ne/new-england-patriots';

  const opts = {
    url,
    timeout: 5000
  }

  request(opts, (err, res, body) => {
    if (err) return cb(err);

    if (res && res.statusCode !== 200) {
      return cb(new Error(`invalid statusCode ${res.statusCode}`));
    }

    if(!body || !body.length) {
      return cb(new Error('no body returned'));
    }

    return cb(null, body);
  });
}

function parseHTML(html, cb) {
  const selector = '.team .rows'

  //parse it down to the html tag for the wrapper div/table
  const tags = '';

  if (!tags) {
    return cb(new Error(`cannot parse tags via ${selector}`));
  }

  return cb(null, tags);
}

function validateTags(tags, cb) {
  // should have rows for 17 weeks including one bye
  // rows should have calls for opponent, home/away, score

  if (rows < 17) {
    return cb(new Error(`invalid number of rows ${rows}`));
  }

  rows.forEach((i, r) => {
    if (cols < 4) {
      return cb(new Error(`invalid number of columns ${columns}));
    }
  });

  return cb(null, tags);
}

function adaptJSON(tags, cb) {
    let json = {};

    //parse json into the format we want

    return cb(null, json);
}

function writeJSON(json, cb) {
  const fileName = 'schedule.json';

  const contents = JSON.stringify(json);

  retturn writeFile(file, contents, (err) => {
    if(err) return cb(err);

    return cb(null, contents);
  });
}

waterFall([
  load,
  parseHTML,
  validateTags,
  adaptJSON,
  writeJSON
],
(err, results) => {
  if(err) {
    console.error(err);
  } else {
    console.log('successfully wrote:');
    console.log(results);
  }
});



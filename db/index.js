// todo(pinussilvestrus): connect to s3, for now, a local json is sufficient
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname + '/rides.json');

const EMPTY_OBJECT = [];


function post(entry) {
  const data = getContents();

  data.push(entry);

  return fs.writeFileSync(DB_PATH, JSON.stringify(data));
}

function get() {
  return getContents();
}

function setup() {
  return fs.writeFileSync(DB_PATH, JSON.stringify(EMPTY_OBJECT));
}

function getContents() {

  // create db if non existing
  if (!fs.existsSync(DB_PATH)) {
    setup();
  }

  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

module.exports = {
  get,
  post,
  setup
};
const get = require('./index').get;
const getDBStats = require('./index').getDBStats;

/**
 * {
 *   'Blue Fire': [{ value: 30, timestamp: ...}, { ... }],
 *   ...
 * }
 */
function timesPerCoaster(entries) {
  const ridesMap = {};

  entries.forEach(e => {

    const {
      timestamp,
      data
    } = e;

    data.forEach(d => {
      const {
        name,
        waitTime,
        status
      } = d;

      if (!ridesMap[name]) {
        ridesMap[name] = [];
      }

      status !== 'Closed' && ridesMap[name].push({
        value: waitTime,
        timestamp
      });
    });
  });

  return ridesMap;
}

function general(entries) {
  console.log('#general');
  console.log(entries.length, 'timestamp entries fetched.');
  entries.length && console.log('From:', entries[0].timestamp, ', to:', entries[entries.length - 1].timestamp, '.');
  console.log('Total size:', getDBStats().size, 'Bytes.');
  console.log();
}

function avgWaitingTimePerCoaster(ridesMap) {
  console.log('#avgWaitingTimePerCoaster');

  Object.keys(ridesMap).forEach(key => {
    const rides = ridesMap[key];

    if (!rides.length) {
      return console.log('No data for <', key, '>');
    }

    let sum = 0;
    rides.forEach(r => {
      sum += r.value;
    });

    console.log(key, ':', floor(sum / rides.length));
  });

  console.log();
}


const entries = get();
const ridesMap = timesPerCoaster(entries);

general(entries);
avgWaitingTimePerCoaster(ridesMap);



// helper //////////////

// eslint-disable-next-line
 function printJSON(val) {
  console.log(JSON.stringify(val, null, 2));
}

function floor(number) {
  return Math.floor(number * 100) / 100;
}
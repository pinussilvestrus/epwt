const get = require('./index').get;
const getDBStats = require('./index').getDBStats;

function general(entries) {
  console.log('#general');
  console.log(entries.length, 'timestamp entries fetched.');
  entries.length && console.log('From:', entries[0].timestamp, ', to:', entries[entries.length - 1].timestamp, '.');
  console.log('Total size:', getDBStats().size, 'Bytes.');
  console.log();
}

/**
 * Prints average waiting time of each coaster.
 * 
 * {
 *   'Blue Fire': [{ value: 30, timestamp: ...}, { ... }],
 *   ...
 * }
 */
function avgWaitingTimePerCoaster(entries) {
  const ridesMap = {};

  console.log('#avgWaitingTimePerCoaster');

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

  Object.keys(ridesMap).forEach(key => {
    const rides = ridesMap[key];

    if (!rides.length) {
      return console.log('No data for <', key, '>');
    }

    let sum = 0;
    rides.forEach(r => {
      sum += r.value;
    });

    console.log(key, ':', Math.floor(sum / rides.length * 100) / 100);
  });

  console.log();
}


const entries = get();

general(entries);
avgWaitingTimePerCoaster(entries);



// helper //////////////

// eslint-disable-next-line
 function printJSON(val) {
  console.log(JSON.stringify(val, null, 2));
}
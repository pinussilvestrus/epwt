const get = require('./index').get;


const entries = get();

// print average waiting time of each coaster

/**
 * {
 *   'Blue Fire': [{ value: 30, timestamp: ...}, { ... }],
 *   ...
 * }
 */
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


    // todo(pinussilvestrus): ignore closed state
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

  console.log(key, ':', sum / rides.length);
});


// helper //////////////

// eslint-disable-next-line
 function printJSON(val) {
  console.log(JSON.stringify(val, null, 2));
}
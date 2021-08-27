/**
 * {
 *   'Blue Fire': [{ value: 30, timestamp: ...}, { ... }],
 *   'Jungle Rafzs': [{ value: 15, timestamp: ...}, { ... }],
 *   ...
 * }
 */
export function timesPerCoaster(entries) {
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

export function getAverageWaitingTime(rides) {
  if (!rides.length) {
    return 0;
  }

  let sum = 0;
  rides.forEach(r => {
    sum += r.value;
  });

  return floor(sum / rides.length);
}


// helper ////////////////////

function floor(number) {
  return Math.floor(number * 100) / 100;
}
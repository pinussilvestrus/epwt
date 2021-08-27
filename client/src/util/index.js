import dateformat from 'dateformat';

import {
  find,
  groupBy,
  keys,
  sortBy
} from 'min-dash';

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

export function groupByTime(rides) {
  return groupBy(rides, ride => {
    return getReferenceTimeString(ride.timestamp);
  });
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

export function getTimeSeriesData(coastersGroupedByTimeFrame, coasterKey) {
  const rawData = find(coastersGroupedByTimeFrame, coaster => coaster.key === coasterKey);
  const timeSeriesData = keys(rawData.times).map(key => {
    const time = rawData.times[key];

    // always assume the 01-01-1900 as prefix, needed to work with
    // FusionCharts time format
    // cf. https://www.fusioncharts.com/dev/fusiontime/getting-started/output-time-format
    return [
      '18-01-14-' + key,
      time.average
    ];
  });

  // sort time series by time frame (from 07:00-20:00)
  return sortBy(timeSeriesData, t => t[0]);
}


// helper ////////////////////

function floor(number) {
  return Math.floor(number * 100) / 100;
}

/**
 * Classifies a given date into a given time frame, e.g. 09:00 or 09:30.
 *
 * @param {Date} date
 * @returns {String}
 */
function getReferenceTimeString(date) {
  const fullTime = dateformat(date, 'isoTime');

  const [
    hours,
    minutes
  ] = fullTime.split(':');

  let minutesFrame = '00';

  if (minutes >= 15 && minutes < 30) {
    minutesFrame = '15';
  } else if (minutes >= 30 && minutes < 45) {
    minutesFrame = '45';
  } else if (minutes >= 45 && minutes < 59) {
    minutesFrame = '45';
  }

  return hours + `:${minutesFrame}`;
}
const Themeparks = require('themeparks');

const getWaitTimes = require('./epwt');

Themeparks.Settings.Cache = __dirname + '/themeparks.db';


const CheckWaitTimes = () => {
  getWaitTimes().then((rideTimes) => {
    rideTimes.data.forEach((ride) => {
      console.log(`${ride.name}: ${ride.waitTime} minutes wait (${ride.status})`);
    });
  }).catch((error) => {
    console.error(error);
  }).then(() => {
    setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
  });
};
CheckWaitTimes();

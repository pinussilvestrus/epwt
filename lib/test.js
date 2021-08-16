const getWaitTimes = require('./epwt');

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

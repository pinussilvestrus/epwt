require('dotenv').config({ path: __dirname + '/../.env' });

const { ZBClient } = require('zeebe-node');

const getWaitTimes = require('../lib');

const clientId = process.env.ZEEBE_CLIENT_ID;
const clientSecret = process.env.ZEEBE_CLIENT_SECRET;
const clusterId = process.env.CLOUD_CLUSTER_ID;

if (!clientId || !clientSecret || !clusterId) {
  console.error('Not configured.');
  process.exit(1);
}

const zbClient = new ZBClient({
  camundaCloud: {
    clientId,
    clientSecret,
    clusterId
  },
});

console.log('Start waiting for <fetch-waiting-times> jobs...');

const zbWorker = zbClient.createWorker({
  taskType: 'fetch-waiting-times',
  onConnectionError: () => zbWorker.log('Disconnected'),
  onReady: () => zbWorker.log('Connected.'),
  taskHandler: async (job) => {
    zbWorker.log('Received job for <fetch-waiting-times>:', job);

    const rideTimes = await getWaitTimes();
    rideTimes.data.forEach((ride) => {
      zbWorker.log(`${ride.name}: ${ride.waitTime} minutes wait (${ride.status})`);
    });

    job.complete({
      rideTimes
    });
  }
});
const Themeparks = require('themeparks');

const EP = new Themeparks.Parks.EuropaPark();

module.exports = async function getWaitTimes() {
  return EP.GetWaitTimes();
};
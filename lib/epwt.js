const Themeparks = require('themeparks');

const EP = new Themeparks.Parks.EuropaPark();

module.exports = async function getWaitTimes() {
  const data = await EP.GetWaitTimes();
  return {
    timestamp: new Date(),
    data: data.map(r => {
      return {
        name: r.name,
        waitTime: r.waitTime,
        status: r.status
      };
    })
  };
};
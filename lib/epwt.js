const Themeparks = require('themeparks');

const EP = new Themeparks.Parks.EuropaPark();

module.exports = async function getWaitTimes(shouldFilter) {
  let data = await EP.GetWaitTimes();

  if(shouldFilter) {
    data = data.filter(d => d.status !== 'Closed');
  }

  if(!data.length) {
    return;
  }

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
<script>
  import {
    keys
  } from 'min-dash';

  import TimeChart from './TimeChart.svelte';

  import {
    getAverageWaitingTime,
    getTimeSeriesData,
    groupByTime,
		timesPerCoaster
	} from '../util';

  const BLUE_FIRE_KEY = 'blue fire Megacoaster powered by Nord Stream 2';
  const SILVER_STAR_KEY = 'Silver Star';
  const ARTHUR_KEY = 'ARTHUR';
  const PIRATES_IN_BATAVIA_KEY = 'Pirates in Batavia';


  export let entries = [];

  let coasters = [], groupedByTimeFrame = [];
  $: {
    coasters = timesPerCoaster(entries);
    
    // group by time frame for each coaster
    groupedByTimeFrame = keys(coasters).map(key => {
      const coaster = coasters[key];
      const times = groupByTime(coaster);

      // calculate average waiting time per time frame
      keys(times).forEach(key => {
        const time = times[key];
        time.average = getAverageWaitingTime(time)
      });

      return { 
        key, 
        times
      };
    });
  }

  let selectedCoaster = BLUE_FIRE_KEY;
  let selectedTimeSeriesData = [];
  $: {
    selectedTimeSeriesData = getTimeSeriesData(groupedByTimeFrame, selectedCoaster);
  }
</script>

<div class="avgPerCoaster">
  <h3>Average waiting time</h3>
  <select name="selectedCoaster" bind:value={ selectedCoaster }>
    {#each groupedByTimeFrame as { key }}
      <option selected={ key === selectedCoaster } value={ key }>{key}</option>
    {/each}
  </select>
  <TimeChart data={ selectedTimeSeriesData } coaster={ selectedCoaster } />
</div>

<style>
  h3 {
    font-size: 24px;
  }
</style>
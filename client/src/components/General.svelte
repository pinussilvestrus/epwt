<script>
  import {
    keys,
    sortBy
  } from 'min-dash';

  import dateformat from 'dateformat';

  import {
    getAverageWaitingTime,
		timesPerCoaster
	} from '../util';

  export let entries = [];

  let firstEntry, lastEntry;
  $: {
    firstEntry = entries[0];
    lastEntry = entries[entries.length - 1];
  }

  let coasters, avgWaitingTimes;
  $: {
    coasters = timesPerCoaster(entries);
    
    avgWaitingTimes = keys(coasters).map(key => {
      return {
        key,
        value: getAverageWaitingTime(coasters[key])
      }
    });

    // sort waiting times
    avgWaitingTimes = sortBy(avgWaitingTimes, (a) => a.value * -1);
  }
</script>

<div class="general">
  <h3>General data</h3>
  <div class="themepark">
    <p>Selected themepark: <span class="badge">Europa Park (Rust)</span></p>
  </div>
  {#if entries.length}
    <div class="timespan">
      <p>Data collected from <span class="badge">{ dateformat(firstEntry.timestamp) }</span> to <span class="badge">{ dateformat(lastEntry.timestamp) }</span></p>
    </div>
    <div class="totalEntries">
      <p>Total data points collected: <span class="badge">{ entries.length } entries</span></p>
    </div>
    <div class="totalCoasters">
      <p>Total number of coasters tracked: <span class="badge">{ keys(coasters).length } coasters</span></p>
    </div>
    <div class="mostFrequent">
      <p>Most frequent visited coaster (in average waiting time):</p>
      <ol>
        {#each {length: 5} as _, i}
          <li><span class="badge">{ avgWaitingTimes[i].key }</span> ({ avgWaitingTimes[i].value } minutes)</li>
        {/each}
      </ol>
    </div>
  {/if}
</div>

<style>
  h3 {
    font-size: 24px;
  }
	p {
		font-weight: 200;
		font-size: 20px;
	}

  li {
    margin-bottom: 16px;
  }

  .badge {
		background-color: #ffc775;
		padding: 6px 12px;
		border-radius: 20px;
	}
</style>
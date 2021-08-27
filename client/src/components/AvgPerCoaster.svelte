<script>
  import {
    keys
  } from 'min-dash';

  import {
    groupByTime,
		timesPerCoaster
	} from '../util';

  export let entries = [];

  let coasters, coastersGroupedByTimeFrame;
  $: {
    coasters = timesPerCoaster(entries);
    
    coastersGroupedByTimeFrame = keys(coasters).map(key => {
      const coaster = coasters[key];
      return { key, times: groupByTime(coaster) };
    });

    console.log(coastersGroupedByTimeFrame);
  }
</script>

<div class="avgPerCoaster">
  <h3>Average waiting time</h3>
  <p> todo ... </p>
</div>

<style>
  h3 {
    font-size: 24px;
  }
	p {
		font-weight: 200;
		font-size: 20px;
	}
</style>
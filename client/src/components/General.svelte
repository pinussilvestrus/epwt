<script>
  import dateformat from 'dateformat';

  export let entries = [];

  let firstEntry, lastEntry;
  $: {
    firstEntry = entries[0];
    lastEntry = entries[entries.length - 1];
  }
</script>

{#if entries.length}
  <div class="timespan">
    <p>Data collected from <span class="badge">{ dateformat(firstEntry.timestamp) }</span> to <span class="badge">{ dateformat(lastEntry.timestamp) }</span></p>
  </div>
{/if}

<style>
	p {
		font-weight: 200;
		font-size: 20px;
	}

  .badge {
		background-color: #ffc775;
		padding: 6px 12px;
		border-radius: 20px;
	}
</style>
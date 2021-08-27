<script>
	import data from '../../db/rides.json';

	import General from './components/General.svelte';
	import AvgPerCoaster from './components/AvgPerCoaster.svelte';
</script>

<main>
	<div class="header">
		<h1>epwt</h1>
		<h2>Roller coaster mining with Camunda Cloud</h2>
	</div>
	
	<div class="content">
		<General entries={ data } />
		<AvgPerCoaster entries={ data } />
	</div>
</main>

<style>
	main {
		padding: 2em 6em;
		max-width: 240px;
		margin: 0 auto;
		font-weight: 200;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h2 {
		font-weight: 200;
		font-size: 2em;
	}

	.header {
		text-align: center;
	}

	.content {
		padding-top: 1em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
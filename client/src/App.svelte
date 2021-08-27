<script>
	import data from '../../db/rides.json';

	import General from './components/General.svelte';

	console.log(data);
</script>

<main>
	<div class="header">
		<h1>epwt</h1>
		<h2>Roller coaster mining with Camunda Cloud</h2>
	</div>
	
	<div class="content">
		<p>Selected themepark: <span class="badge">Europa Park (Rust)</span></p>
		<General entries={ data } />
	</div>
</main>

<style>
	main {
		padding: 2em;
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

	p {
		font-weight: 200;
		font-size: 20px;
	}

	.header {
		text-align: center;
	}

	.content {
		padding-top: 1em;
	}

	.badge {
		background-color: #ffc775;
		padding: 6px 12px;
		border-radius: 20px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
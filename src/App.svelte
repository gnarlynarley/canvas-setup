<script lang="ts">
	import paintOffset from 'src/lib/paintOffset';
	import renderOptions from 'src/lib/stores/renderOptions';
	import './App.scss';
</script>

<div class="container">
	{#if $renderOptions}
		<div class="input-group">
			<div class="input">
				<label for="width">width</label>
				<input id="width" type="number" bind:value={$renderOptions.width} />
			</div>
			<div class="input">
				<label for="height">height</label>
				<input id="height" type="number" bind:value={$renderOptions.height} />
			</div>
			<div class="input">
				<label for="offset">offset</label>
				<input id="offset" type="number" bind:value={$renderOptions.offset} />
			</div>

			<div class="input">
				<label for="background">background</label>
				<input id="background" type="checkbox" bind:checked={$renderOptions.background} />
			</div>
			{#if $renderOptions.background}
				<div class="input">
					<label for="backgroundColor">background color</label>
					<input id="backgroundColor" type="color" bind:value={$renderOptions.backgroundColor} />
				</div>
				<div class="input">
					<label for="backgroundOpacity">background opacity</label>
					<input
						id="backgroundOpacity"
						type="range"
						min={0}
						max={100}
						bind:value={$renderOptions.backgroundOpacity}
					/>
				</div>
			{/if}

			<div class="input">
				<label for="border">border</label>
				<input id="border" type="checkbox" bind:checked={$renderOptions.border} />
			</div>
			{#if $renderOptions.border}
				<div class="input">
					<label for="borderWidth">border width</label>
					<input id="borderWidth" type="number" bind:value={$renderOptions.borderWidth} />
				</div>
				<div class="input">
					<label for="borderOpacity">border opacity</label>
					<input
						id="borderOpacity"
						type="range"
						min={0}
						max={100}
						bind:value={$renderOptions.borderOpacity}
					/>
				</div>
			{/if}
		</div>
		<div class="canvas-container">
			<canvas use:paintOffset={$renderOptions} />
		</div>
	{:else}
		<h1>loading..</h1>
	{/if}
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.input-group {
		position: absolute;
		top: 0;
		left: 0;
		padding: var(--spacing);
		background: rgba(white, 0.9);
		backdrop-filter: blur(3px);
		z-index: 1;
		box-shadow: 0 1px 5px rgba(black, 0.1);
	}
	.input {
		& + & {
			margin-top: var(--gutter);
		}
		label {
			display: block;
		}
	}

	.canvas-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: var(--spacing) solid white;

		canvas {
			object-fit: contain;
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>

<script lang="ts">
	import paintOffset from 'src/lib/paintOffset';
	import renderOptions, { setDefaults } from 'src/lib/stores/renderOptions';
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
				<label for="background">offset background</label>
				<input id="background" type="checkbox" bind:checked={$renderOptions.offsetBackground} />

				{#if $renderOptions.offsetBackground}
					<div class="input">
						<label for="backgroundColor">offset background color</label>
						<input
							id="backgroundColor"
							type="color"
							bind:value={$renderOptions.offsetBackgroundOpacity}
						/>
					</div>
					<div class="input">
						<label for="backgroundOpacity">offset background opacity</label>
						<input
							id="backgroundOpacity"
							type="range"
							min={0}
							max={100}
							bind:value={$renderOptions.offsetBackgroundOpacity}
						/>
					</div>
				{/if}
			</div>

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
					<label for="borderColor">border color</label>
					<input id="borderColor" type="color" bind:value={$renderOptions.borderColor} />
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

			<div class="input">
				<label for="safeZone">safe zone</label>
				<input id="safeZone" type="checkbox" bind:checked={$renderOptions.safeZone} />
			</div>
			{#if $renderOptions.safeZone}
				<div class="input">
					<label for="safeZoneWidth">safe zone width</label>
					<input id="safeZoneWidth" type="number" bind:value={$renderOptions.safeZoneWidth} />
				</div>
				<div class="input">
					<label for="safeZoneColor">safe zone color</label>
					<input id="safeZoneColor" type="color" bind:value={$renderOptions.safeZoneColor} />
				</div>
				<div class="input">
					<label for="safeZoneOpacity">safe zone opacity</label>
					<input
						id="safeZoneOpacity"
						type="range"
						min={0}
						max={100}
						bind:value={$renderOptions.safeZoneOpacity}
					/>
				</div>

				<div>
					<button type="button" on:click={setDefaults}>defaults</button>
				</div>
			{/if}
		</div>

		<div class="canvas-container">
			<img alt="canvas template" use:paintOffset={$renderOptions} />
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
		padding: var(--spacing);
		gap: var(--spacing);
	}

	.input-group {
		z-index: 1;
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
		background: url('./App.tile.svg') repeat;
		background-size: 20px;
		border-radius: 1em;
		overflow: hidden;
		height: 100%;
		width: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
</style>

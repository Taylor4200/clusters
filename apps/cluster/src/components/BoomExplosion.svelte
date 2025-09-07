<script lang="ts" module>
	export type EmitterEventBoomExplosion =
		| { type: 'boomExplosionShow' }
		| { type: 'boomExplosionHide' }
		| { type: 'boomExplosionUpdate' };
</script>

<script lang="ts">
	import { Container, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { getContext } from '../game/context';

	const context = getContext();

	let show = $state(false);
	let oncomplete = $state<() => void>(() => {});

	context.eventEmitter.subscribeOnMount({
		boomExplosionShow: () => {
			show = true;
		},
		boomExplosionHide: () => {
			show = false;
		},
		boomExplosionUpdate: async () => {
			await new Promise<void>((resolve) => {
				oncomplete = () => resolve();
			});
		},
	});
</script>

{#if show}
	<!-- Disabled boom explosion to avoid white screen -->
{/if}

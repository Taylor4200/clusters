<script lang="ts" module>
	export type EmitterEventHeistContinue =
		| { type: 'heistContinueShow' }
		| { type: 'heistContinueHide' }
		| { type: 'heistContinueUpdate' };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { Sprite } from 'pixi-svelte';
	import { waitForResolve } from 'utils-shared/wait';

	import { getContext } from '../game/context';

	const context = getContext();

	let show = $state(false);
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		heistContinueShow: () => (show = true),
		heistContinueHide: () => (show = false),
		heistContinueUpdate: async () => {
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<!-- Empty container - no content to avoid white screen -->
</FadeContainer>

<!-- Press anywhere to continue -->
{#if show}
	<div
		class="absolute inset-0 cursor-pointer z-10"
		onclick={() => oncomplete()}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && oncomplete()}
		aria-label="Press to continue"
	></div>
{/if}

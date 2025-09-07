<script lang="ts" module>
	export type EmitterEventFreeSpinIntro =
		| { type: 'freeSpinIntroShow' }
		| { type: 'freeSpinIntroHide' }
		| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { stateUrlDerived } from 'state-shared';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { BitmapText, SpineProvider, SpineSlot, SpineTrack, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import PressToContinue from './PressToContinue.svelte';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';

	type AnimationName = 'intro' | 'idle';

	const context = getContext();

	let show = $state(false);
	let animationName = $state<AnimationName>('intro');
	let freeSpinsFromEvent = $state(0);
	let oncomplete = $state(() => {});
	
	// Derived sprite key to ensure reactivity
	const freeSpinsSpriteKey = $derived(`freespins_${stateUrlDerived.lang()}.png`);

	context.eventEmitter.subscribeOnMount({
		freeSpinIntroShow: () => {
			console.log('FreeSpinIntro: freeSpinIntroShow triggered');
			console.log('Current language:', stateUrlDerived.lang());
			console.log('Derived sprite key:', freeSpinsSpriteKey);
			console.log('Font should be: goldBlur');
			console.log('Number to display:', freeSpinsFromEvent);
			show = true;
		},
		freeSpinIntroHide: () => {
			console.log('FreeSpinIntro: freeSpinIntroHide triggered');
			show = false;
		},
		freeSpinIntroUpdate: async (emitterEvent) => {
			console.log('FreeSpinIntro: freeSpinIntroUpdate triggered', emitterEvent);
			// if (emitterEvent.extraSpins) {
			// 	context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_fs_respins' });
			// }
			// freeSpinsFromEvent = emitterEvent.extraSpins ?? emitterEvent.totalFreeSpins;
			freeSpinsFromEvent = emitterEvent.totalFreeSpins;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});

	// Handle continue press - transition to free game mode
	const handleContinue = () => {
		console.log('FreeSpinIntro: handleContinue called');
		
		// Set game type to freegame
		context.stateGame.gameType = 'freegame';
		
		// Populate the board with symbols
		context.eventEmitter.broadcast({ type: 'boardShow' });
		
		// Show free spins UI
		context.eventEmitter.broadcast({ type: 'freeSpinCounterShow' });
		context.eventEmitter.broadcast({
			type: 'freeSpinCounterUpdate',
			current: 0,
			total: freeSpinsFromEvent,
		});
		
		// Hide the intro
		context.eventEmitter.broadcast({ type: 'freeSpinIntroHide' });
		
		console.log('FreeSpinIntro: Transitioned to freegame mode');
		
		// Complete the intro flow
		oncomplete();
	};
</script>

<FadeContainer {show}>
	<FreeSpinAnimation>
		{#snippet children({ sizes })}
			<!-- Pig Police Vault - centered as main focal point -->
			<Sprite
				anchor={{ x: 0.5, y: 0.5 }}
				width={400}
				height={400}
				y={0}
				key="pigPoliceVault"
			/>

			<!-- "CONGRATULATIONS" text - positioned at the top of the vault -->
			<BitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				x={0}
				y={-160}
				text="CONGRATULATIONS"
				style={{
					fontFamily: 'superbubble',
					fontSize: 35,
					fontWeight: 'bold',
				}}
				tint={0xFFD700}
			/>

			<!-- "YOU WON" text - positioned above the number -->
			<BitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				x={0}
				y={-50}
				text="YOU WON"
				style={{
					fontFamily: 'superbubble',
					fontSize: 28,
					fontWeight: 'bold',
				}}
				tint={0xFFFFFF}
			/>

			<!-- Number - positioned below YOU WON -->
			<BitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				x={0}
				y={0}
				text={freeSpinsFromEvent}
				style={{
					fontFamily: 'superbubble',
					fontSize: 60,
					fontWeight: 'bold',
				}}
				tint={0xFFFFFF}
			/>

			<!-- "FREE SPINS" text - positioned at the bottom of the vault -->
			<BitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				x={0}
				y={160}
				text="FREE SPINS"
				style={{
					fontFamily: 'superbubble',
					fontSize: 32,
					fontWeight: 'bold',
				}}
				tint={0xFFFFFF}
			/>
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => handleContinue()} />
</FadeContainer>

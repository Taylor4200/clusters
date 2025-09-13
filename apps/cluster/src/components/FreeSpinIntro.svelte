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
	import { INITIAL_BOARD } from '../game/constants';
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
		console.log('FreeSpinIntro: Current gameType:', context.stateGame.gameType);
		console.log('FreeSpinIntro: Current showTreasureVault:', context.stateGame.showTreasureVault);
		
		// Set game type to freegame
		context.stateGame.gameType = 'freegame';
		console.log('FreeSpinIntro: Set gameType to freegame');
		
		// Show the board first
		context.eventEmitter.broadcast({ type: 'boardShow' });
		
		// Use the existing board data if available, otherwise use INITIAL_BOARD
		if (context.stateGame.board && context.stateGame.board.length > 0) {
			context.eventEmitter.broadcast({ type: 'boardSettle', board: context.stateGame.board });
		} else {
			context.eventEmitter.broadcast({ type: 'boardSettle', board: INITIAL_BOARD });
		}
		
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
			<!-- Free Spin Background - centered as main focal point -->
			{console.log('FreeSpinIntro: Rendering freeSpinBackground sprite')}
			<Sprite
				anchor={{ x: 0.5, y: 0.5 }}
				width={400}
				height={400}
				y={0}
				key="freeSpinBackground"
			/>

			<!-- "CONGRATULATIONS" text - positioned at the top of the vault (20% smaller, moved up) -->
			<BitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				x={0}
				y={-170}
				text="CONGRATULATIONS"
				style={{
					fontFamily: 'superbubble',
					fontSize: 28,
					fontWeight: 'bold',
				}}
				tint={0xFFD700}
			/>


		<!-- Number - positioned slightly higher on the safe door -->
		<BitmapText
			anchor={{ x: 0.5, y: 0.5 }}
			x={0}
			y={132}
			text={freeSpinsFromEvent}
			style={{
				fontFamily: 'superbubble',
				fontSize: 60,
				fontWeight: 'bold',
			}}
			tint={0xFFFFFF}
		/>

			<!-- "FREE" text - positioned to the right, moved down a little more (20% smaller) -->
			<BitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				x={120}
				y={115}
				text="FREE"
				style={{
					fontFamily: 'superbubble',
					fontSize: 26,
					fontWeight: 'bold',
				}}
				tint={0xFFFFFF}
			/>

			<!-- "SPINS" text - positioned to the right, below FREE (20% smaller) -->
			<BitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				x={120}
				y={145}
				text="SPINS"
				style={{
					fontFamily: 'superbubble',
					fontSize: 26,
					fontWeight: 'bold',
				}}
				tint={0xFFFFFF}
			/>
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => handleContinue()} />
</FadeContainer>

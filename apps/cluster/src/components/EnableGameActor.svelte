<script lang="ts">
	import { onMount } from 'svelte';

	import { Text } from 'pixi-svelte';

	import { gameActor } from '../game/actor';
	import { getContext } from '../game/context';

	type Props = {
		debug?: boolean;
	};

	const props: Props = $props();
	const context = getContext();

	onMount(() => {
		const { unsubscribe } = gameActor.subscribe((snapshot) => {
			const previousValue = context.stateXstate.value;
			context.stateXstate.value = snapshot.value;
			
			// Enhanced debug logging for state transitions
			if (previousValue !== snapshot.value) {
				console.log('🔄 GAME STATE TRANSITION');
				console.log('Previous state:', previousValue);
				console.log('New state:', snapshot.value);
				console.log('Snapshot:', snapshot);
				console.log('Context:', context.stateGame);
				console.log('Timestamp:', new Date().toISOString());
				console.log('---');
			}
			
			// Log child actors if they exist
			if (snapshot.children && Object.keys(snapshot.children).length > 0) {
				console.log('👶 Child actors:', Object.keys(snapshot.children));
			}
		});

		console.log('🎮 Game Actor initialized');
		gameActor.start();
		gameActor.send({ type: 'RENDERED' });

		return () => {
			// Equivalent to onDestroy(); Leave this comment for searching.
			console.log('🛑 Game Actor stopping');
			unsubscribe();
			gameActor.stop();
		};
	});

	context.eventEmitter.subscribeOnMount({
		// Connect every actor with app.eventEmitter to avoid call actor directly
		bet: () => {
			console.log('🎯 === BET EVENT RECEIVED ===');
			console.log('Bet event received in EnableGameActor');
			console.log('Game type:', context.stateGame.gameType);
			console.log('Game actor state:', gameActor.getSnapshot());
			console.log('Sending BET to game actor...');
			gameActor.send({ type: 'BET' });
			console.log('BET sent to game actor');
			
			// Check game state after sending BET
			setTimeout(() => {
				console.log('🎯 Game actor state after BET:', gameActor.getSnapshot());
				console.log('🎯 Game type after BET:', context.stateGame.gameType);
			}, 1000);
		},
		autoBet: () => {
			console.log('🤖 AUTO BET EVENT');
			gameActor.send({ type: 'AUTO_BET' });
		},
		resumeBet: () => {
			console.log('▶️ RESUME BET EVENT');
			gameActor.send({ type: 'RESUME_BET' });
		},
		forceResult: () => {
			console.log('⚡ FORCE RESULT EVENT');
			gameActor.send({ type: 'FORCE_RESULT' });
		},
	});
</script>

{#if props.debug}
	<Text
		x={context.stateLayoutDerived.canvasSizes().width}
		anchor={{ x: 1, y: 0 }}
		style={{ fill: 0xffffff }}
		text={JSON.stringify(context.stateXstate.value, undefined, 2)}
	/>
{/if}

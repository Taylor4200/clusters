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
			context.stateXstate.value = snapshot.value;
			// const childActor = snapshot.children[snapshot.value];
		});

		gameActor.start();
		gameActor.send({ type: 'RENDERED' });

		return () => {
			// Equivalent to onDestroy(); Leave this comment for searching.
			unsubscribe();
			gameActor.stop();
		};
	});

	context.eventEmitter.subscribeOnMount({
		// Connect every actor with app.eventEmitter to avoid call actor directly
		bet: () => {
			console.log('=== BET EVENT RECEIVED ===');
			console.log('Bet event received in EnableGameActor');
			console.log('Game type:', context.stateGame.gameType);
			console.log('Game actor state:', gameActor.getSnapshot());
			console.log('Sending BET to game actor...');
			gameActor.send({ type: 'BET' });
			console.log('BET sent to game actor');
			
			// Check game state after sending BET
			setTimeout(() => {
				console.log('Game actor state after BET:', gameActor.getSnapshot());
				console.log('Game type after BET:', context.stateGame.gameType);
			}, 1000);
		},
		autoBet: () => gameActor.send({ type: 'AUTO_BET' }),
		resumeBet: () => gameActor.send({ type: 'RESUME_BET' }),
		forceResult: () => gameActor.send({ type: 'FORCE_RESULT' }),
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

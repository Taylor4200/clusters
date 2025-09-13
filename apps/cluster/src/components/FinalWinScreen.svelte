<script lang="ts" module>
	export type EmitterEventFinalWinScreen =
		| { type: 'finalWinScreenShow' }
		| { type: 'finalWinScreenHide' }
		| { type: 'finalWinScreenUpdate'; amount: number };
</script>

<script lang="ts">
	import { FadeContainer, WinCountUpProvider, ResponsiveBitmapText } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { OnMount } from 'components-shared';
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import PressToContinue from './PressToContinue.svelte';

	const context = getContext();

	let show = $state(false);
	let amount = $state(0);
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		finalWinScreenShow: () => (show = true),
		finalWinScreenHide: () => (show = false),
		finalWinScreenUpdate: async (emitterEvent) => {
			amount = emitterEvent.amount;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<WinCountUpProvider {amount} duration={2000} oncomplete={() => oncomplete()}>
		{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
			<OnMount onmount={() => startCountUp()} />

			<!-- Final Win Background - Pig Police Officers -->
			<Sprite
				key="finalWinBackground"
				anchor={0.5}
				x={context.stateLayoutDerived.canvasSizes().width * 0.5}
				y={context.stateLayoutDerived.canvasSizes().height * 0.5}
				width={context.stateLayoutDerived.canvasSizes().width * 0.6}
				height={context.stateLayoutDerived.canvasSizes().height * 0.6}
			/>

			<!-- Final Win Amount Text -->
			<ResponsiveBitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				x={context.stateLayoutDerived.canvasSizes().width * 0.5}
				y={context.stateLayoutDerived.canvasSizes().height * 0.625}
				style={{
					fontFamily: 'goldblur',
					fontSize: 72,
					fontWeight: 'bold',
				}}
				text={bookEventAmountToCurrencyString(countUpAmount)}
				maxWidth={context.stateLayoutDerived.canvasSizes().width * 0.7}
				tint={0xFFD700}
			/>

			<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
		{/snippet}
	</WinCountUpProvider>
</FadeContainer>

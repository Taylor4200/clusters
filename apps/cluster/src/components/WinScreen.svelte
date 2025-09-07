<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventWinScreen =
		| { type: 'winScreenShow' }
		| { type: 'winScreenHide' }
		| { type: 'winScreenUpdate'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Container } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider, ResponsiveBitmapText } from 'components-pixi';
	import { waitForResolve, waitForTimeout } from 'utils-shared/wait';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { CanvasSizeRectangle, MainContainer } from 'components-layout';
	import { OnMount } from 'components-shared';

	import PressToContinue from './PressToContinue.svelte';
	import { Sprite } from 'pixi-svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { getContext } from '../game/context';

	const context = getContext();

	let show = $state(false);
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		winScreenShow: () => (show = true),
		winScreenHide: () => (show = false),
		winScreenUpdate: async (emitterEvent: { amount: number; winLevelData: WinLevelData }) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});

	// Get the appropriate win screen image based on win level
	const getWinScreenImage = (winLevelData: WinLevelData) => {
		switch (winLevelData.alias) {
			case 'big':
				return 'big-win.png';
			case 'epic':
				return 'epic-win.png';
			case 'mega':
				return 'mega-win.png';
			case 'max':
				return 'max-win.png';
			default:
				return 'big-win.png'; // fallback
		}
	};
</script>

<FadeContainer {show}>
	{#if winLevelData}
		{@const isBigWin = winLevelData.type === 'big'}
		{@const duration = winLevelData.presentDuration}
		{@const imageKey = getWinScreenImage(winLevelData)}
		
		<WinCountUpProvider {amount} {duration} oncomplete={() => oncomplete()}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount
					onmount={async () => {
						await startCountUp();
						await waitForTimeout(300);
						oncomplete();
					}}
				/>

				<MainContainer>
					{#if isBigWin}
						<!-- Win Screen Image - 25% smaller -->
						<Sprite
							key={imageKey}
							anchor={{ x: 0.5, y: 0.5 }}
							x={context.stateLayoutDerived.mainLayout().width * 0.5}
							y={context.stateLayoutDerived.mainLayout().height * 0.5}
							width={context.stateLayoutDerived.mainLayout().width * 0.6}
							height={context.stateLayoutDerived.mainLayout().height * 0.45}
						/>

						<!-- Win Amount Text Overlay - 25% smaller -->
						<Container
							x={context.stateLayoutDerived.mainLayout().width * 0.5}
							y={context.stateLayoutDerived.mainLayout().height * 0.7}
						>
							<ResponsiveBitmapText
								anchor={0.5}
								maxWidth={context.stateLayoutDerived.canvasSizes().width /
									context.stateLayoutDerived.mainLayout().scale}
								text={bookEventAmountToCurrencyString(countUpAmount)}
								style={{
									fontFamily: 'superbubble',
									fontSize: SYMBOL_SIZE * 1.5,
									align: 'center',
									fontWeight: 'bold',
									letterSpacing: 0,
									dropShadow: true,
									stroke: 0x000000,
								}}
								tint={0xFFD700}
							/>
						</Container>
					{:else}
						<!-- Regular win display for non-big wins -->
						<Container
							x={context.stateGameDerived.boardLayout().x}
							y={context.stateGameDerived.boardLayout().y}
						>
							<ResponsiveBitmapText
								anchor={0.5}
								maxWidth={context.stateLayoutDerived.canvasSizes().width /
									context.stateLayoutDerived.mainLayout().scale}
								text={bookEventAmountToCurrencyString(countUpAmount)}
								style={{
									fontFamily: 'superbubble',
									fontSize: SYMBOL_SIZE * 1.125,
									align: 'center',
									fontWeight: 'bold',
									letterSpacing: 0,
								}}
							/>
						</Container>
					{/if}
				</MainContainer>

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>

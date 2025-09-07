<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventWin =
		| { type: 'winShow' }
		| { type: 'winHide' }
		| { type: 'winUpdate'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Container } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider, ResponsiveBitmapText } from 'components-pixi';
	import { waitForResolve, waitForTimeout } from 'utils-shared/wait';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { CanvasSizeRectangle, MainContainer } from 'components-layout';
	import { OnMount } from 'components-shared';

	import WinCoins from './WinCoins.svelte';
	import WinAnimation from './WinAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import { Sprite } from 'pixi-svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { getContext } from '../game/context';

	const context = getContext();

	let show = $state(false);
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});
	let onCountUpComplete = $state(() => {});
	let coinEmissionTimeout = $state<number | null>(null);

	context.eventEmitter.subscribeOnMount({
		winShow: () => (show = true),
		winHide: () => (show = false),
		winUpdate: async (emitterEvent) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			
			// Set a timeout to stop coin emission after 1.5 seconds to prevent freezing
			if (coinEmissionTimeout) {
				clearTimeout(coinEmissionTimeout);
			}
			coinEmissionTimeout = setTimeout(() => {
				coinEmissionTimeout = null;
			}, 1500);
			
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		{@const isBigWin = winLevelData.type === 'big'}
		{@const duration = winLevelData.presentDuration}
		<WinCountUpProvider {amount} {duration} oncomplete={() => onCountUpComplete()}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount
					onmount={async () => {
						await startCountUp();
						await waitForTimeout(300);
						oncomplete();
					}}
				/>

				<MainContainer>
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
								fontSize: SYMBOL_SIZE * 1.5,
								align: 'center',
								fontWeight: 'bold',
								letterSpacing: 0,
							}}
						/>
					</Container>
				</MainContainer>

				<WinCoins emit={!countUpCompleted && countUpAmount > 0 && coinEmissionTimeout !== null} levelAlias={winLevelData?.alias} />

				{#if isBigWin && winLevelData}
					<!-- Custom Big Win Spine Animation -->
					<WinAnimation animationMap={winLevelData.animation!}>
						<!-- Pig Police Vault Image for Big Wins -->
						<Sprite
							key="pigPoliceVault"
							anchor={{ x: 0.5, y: 0.5 }}
							x={context.stateLayoutDerived.mainLayout().width * 0.5}
							y={context.stateLayoutDerived.mainLayout().height * 0.5}
							width={context.stateLayoutDerived.mainLayout().width * 0.6}
							height={context.stateLayoutDerived.mainLayout().height * 0.4}
						/>
					</WinAnimation>
				{/if}

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>

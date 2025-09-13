<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventWinScreen =
		| { type: 'winScreenShow' }
		| { type: 'winScreenHide' }
		| { type: 'winScreenUpdate'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Container, BitmapText } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider } from 'components-pixi';
	import { waitForResolve, waitForTimeout } from 'utils-shared/wait';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { CanvasSizeRectangle, MainContainer } from 'components-layout';
	import { OnMount } from 'components-shared';
	import { stateUrlDerived } from 'state-shared';

	import PressToContinue from './PressToContinue.svelte';
	import { Sprite } from 'pixi-svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { getContext } from '../game/context';

	const context = getContext();

	let show = $state(false);
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});
	let animationTime = $state(0);

	// Get current language for localized assets
	const currentLang = $derived(stateUrlDerived?.lang?.() || 'en');

	// Animation for single zoom in effect
	let animationId: number;
	let animationComplete = $state(false);
	
	// Start animation when component mounts
	$effect(() => {
		if (show && !animationComplete) {
			const animate = () => {
				animationTime += 0.02; // Smooth zoom in
				if (animationTime >= 1) {
					animationTime = 1; // Stop at full zoom
					animationComplete = true;
					cancelAnimationFrame(animationId);
				} else {
					animationId = requestAnimationFrame(animate);
				}
			};
			animate();
		} else if (!show) {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
			animationTime = 0;
			animationComplete = false;
		}
	});

	// Calculate single zoom in effect (0 to 1.1) - only zooms in once
	const pulseScale = $derived(1.0 + 0.1 * animationTime); // Linear zoom from 1.0 to 1.1

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
		// Always use heist crew background for all win levels
		// This ensures set wins always show the pig police officers background
		return 'heistCrewBg';
	};

	// Get the specific sprite name for normal/small wins
	const getWinSmallSpriteName = (winLevelData: WinLevelData) => {
		if (winLevelData.alias === 'big' || winLevelData.alias === 'epic' || winLevelData.alias === 'mega' || winLevelData.alias === 'max') {
			return null; // Not used for big wins
		}
		return `winsmall_${currentLang}.png`;
	};
</script>

<FadeContainer {show}>
					{#if winLevelData}
						{@const duration = winLevelData.presentDuration}
		
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
					{@const debugInfo = `WinScreen: Rendering WIN with heist crew background`}
					{console.log(debugInfo)}
					{console.log('WinScreen: winLevelData:', winLevelData)}
					{console.log('WinScreen: Using heistCrewBg asset for all wins')}
					
					<!-- Win Screen Image - Pig Police Officers Background -->
					<Sprite
						key="heistCrewBg"
						anchor={{ x: 0.5, y: 0.5 }}
						x={context.stateLayoutDerived.mainLayout().width * 0.507}
						y={context.stateLayoutDerived.mainLayout().height * 0.5}
						width={context.stateLayoutDerived.mainLayout().width * 0.45}
						height={context.stateLayoutDerived.mainLayout().height * 0.34}
					/>

					<!-- Win Level Text (BIG WIN, MEGA WIN, etc.) with pulsing zoom animation -->
					{#if winLevelData?.text}
						<BitmapText
							anchor={{ x: 0.5, y: 0.5 }}
							x={context.stateLayoutDerived.mainLayout().width * 0.507}
							y={context.stateLayoutDerived.mainLayout().height * 0.35}
							text={winLevelData.text}
							style={{
								fontFamily: 'superbubble',
								fontSize: 48,
								fontWeight: 'bold',
							}}
							tint={0xFFD700}
							scale={{ x: pulseScale, y: pulseScale }}
						/>
					{/if}

					<!-- Win Amount Text Overlay - More visible -->
					<BitmapText
						anchor={{ x: 0.5, y: 0.5 }}
						x={context.stateLayoutDerived.mainLayout().width * 0.507}
						y={context.stateLayoutDerived.mainLayout().height * 0.6}
						text={bookEventAmountToCurrencyString(countUpAmount)}
						style={{
							fontFamily: 'superbubble',
							fontSize: 72,
							fontWeight: 'bold',
						}}
						tint={0xFFFFFF}
					/>
				</MainContainer>

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>

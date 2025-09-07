<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey, EnableSpaceHold } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM } from 'pixi-svelte';
	import { stateModal, stateBet } from 'state-shared';

	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import { playBookEvent } from '../game/utils';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './Background.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import MultiplierGrid from './MultiplierGrid.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import ClusterWinAmounts from './ClusterWinAmounts.svelte';
	import TumbleBoard from './TumbleBoard.svelte';
	import TumbleWinAmount from './TumbleWinAmount.svelte';
	import GlobalMultiplier from './GlobalMultiplier.svelte';
	import Win from './Win.svelte';
	import WinScreen from './WinScreen.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import HeistContinueScreen from './HeistContinueScreen.svelte';
	import BoomExplosion from './BoomExplosion.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import I18nTest from './I18nTest.svelte';
	import ControlPanel from './ui/ControlPanel.svelte';

	import assets from '../game/assets';

	const context = getContext();
	context.stateApp.assets = assets;

	// Add time state and update logic
	let currentTime = '';
	function updateTime() {
		const now = new Date();
		currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});

	onMount(() => {
		context.stateLayout.showLoadingScreen = true;
		// Give player enough balance to test buy bonus
		stateBet.balanceAmount = 1000;
		
		// Force game into ready state after a short delay
		setTimeout(() => {
			context.stateLayout.showLoadingScreen = false;
			console.log('Game initialized - ready to spin!');
			console.log('Game state:', context.stateXstate.value);
		}, 2000);
	});

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: async () => {
			// Check if player has enough balance for buy bonus
			const buyBonusCost = 500;
			if (stateBet.balanceAmount >= buyBonusCost) {
				// Deduct the cost from balance
				stateBet.balanceAmount -= buyBonusCost;
				
				console.log('Buy bonus purchased - showing free spin intro');
				
				// Show free spin intro first
				context.eventEmitter.broadcast({ type: 'freeSpinIntroShow' });
				context.eventEmitter.broadcast({
					type: 'freeSpinIntroUpdate',
					totalFreeSpins: 10,
				});
				
				// Wait for user to continue before starting free spins
				// The FreeSpinIntro component will handle the transition to freegame mode
			} else {
				alert(`Insufficient balance! You need $${buyBonusCost} to buy bonus. Current balance: $${stateBet.balanceAmount.toFixed(2)}`);
			}
		},
	});
</script>

<style>
	.game-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 1100;
		pointer-events: none;
		padding: 0 32px;
		background: linear-gradient(to bottom, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.0) 10%);
	}
	.header-left, .header-right {
		display: flex;
		align-items: center;
		gap: 18px;
		font-family: 'Super Bubble', 'gold', 'proxima-nova', Arial, sans-serif;
		font-size: 1.1rem;
		color: #fff;
		font-weight: 600;
		pointer-events: auto;
	}
	button {
		font-family: 'Super Bubble', 'gold', Arial, sans-serif;
		font-weight: bold;
		text-shadow: 
			1px 1px 0px #B8860B,
			2px 2px 0px #8B6914,
			3px 3px 0px #654321,
			0 0 5px #FFD700;
		filter: drop-shadow(0 0 3px #FFD700);
	}
	.game-name {
		letter-spacing: 0.04em;
		font-size: 1.2rem;
		font-weight: 700;
	}
	.game-time {
		font-size: 1rem;
		opacity: 0.7;
		font-weight: 400;
	}
	.studio-name {
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: #fff;
		opacity: 0.85;
	}
</style>

<App>
	<EnableSound />
	<EnableHotkey />
	<EnableSpaceHold />
	<EnableGameActor />
	<EnablePixiExtension />

	<Background />

	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
	{:else}
		<ResumeBet />
		<!--
			The reason why <Sound /> is rendered after clicking the loading screen:
			"Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
			Ref: https://developer.chrome.com/blog/autoplay
		-->
		<Sound />

		<MainContainer>
			<BoardFrame />
		</MainContainer>

		<MainContainer>
			<MultiplierGrid />
		</MainContainer>

		<MainContainer>
			<Board />
			<Anticipations />
			<TumbleWinAmount />
			<GlobalMultiplier />
		</MainContainer>

		<MainContainer>
			<TumbleBoard />
			<ClusterWinAmounts />
		</MainContainer>

		<!-- Game/studio header overlay -->
		<div class="game-header">
			<div class="header-left">
				<span class="game-name">The Heist</span>
				<span class="game-time">{currentTime}</span>
			</div>
			<div class="header-right">
				<span class="studio-name">ZEDGE</span>
			</div>
		</div>

		<!-- Add the new ControlPanel overlay -->
		<div style="position: fixed; left: 0; right: 0; bottom: 0; z-index: 1000; pointer-events: auto;">
			<ControlPanel />
		</div>

		<Win />
		<WinScreen />
		<FreeSpinIntro />
		<HeistContinueScreen />
		<BoomExplosion />
		{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
			<FreeSpinCounter />
		{/if}
		<FreeSpinOutro />
		<Transition />

		<I18nTest />
	{/if}
</App>

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
</Modals>

<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM } from 'pixi-svelte';
	import { stateModal } from 'state-shared';

	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
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
	import FreeSpinIntro from './FreeSpinIntro.svelte';
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

	onMount(() => (context.stateLayout.showLoadingScreen = true));

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
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
		font-family: 'proxima-nova', Arial, sans-serif;
		font-size: 1.1rem;
		color: #fff;
		font-weight: 600;
		pointer-events: auto;
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
		<FreeSpinIntro />
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

<script lang="ts" module>
	import ClusterWinAmount, { type RawWin, type Win } from './ClusterWinAmount.svelte';

	export type EmitterEventClusterWinAmounts = {
		type: 'showClusterWinAmounts';
		wins: RawWin[];
	};
</script>

<script lang="ts">
	import { waitForResolve } from 'utils-shared/wait';

	import BoardContainer from './BoardContainer.svelte';
	import { FadeContainer } from 'components-pixi';
	import { Sprite, SpineProvider, SpineTrack, BitmapText } from 'pixi-svelte';
	import { getContext } from '../game/context';

	const context = getContext();

	let wins: Win[] = $state([]);
	let showPigPolice = $state(false);
	let totalWinAmount = $state(0);
	let currentWinLevel = $state<number | null>(null);
	let winAmountDigits = $state<string[]>([]);

	// Helper function to convert win amount to individual digits
	function convertToDigits(amount: number): string[] {
		const formatted = `$${amount.toFixed(2)}`;
		return formatted.split('');
	}

	context.eventEmitter.subscribeOnMount({
		showClusterWinAmounts: async (emitterEvent) => {
			wins = emitterEvent.wins.map((rawWin) => ({ ...rawWin, oncomplete: () => {} }));
			
			// Calculate total win amount and get win level
			totalWinAmount = wins.reduce((total, win) => total + win.result, 0);
			currentWinLevel = wins.length > 0 ? (wins[0] as any).winLevel : null;
			winAmountDigits = convertToDigits(totalWinAmount);
			console.log('Win amount digits:', winAmountDigits, 'Total:', totalWinAmount);
			
			// Show pig police vault image when there are wins
			if (wins.length > 0) {
				showPigPolice = true;
			}
			
			const gerPromises = () =>
				wins.map(async (win) => {
					await waitForResolve((resolve) => (win.oncomplete = resolve));
				});
			await Promise.all(gerPromises());
			wins = [];
			showPigPolice = false;
		},
	});
</script>

<BoardContainer>
	{#each wins as win}
		<ClusterWinAmount {win} />
	{/each}
</BoardContainer>

<!-- Win Level Image at Top -->
{#if currentWinLevel && currentWinLevel >= 6}
	<FadeContainer show={showPigPolice} duration={1000} zIndex={9}>
		<Sprite
			key={currentWinLevel === 6 ? "maxWinImage" : currentWinLevel === 7 ? "epicWinImage" : "megaWinImage"}
			anchor={{ x: 0.5, y: 0.5 }}
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.2}
			scale={{ x: 0.8, y: 0.8 }}
		/>
	</FadeContainer>
{/if}

<!-- Pig Police Vault Image for Win Screen -->
<FadeContainer show={showPigPolice} duration={1000} zIndex={10}>
	<Sprite
		key="pigPoliceVault"
		anchor={{ x: 0.5, y: 0.5 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height * 0.5}
		scale={{ x: 0.6, y: 0.6 }}
	/>
</FadeContainer>

<!-- Big Win Spine Animation over Win Screen -->
<FadeContainer show={showPigPolice} duration={1000} zIndex={11}>
	<SpineProvider
		key="bigWinSpine"
		anchor={{ x: 0.5, y: 0.5 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height * 0.5}
		scale={{ x: 0.7, y: 0.7 }}
	>
		<SpineTrack trackIndex={0} animationName="animation" loop={false} />
	</SpineProvider>
</FadeContainer>

<!-- Epic Win Spine Animation over Win Screen -->
<FadeContainer show={showPigPolice} duration={1000} zIndex={12}>
	<SpineProvider
		key="epicWinSpine"
		anchor={{ x: 0.5, y: 0.5 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height * 0.5}
		scale={{ x: 0.8, y: 0.8 }}
	>
		<SpineTrack trackIndex={0} animationName="animation" loop={false} />
	</SpineProvider>
</FadeContainer>

<!-- Max Win Spine Animation over Win Screen -->
<FadeContainer show={showPigPolice} duration={1000} zIndex={13}>
	<SpineProvider
		key="maxWinSpine"
		anchor={{ x: 0.5, y: 0.5 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height * 0.5}
		scale={{ x: 0.9, y: 0.9 }}
	>
		<SpineTrack trackIndex={0} animationName="animation" loop={false} />
	</SpineProvider>
</FadeContainer>

<!-- Mega Win Spine Animation over Win Screen -->
<FadeContainer show={showPigPolice} duration={1000} zIndex={14}>
	<SpineProvider
		key="megawinSpineNew"
		anchor={{ x: 0.5, y: 0.5 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height * 0.5}
		scale={{ x: 1.0, y: 1.0 }}
	>
		<SpineTrack trackIndex={0} animationName="animation" loop={false} />
	</SpineProvider>
</FadeContainer>

<!-- Golden Win Amount Numbers - Temporarily Disabled -->
<!-- <FadeContainer show={showPigPolice} duration={1000} zIndex={15}>
	{#each winAmountDigits as digit, index}
		{#if digit === '$'}
			<Sprite
				key="goldenDollar"
				anchor={{ x: 0.5, y: 0.5 }}
				x={context.stateLayoutDerived.mainLayout().width * 0.5 + (index - winAmountDigits.length / 2) * 60}
				y={context.stateLayoutDerived.mainLayout().height * 0.8}
				scale={{ x: 1.0, y: 1.0 }}
				tint={0x00FF00}
			/>
		{:else if digit === '.'}
			<Sprite
				key="goldenDot"
				anchor={{ x: 0.5, y: 0.5 }}
				x={context.stateLayoutDerived.mainLayout().width * 0.5 + (index - winAmountDigits.length / 2) * 60}
				y={context.stateLayoutDerived.mainLayout().height * 0.8}
				scale={{ x: 1.0, y: 1.0 }}
				tint={0x00FF00}
			/>
		{:else}
			<Sprite
				key="goldenNumber{digit}"
				anchor={{ x: 0.5, y: 0.5 }}
				x={context.stateLayoutDerived.mainLayout().width * 0.5 + (index - winAmountDigits.length / 2) * 60}
				y={context.stateLayoutDerived.mainLayout().height * 0.8}
				scale={{ x: 1.0, y: 1.0 }}
				tint={0x00FF00}
			/>
		{/if}
	{/each}
</FadeContainer> -->

<!-- Fallback Golden Win Amount Text (in case sprites don't load) -->
<FadeContainer show={showPigPolice} duration={1000} zIndex={16}>
	<BitmapText
		text={`$${totalWinAmount.toFixed(2)}`}
		tint={0xFFFF00}
		anchor={{ x: 0.5, y: 0.5 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height * 0.8}
		style={{
			fontFamily: 'superbubble',
			fontSize: 400,
			dropShadow: true,
			stroke: 0x000000,
		}}
	/>
</FadeContainer>

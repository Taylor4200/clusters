<script lang="ts">
	import { Container, ParticleEmitter } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';
	import { fountain as baseConfig } from 'constants-shared/particleConfig';
	import { LEVEL_PARTICLE_COIN_MAP } from 'constants-shared/particleCoin';

	import { getContext } from '../game/context';
	import type { WinLevelAlias } from '../game/winLevelMap';

	type Props = {
		emit?: boolean;
		levelAlias?: WinLevelAlias;
	};

	const props: Props = $props();
	const context = getContext();
	const extraConfig = $derived(
		props?.levelAlias ? LEVEL_PARTICLE_COIN_MAP[props.levelAlias] : null,
	);
	
	// Disable coin animations for very high win levels to prevent freezing
	const shouldDisableCoins = $derived(
		props.levelAlias === 'epic' || props.levelAlias === 'max'
	);
	
	// Option to completely disable all coin animations for performance
	const disableAllCoins = $derived(true); // Set to true to disable all coin animations
	
	// Create a much more conservative config to prevent freezing
	const conservativeConfig = {
		...baseConfig,
		maxParticles: 20, // Reduced from 100
		frequency: 0.8, // Much slower emission
		lifetime: {
			min: 2,
			max: 2,
		},
		...extraConfig,
	};
	
	const config = $derived(shouldDisableCoins || disableAllCoins ? null : conservativeConfig);
</script>

{#if config && !shouldDisableCoins && !disableAllCoins}
	<MainContainer>
		<Container
			x={context.stateGameDerived.boardLayout().x}
			y={context.stateGameDerived.boardLayout().y}
		>
			<ParticleEmitter {config} key="coins" emit={props.emit} />
		</Container>
	</MainContainer>
{/if}

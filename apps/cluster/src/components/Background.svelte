<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();

	const backgroundProps = $derived(
		context.stateLayoutDerived.normalBackgroundLayout({ scale: 1 }),
	);
	
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame' && !context.stateGame.showTreasureVault);
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freegame' || context.stateGame.showTreasureVault);
	const showTreasureVault = $derived(context.stateGame.showTreasureVault);
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-3} />

<FadeContainer show={showBaseBackground} duration={SECOND} zIndex={-2}>
	<Sprite key="foregroundAnimation" anchor={{ x: 0.5, y: 0.5 }} {...backgroundProps} />
</FadeContainer>

<!-- Bonus background - only show when in bonus mode -->
<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={0}>
	<Sprite 
		key="treasureVaultBg" 
		anchor={{ x: 0.5, y: 0.5 }} 
		{...backgroundProps}
	/>
</FadeContainer>

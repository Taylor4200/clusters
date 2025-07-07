<script lang="ts">
	import { Container } from 'pixi-svelte';
	import CompactHUD from './CompactHUD.svelte';
	import { getContextLayout } from 'utils-layout';

	const { stateLayoutDerived } = getContextLayout();
	
	// Calculate position based on layout
	const hudPosition = $derived({
		x: (stateLayoutDerived.canvasSizes().width - 700) / 2, // Center the 700px wide HUD
		y: stateLayoutDerived.mainLayoutStandard().height - 120, // 20px from bottom
		scale: 1
	});
</script>

<!-- Compact HUD positioned at bottom of screen -->
<Container>
	<CompactHUD 
		x={hudPosition.x} 
		y={hudPosition.y} 
		scale={hudPosition.scale} 
	/>
</Container> 
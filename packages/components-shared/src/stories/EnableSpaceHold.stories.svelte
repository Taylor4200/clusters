<script lang="ts">
	import { StoryEventEmitter } from 'components-storybook';
	import EnableHotkey from '../components/EnableHotkey.svelte';
	import EnableSpaceHold from '../components/EnableSpaceHold.svelte';
	import { stateBet } from 'state-shared';

	const test = $derived({
		autoSpinsCounter: stateBet.autoSpinsCounter,
		isSpaceHold: stateBet.isSpaceHold,
		isTurbo: stateBet.isTurbo,
	});
</script>

<StoryEventEmitter>
	<div>{JSON.stringify(test, undefined, 2)}</div>
	<EnableHotkey />
	<EnableSpaceHold />
</StoryEventEmitter>

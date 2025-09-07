<script lang="ts">
	import { StoryEventEmitter } from 'components-storybook';
	import EnableHotkey from '../components/EnableHotkey.svelte';
	import OnHotkey from '../components/OnHotkey.svelte';

	let disabled1 = $state(false);
	let disabled2 = $state(false);
</script>

<StoryEventEmitter>
	<EnableHotkey />

	<div>disabled1: {disabled1}</div>

	<div>disabled2: {disabled2}</div>

	<OnHotkey
		disabled={disabled1}
		hotkey="Space"
		onpress={() => {
			console.log('onpress 1');
		}}
		onhold={() => {
			console.log('onhold 1');
		}}
		onpressend={() => {
			console.log('onpressend 1');
		}}
		onholdend={() => {
			console.log('onholdend 1');
		}}
	/>

	<OnHotkey
		disabled={disabled2}
		hotkey="Space"
		onpress={() => {
			console.log('onpress 2');
		}}
		onhold={() => {
			console.log('onhold 2');
			disabled1 = true;
		}}
		onpressend={() => {
			console.log('onpressend 2');
		}}
		onholdend={() => {
			console.log('onholdend 2');
			disabled1 = false;
		}}
	/>
</StoryEventEmitter>

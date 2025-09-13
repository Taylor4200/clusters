<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'MODE_BASE/winScreen',
	});
</script>

<script lang="ts">
	import {
		StoryGameTemplate,
		StoryLocale,
		type TemplateArgs,
		templateArgs,
	} from 'components-storybook';

	import Game from '../components/Game.svelte';
	import { setContext, getContext } from '../game/context';
	import { winLevelMap } from '../game/winLevelMap';
	import type { WinLevel } from '../game/winLevelMap';

	setContext();
	
	// Store context reference for use in actions
	const context = getContext();
</script>

{#snippet template(args: TemplateArgs<any>)}
	<StoryGameTemplate
		skipLoadingScreen={args.skipLoadingScreen}
		action={async () => {
			if (args.action) {
				await args.action({});
			}
		}}
	>
		<StoryLocale lang="en">
			<Game />
		</StoryLocale>
	</StoryGameTemplate>
{/snippet}

<Story
	name="bigWin"
	args={templateArgs({
		skipLoadingScreen: true,
		action: async () => {
			const winLevelData = winLevelMap[9];
			
			// Trigger the win screen
			context.eventEmitter.broadcast({ type: 'winScreenShow' });
			context.eventEmitter.broadcast({
				type: 'winScreenUpdate',
				amount: 5000,
				winLevelData: winLevelData
			});
		},
	})}
	{template}
/>

<Story
	name="megaWin"
	args={templateArgs({
		skipLoadingScreen: true,
		action: async () => {
			const winLevelData = winLevelMap[8];
			
			// Trigger the win screen
			context.eventEmitter.broadcast({ type: 'winScreenShow' });
			context.eventEmitter.broadcast({
				type: 'winScreenUpdate',
				amount: 15000,
				winLevelData: winLevelData
			});
		},
	})}
	{template}
/>

<Story
	name="epicWin"
	args={templateArgs({
		skipLoadingScreen: true,
		action: async () => {
			const winLevelData = winLevelMap[7];
			
			// Trigger the win screen
			context.eventEmitter.broadcast({ type: 'winScreenShow' });
			context.eventEmitter.broadcast({
				type: 'winScreenUpdate',
				amount: 50000,
				winLevelData: winLevelData
			});
		},
	})}
	{template}
/>

<Story
	name="maxWin"
	args={templateArgs({
		skipLoadingScreen: true,
		action: async () => {
			const winLevelData = winLevelMap[6];
			
			// Trigger the win screen
			context.eventEmitter.broadcast({ type: 'winScreenShow' });
			context.eventEmitter.broadcast({
				type: 'winScreenUpdate',
				amount: 100000,
				winLevelData: winLevelData
			});
		},
	})}
	{template}
/>

<Story
	name="normalWin"
	args={templateArgs({
		skipLoadingScreen: true,
		action: async () => {
			const winLevelData = winLevelMap[3]; // 'small' win level
			
			// Trigger the win screen
			context.eventEmitter.broadcast({ type: 'winScreenShow' });
			context.eventEmitter.broadcast({
				type: 'winScreenUpdate',
				amount: 100,
				winLevelData: winLevelData
			});
		},
	})}
	{template}
/>

<Story
	name="mediumWin"
	args={templateArgs({
		skipLoadingScreen: true,
		action: async () => {
			const winLevelData = winLevelMap[4]; // 'nice' win level
			
			// Trigger the win screen
			context.eventEmitter.broadcast({ type: 'winScreenShow' });
			context.eventEmitter.broadcast({
				type: 'winScreenUpdate',
				amount: 500,
				winLevelData: winLevelData
			});
		},
	})}
	{template}
/>

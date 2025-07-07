<script lang="ts">
	import { MainContainer, OnPressFullScreen } from 'components-layout';
	import { OnHotkey } from 'components-shared';
	import { stateUrlDerived } from 'state-shared';
	import { Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';

	type Props = {
		onpress: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	// List of available frames (from your JSON)
	const availableFrames = [
		'ar', 'de', 'en', 'es', 'fi', 'fr', 'hi', 'id', 'ja', 'ko', 'pl', 'pt', 'ru', 'tr', 'vi', 'zh'
	];

	// Get the language code (e.g., 'en', 'fr', etc.)
	const lang = stateUrlDerived.lang();

	// Use the language if available, otherwise fallback to 'en'
	const frameLang = availableFrames.includes(lang) ? lang : 'en';
	const frameKey = `pressToContinueText_${frameLang}.png`;
</script>

<MainContainer alignVertical="bottom">
	<Sprite
		key={frameKey}
		width={800}
		height={134}
		anchor={{ x: 0.5, y: 1 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height}
	/>
</MainContainer>
<OnHotkey hotkey="Space" onpress={() => props.onpress()} />
<OnPressFullScreen onpress={() => props.onpress()} />

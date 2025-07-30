<script lang="ts">
	import { onMount } from 'svelte';
	type Props = {
		oncomplete: () => void;
	};

	const props: Props = $props();

	onMount(() => {
		const timeout = setTimeout(() => {
			props.oncomplete();
		}, 1000);
		return () => clearTimeout(timeout);
	});
</script>

<!-- No animation, just a pause. The background remains visible because this component overlays nothing. -->

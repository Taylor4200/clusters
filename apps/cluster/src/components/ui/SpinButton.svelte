<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let spinning = false;

  // Example default position: bottom center. Edit this to your liking!
  export let wrapperStyle = "position: absolute; left: 50%; bottom: 2rem; transform: translateX(-50%);";
  export let wrapperClass = "";

  export let style = "";
  export let className = "";

  function spin() {
    spinning = true;
    dispatch('click');
    setTimeout(() => spinning = false, 500);
  }
</script>

<div class={wrapperClass} style={wrapperStyle}>
  <button
    class="spin-btn {spinning ? 'spinning' : ''} {className}"
    style={style}
    on:click={spin}
  >
    SPIN
  </button>
</div>

<style>
  .spin-btn {
    background: #121922;
    color: white;
    border: 4px solid #ccc;
    border-radius: 50%;
    padding: 2rem;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .spinning {
    animation: pulse 0.5s ease;
  }

  @keyframes pulse {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
</style> 
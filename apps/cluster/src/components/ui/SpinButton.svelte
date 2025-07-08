<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let spinning = false;

  function spin() {
    spinning = true;
    dispatch('click');
    setTimeout(() => spinning = false, 500);
  }
</script>

<button class="spin-btn {spinning ? 'spinning' : ''}" on:click={spin}>
  SPIN
</button>

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
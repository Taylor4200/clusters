<script lang="ts">
  import { onMount } from 'svelte';
  export let show = false;
  export let onClose = () => {};

  let page = 0;
  const pages = [
    {
      title: 'Paytable',
      content: 'Symbol payouts and values go here. (Add your assets later.)',
    },
    {
      title: 'Game Rules',
      content: 'Game rules and features go here. (Add your text later.)',
    },
    {
      title: '243 Ways to Win',
      content: 'Explain win mechanics here. (Add your diagrams later.)',
    },
  ];

  function next() { page = (page + 1) % pages.length; }
  function prev() { page = (page - 1 + pages.length) % pages.length; }

  function handleBackgroundClick(e: MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }
</script>

{#if show}
  <div class="info-panel-bg" on:click={handleBackgroundClick}>
    <div class="info-panel">
      <button class="close" on:click={onClose}>×</button>
      <h2>{pages[page].title}</h2>
      <div class="content">{pages[page].content}</div>
      <div class="nav">
        <button on:click={prev}>&lt;</button>
        <span>{page + 1} / {pages.length}</span>
        <button on:click={next}>&gt;</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .info-panel-bg {
    position: fixed;
    left: 0; right: 0; top: 0; bottom: 0;
    background: rgba(0,0,0,0.85);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info-panel {
    background: #181c22;
    color: white;
    border-radius: 1rem;
    padding: 2rem;
    min-width: 400px;
    max-width: 90vw;
    min-height: 300px;
    max-height: 80vh;
    box-shadow: 0 0 24px rgba(0,0,0,0.5);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.7;
  }
  .close:hover { opacity: 1; }
  .content {
    margin: 2rem 0;
    text-align: center;
    flex: 1;
  }
  .nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .nav button {
    background: #23272f;
    color: white;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.8;
  }
  .nav button:hover { opacity: 1; }
</style> 
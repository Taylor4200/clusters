<script lang="ts">
  export let icon: string;
  export let active = false;
</script>

<button class:active on:click>
  {icon}
</button>

<style>
  button {
    background: #121922;
    color: white;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.8;
  }

  .active {
    box-shadow: 0 0 5px 2px #00ffcc;
    opacity: 1;
  }
</style> 
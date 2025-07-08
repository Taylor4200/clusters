<script lang="ts">
  export let value = 100;
</script>

<div class="slider-dropdown">
  <label>Volume: {value}</label>
  <input type="range" min="0" max="100" bind:value />
</div>

<style>
  .slider-dropdown {
    background: rgba(15, 20, 27, 0.85); /* more transparent */
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: white;
    position: absolute;
    right: 0;
    bottom: 3.5rem; /* drop upwards */
    z-index: 10;
  }

  input[type="range"] {
    width: 100px;
  }
</style> 
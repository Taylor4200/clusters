<script lang="ts">
  export let title = "";
</script>

<div class="dropdown">
  <h4>{title}</h4>
  <slot />
</div>

<style>
  .dropdown {
    position: absolute;
    bottom: 3.5rem; /* drop upwards */
    right: 0;
    background: rgba(17, 22, 29, 0.85); /* more transparent */
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px rgba(255,255,255,0.1);
    z-index: 10;
  }

  h4 {
    margin-top: 0;
  }

  label {
    display: block;
    margin-top: 0.5rem;
  }
</style> 
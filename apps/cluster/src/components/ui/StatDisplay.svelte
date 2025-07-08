<script lang="ts">
  import { stateBet } from 'state-shared';
  
  export let label: string;
  export let value: number;
  export let prefix = '';
  export let suffix = '';
</script>

<div class="stat-display">
  <div class="label">{label}</div>
  <div class="value">
    {prefix}{value.toLocaleString()}{suffix}
  </div>
</div>

<style>
  .stat-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    color: white;
    min-width: 80px;
  }
  .label {
    font-size: 0.8rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .value {
    font-size: 1.1rem;
    font-weight: bold;
  }
</style> 
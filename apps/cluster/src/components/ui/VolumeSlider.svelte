<script lang="ts">
  import { stateSound } from 'state-shared';
  
  function handleVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    stateSound.volumeValueMaster = parseInt(target.value);
  }
</script>

<div class="volume-slider">
  <div class="volume-bars">
    {#if stateSound.volumeValueMaster === 0}
      <span class="bar mute"></span>
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    {:else if stateSound.volumeValueMaster <= 25}
      <span class="bar active"></span>
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    {:else if stateSound.volumeValueMaster <= 50}
      <span class="bar active"></span>
      <span class="bar active"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    {:else if stateSound.volumeValueMaster <= 75}
      <span class="bar active"></span>
      <span class="bar active"></span>
      <span class="bar active"></span>
      <span class="bar"></span>
    {:else}
      <span class="bar active"></span>
      <span class="bar active"></span>
      <span class="bar active"></span>
      <span class="bar active"></span>
    {/if}
  </div>
  <input 
    type="range" 
    min="0" 
    max="100" 
    value={stateSound.volumeValueMaster}
    on:input={handleVolumeChange}
    class="slider"
  />
  <span class="volume-value">{stateSound.volumeValueMaster}%</span>
</div>

<style>
  .volume-slider {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(24, 28, 34, 0.8);
    border-radius: 0.5rem;
    padding: 0.75rem;
    color: white;
    min-width: 150px;
  }
  
  .volume-bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    min-width: 2rem;
    height: 1.2rem;
    width: 2rem;
    justify-content: center;
  }
  .bar {
    width: 5px;
    height: 6px;
    background: #444;
    border-radius: 2px 2px 0 0;
    transition: background 0.2s, height 0.2s;
    display: inline-block;
  }
  .bar.active {
    background: #4CAF50;
  }
  .bar.mute {
    background: #888;
  }
  .bar:nth-child(1) { height: 6px; }
  .bar:nth-child(2) { height: 10px; }
  .bar:nth-child(3) { height: 14px; }
  .bar:nth-child(4) { height: 18px; }
  
  .slider {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: #444;
    outline: none;
    -webkit-appearance: none;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
    border: none;
  }
  
  .volume-value {
    font-size: 0.8rem;
    min-width: 2.5rem;
    text-align: right;
  }
</style> 
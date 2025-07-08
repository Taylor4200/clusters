<script lang="ts">
  import { stateBet, stateBetDerived, stateConfig, stateSound } from 'state-shared';
  import VolumeSlider from './VolumeSlider.svelte';
  import InfoPanel from './InfoPanel.svelte';
  import DropdownPanel from './DropdownPanel.svelte';
  import { getContext } from '../../game/context';

  let showAutoplay = false;
  let showVolume = false;
  let showInfo = false;
  let spinning = false;
  let autoPlayOptions = [10, 25, 50, 100, Infinity];
  let autoPlayCount = 0;
  let isAutoPlaying = false;

  const context = getContext();

  function handleSpin() {
    spinning = true;
    context.eventEmitter.broadcast({ type: 'bet' });
    setTimeout(() => { spinning = false; }, 600);
  }

  function toggleTurbo() {
    stateBet.isTurbo = !stateBet.isTurbo;
  }

  function toggleAutoplay() {
    showAutoplay = !showAutoplay;
    showVolume = false;
    showInfo = false;
  }

  function startAutoplay(count: number) {
    autoPlayCount = count;
    isAutoPlaying = true;
    showAutoplay = false;
    runAutoplay();
  }

  async function runAutoplay() {
    let spins = autoPlayCount === Infinity ? 1000000 : autoPlayCount;
    for (let i = 0; i < spins; i++) {
      if (!isAutoPlaying) break;
      context.eventEmitter.broadcast({ type: 'autoBet' });
      await new Promise(r => setTimeout(r, stateBet.isTurbo ? 400 : 1200));
    }
    isAutoPlaying = false;
  }

  function stopAutoplay() {
    isAutoPlaying = false;
  }

  function toggleVolume() {
    showVolume = !showVolume;
    showAutoplay = false;
    showInfo = false;
  }

  function toggleInfo() {
    showInfo = !showInfo;
    showAutoplay = false;
    showVolume = false;
  }

  function increaseBet() {
    const currentIndex = stateConfig.betAmountOptions.indexOf(stateBet.betAmount);
    if (currentIndex < stateConfig.betAmountOptions.length - 1) {
      stateBetDerived.setBetAmount(stateConfig.betAmountOptions[currentIndex + 1]);
    }
  }

  function decreaseBet() {
    const currentIndex = stateConfig.betAmountOptions.indexOf(stateBet.betAmount);
    if (currentIndex > 0) {
      stateBetDerived.setBetAmount(stateConfig.betAmountOptions[currentIndex - 1]);
    }
  }
</script>

<div class="control-bar">
  <div class="left-group">
    <div class="stat">
      <div class="label">BALANCE</div>
      <div class="value">${stateBet.balanceAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
    </div>
    <div class="stat">
      <div class="label">WIN</div>
      <div class="value">${stateBet.winBookEventAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
    </div>
    <div class="bet-group">
      <div class="label">BET</div>
      <div class="bet-adjuster-row">
        <button class="bet-btn" on:click={decreaseBet} disabled={stateBet.betAmount <= stateConfig.betAmountOptions[0]}>-</button>
        <div class="bet-value">${stateBet.betAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        <button class="bet-btn" on:click={increaseBet} disabled={stateBet.betAmount >= stateConfig.betAmountOptions[stateConfig.betAmountOptions.length - 1]}>+</button>
      </div>
    </div>
  </div>

  <div class="center-group">
    <button class="spin-btn {spinning ? 'spinning' : ''}" on:click={handleSpin} aria-label="Spin">
      <svg class="spin-icon" width="56" height="56" viewBox="0 0 56 56">
        <defs>
          <radialGradient id="spinGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
            <stop offset="100%" stop-color="#e0e0e0" stop-opacity="1"/>
          </radialGradient>
        </defs>
        <circle cx="28" cy="28" r="26" fill="url(#spinGrad)" stroke="#222" stroke-width="2.5"/>
        <path d="M28 10a18 18 0 1 1-12.7 5.3" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
        <polygon points="11,7 11,19 21,13" fill="#111"/>
      </svg>
    </button>
  </div>

  <div class="right-group">
    <div class="icon-group">
      <div class="icon-btn turbo {stateBet.isTurbo ? 'active' : ''}" on:click={toggleTurbo} aria-label="Turbo">
        <span style="color: orange;">⚡</span>
      </div>
      <div class="autoplay-container">
        {#if isAutoPlaying}
          <div class="autoplay-counter">{autoPlayCount === Infinity ? '∞' : autoPlayCount} left</div>
        {/if}
        <div class="icon-btn autoplay {isAutoPlaying ? 'active' : ''}" on:click={toggleAutoplay} aria-label="Autoplay">
          <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2" fill="none"/><polygon points="10,8 16,12 10,16" fill="#fff"/></svg>
        </div>
        {#if showAutoplay}
          <DropdownPanel>
            <div class="dropdown-content">
              <div class="autoplay-options">
                {#each autoPlayOptions as option}
                  <button class="autoplay-btn" on:click={() => startAutoplay(option)}>{option === Infinity ? '∞' : option}</button>
                {/each}
                <button class="autoplay-btn stop" on:click={() => { stopAutoplay(); showAutoplay = false; }}>Stop</button>
                <button class="autoplay-btn close" on:click={() => showAutoplay = false}>Close</button>
              </div>
            </div>
          </DropdownPanel>
        {/if}
      </div>
      <div class="icon-btn" on:click={toggleVolume} aria-label="Volume">
        <svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="9" width="4" height="6" fill="#fff"/><polygon points="8,9 14,5 14,19 8,15" fill="#fff"/></svg>
        <span class="volume-bars-inline">
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
        </span>
        {#if showVolume}
          <DropdownPanel><VolumeSlider /></DropdownPanel>
        {/if}
      </div>
      <div class="icon-btn" on:click={toggleInfo} aria-label="Info">
        <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2" fill="none"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial" dy=".3em">i</text></svg>
        {#if showInfo}
          <DropdownPanel><InfoPanel show={showInfo} onClose={toggleInfo} /></DropdownPanel>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .control-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 64px;
    background: rgba(10, 10, 10, 0.95);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
    font-family: inherit;
    box-shadow: 0 -2px 16px rgba(0,0,0,0.3);
    padding: 0 32px;
  }
  .left-group, .right-group {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .center-group {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    z-index: 2;
  }
  .stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 120px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  .stat .label {
    opacity: 0.6;
    font-size: 11px;
    font-weight: 400;
    margin-bottom: 2px;
  }
  .stat .value {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .bet-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 120px;
    color: #fff;
  }
  .bet-group .label {
    opacity: 0.6;
    font-size: 11px;
    font-weight: 400;
    margin-bottom: 2px;
  }
  .bet-adjuster-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .bet-btn {
    background: #181818;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  }
  .bet-btn:active { background: #222; }
  .bet-value {
    min-width: 60px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background: none;
  }
  .spin-btn {
    background: none;
    border: none;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.22);
    cursor: pointer;
    margin: 0 32px;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    outline: none;
  }
  .spin-btn:hover .spin-icon {
    filter: brightness(1.1) drop-shadow(0 0 8px #fff8);
  }
  .spin-btn:active .spin-icon {
    filter: brightness(0.95);
  }
  .spin-icon {
    width: 56px;
    height: 56px;
    display: block;
    transition: transform 0.5s cubic-bezier(.4,2,.6,1), filter 0.2s;
    filter: drop-shadow(0 2px 8px #0004);
  }
  .spinning .spin-icon {
    transform: rotate(540deg);
  }
  .icon-group {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .icon-btn {
    position: relative;
    background: none;
    border: none;
    color: #fff;
    font-size: 22px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, filter 0.2s;
  }
  .icon-btn.active {
    filter: drop-shadow(0 0 8px #ffb300cc);
  }
  .icon-btn:active { color: #aaa; }
  .dropdown-content {
    padding: 16px;
    color: #fff;
    background: #181818;
    border-radius: 8px;
    min-width: 180px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.18);
    font-size: 14px;
  }
  .autoplay-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
  .autoplay-btn {
    background: #23272f;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1.2rem;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .autoplay-btn:hover {
    background: #444;
  }
  .autoplay-btn.stop {
    background: #b71c1c;
    color: #fff;
    margin-top: 0.5rem;
  }
  .autoplay-btn.stop:hover {
    background: #d32f2f;
  }
  .volume-bars-inline {
    display: flex;
    align-items: flex-end;
    gap: 1px;
    margin-left: 4px;
    height: 1rem;
    width: 1.6rem;
    justify-content: center;
  }
  .volume-bars-inline .bar {
    width: 3px;
    height: 5px;
    background: #444;
    border-radius: 2px 2px 0 0;
    transition: background 0.2s, height 0.2s;
    display: inline-block;
  }
  .volume-bars-inline .bar.active {
    background: #4CAF50;
  }
  .volume-bars-inline .bar.mute {
    background: #888;
  }
  .volume-bars-inline .bar:nth-child(1) { height: 5px; }
  .volume-bars-inline .bar:nth-child(2) { height: 8px; }
  .volume-bars-inline .bar:nth-child(3) { height: 11px; }
  .volume-bars-inline .bar:nth-child(4) { height: 14px; }
  .autoplay-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .autoplay-counter {
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 2px;
    background: #23272f;
    border-radius: 6px;
    padding: 2px 8px;
    box-shadow: 0 2px 8px #0004;
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    pointer-events: none;
  }
  .autoplay-btn.close {
    background: #444;
    color: #fff;
    margin-top: 8px;
  }
  .autoplay-btn.close:hover {
    background: #666;
  }
</style> 
<script lang="ts">
  import { stateBet, stateBetDerived } from 'state-shared';
  import { stateConfig } from 'state-shared';

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

<div class="bet-adjuster">
  <button class="bet-btn" on:click={decreaseBet} disabled={stateBet.betAmount <= stateConfig.betAmountOptions[0]}>
    ▼
  </button>
  <div class="bet-display">
    <span class="coin">🪙</span>
    <span class="amount">{stateBet.betAmount}</span>
  </div>
  <button class="bet-btn" on:click={increaseBet} disabled={stateBet.betAmount >= stateConfig.betAmountOptions[stateConfig.betAmountOptions.length - 1]}>
    ▲
  </button>
</div>

<style>
  .bet-adjuster {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    background: rgba(24, 28, 34, 0.8);
    border-radius: 0.5rem;
    padding: 0.75rem;
    min-width: 80px;
  }
  .bet-btn {
    background: #23272f;
    color: white;
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  .bet-btn:hover:not(:disabled) { opacity: 1; }
  .bet-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .bet-display {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: white;
    font-weight: bold;
  }
  .coin { font-size: 1.2rem; }
  .amount { font-size: 1.1rem; }
</style> 
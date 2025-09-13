<script lang="ts">
	import { onMount } from 'svelte';
	import { stateBet, stateBetDerived } from 'state-shared';
	import { getContext } from '../game/context';

	const context = getContext();
	let showDebug = $state(false);
	let fps = $state(0);
	let frameCount = $state(0);
	let lastTime = $state(0);

	// Performance monitoring
	onMount(() => {
		const updateFPS = (currentTime: number) => {
			frameCount++;
			if (currentTime - lastTime >= 1000) {
				fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
				frameCount = 0;
				lastTime = currentTime;
			}
			requestAnimationFrame(updateFPS);
		};
		requestAnimationFrame(updateFPS);
	});

	function toggleDebug() {
		showDebug = !showDebug;
	}

	function getGameStateColor(state: any) {
		if (!state) return '#666';
		const stateStr = JSON.stringify(state);
		if (stateStr.includes('idle')) return '#4CAF50';
		if (stateStr.includes('spinning')) return '#FF9800';
		if (stateStr.includes('winning')) return '#2196F3';
		if (stateStr.includes('error')) return '#F44336';
		return '#9C27B0';
	}

	function formatValue(value: any): string {
		if (typeof value === 'object') {
			return JSON.stringify(value, null, 2);
		}
		return String(value);
	}
</script>

<!-- Debug Toggle Button -->
<button 
	class="debug-toggle" 
	onclick={toggleDebug}
	title="Toggle Debug Panel"
>
	🐛
</button>

{#if showDebug}
	<div class="debug-panel">
		<div class="debug-header">
			<h3>🐛 Debug Panel</h3>
			<button class="close-btn" onclick={toggleDebug}>×</button>
		</div>
		
		<div class="debug-content">
			<!-- Performance Section -->
			<div class="debug-section">
				<h4>📊 Performance</h4>
				<div class="debug-item">
					<span class="label">FPS:</span>
					<span class="value" style:color={fps > 50 ? '#4CAF50' : fps > 30 ? '#FF9800' : '#F44336'}>
						{fps}
					</span>
				</div>
			</div>

			<!-- Game State Section -->
			<div class="debug-section">
				<h4>🎮 Game State</h4>
				<div class="debug-item">
					<span class="label">Current State:</span>
					<span class="value" style:color={getGameStateColor(context.stateXstate.value)}>
						{formatValue(context.stateXstate.value)}
					</span>
				</div>
				<div class="debug-item">
					<span class="label">Game Type:</span>
					<span class="value">{context.stateGame.gameType}</span>
				</div>
				<div class="debug-item">
					<span class="label">Show Loading:</span>
					<span class="value">{context.stateLayout.showLoadingScreen}</span>
				</div>
			</div>

			<!-- Betting Section -->
			<div class="debug-section">
				<h4>💰 Betting</h4>
				<div class="debug-item">
					<span class="label">Balance:</span>
					<span class="value">${stateBet.balanceAmount.toFixed(2)}</span>
				</div>
				<div class="debug-item">
					<span class="label">Bet Amount:</span>
					<span class="value">${stateBet.betAmount.toFixed(2)}</span>
				</div>
				<div class="debug-item">
					<span class="label">Win Amount:</span>
					<span class="value">${stateBet.winBookEventAmount.toFixed(2)}</span>
				</div>
				<div class="debug-item">
					<span class="label">Is Turbo:</span>
					<span class="value">{stateBet.isTurbo ? 'Yes' : 'No'}</span>
				</div>
			</div>

			<!-- Layout Section -->
			<div class="debug-section">
				<h4>📐 Layout</h4>
				<div class="debug-item">
					<span class="label">Canvas Width:</span>
					<span class="value">{context.stateLayoutDerived.canvasSizes().width}</span>
				</div>
				<div class="debug-item">
					<span class="label">Canvas Height:</span>
					<span class="value">{context.stateLayoutDerived.canvasSizes().height}</span>
				</div>
				<div class="debug-item">
					<span class="label">Layout Type:</span>
					<span class="value">{context.stateLayoutDerived.layoutType()}</span>
				</div>
			</div>

			<!-- Actions Section -->
			<div class="debug-section">
				<h4>⚡ Actions</h4>
				<div class="debug-actions">
					<button class="action-btn" onclick={() => context.eventEmitter.broadcast({ type: 'forceResult' })}>
						Force Result
					</button>
					<button class="action-btn" onclick={() => context.eventEmitter.broadcast({ type: 'autoBet' })}>
						Auto Bet
					</button>
					<button class="action-btn" onclick={() => console.log('Game Actor Snapshot:', context.stateXstate.value)}>
						Log State
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.debug-toggle {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		border: none;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		font-size: 20px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	.debug-toggle:hover {
		background: rgba(0, 0, 0, 0.9);
		transform: scale(1.1);
	}

	.debug-panel {
		position: fixed;
		top: 20px;
		right: 20px;
		width: 400px;
		max-height: 80vh;
		background: rgba(0, 0, 0, 0.95);
		border: 2px solid #333;
		border-radius: 12px;
		color: white;
		font-family: 'Courier New', monospace;
		font-size: 12px;
		z-index: 10000;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
	}

	.debug-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		background: #222;
		border-bottom: 1px solid #444;
	}

	.debug-header h3 {
		margin: 0;
		font-size: 14px;
		color: #fff;
	}

	.close-btn {
		background: none;
		border: none;
		color: #fff;
		font-size: 18px;
		cursor: pointer;
		padding: 0;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background 0.2s;
	}

	.close-btn:hover {
		background: #444;
	}

	.debug-content {
		padding: 16px;
		max-height: calc(80vh - 60px);
		overflow-y: auto;
	}

	.debug-section {
		margin-bottom: 20px;
		border-bottom: 1px solid #333;
		padding-bottom: 12px;
	}

	.debug-section:last-child {
		border-bottom: none;
		margin-bottom: 0;
	}

	.debug-section h4 {
		margin: 0 0 8px 0;
		font-size: 13px;
		color: #4CAF50;
		font-weight: bold;
	}

	.debug-item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 6px;
		gap: 12px;
	}

	.debug-item .label {
		flex-shrink: 0;
		color: #ccc;
		font-weight: 500;
		min-width: 100px;
	}

	.debug-item .value {
		flex: 1;
		color: #fff;
		word-break: break-all;
		text-align: right;
		font-weight: 600;
	}

	.debug-actions {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.action-btn {
		background: #333;
		color: white;
		border: 1px solid #555;
		border-radius: 4px;
		padding: 8px 12px;
		font-size: 11px;
		cursor: pointer;
		transition: all 0.2s;
		font-family: inherit;
	}

	.action-btn:hover {
		background: #444;
		border-color: #666;
	}

	.action-btn:active {
		background: #222;
	}

	/* Scrollbar styling */
	.debug-content::-webkit-scrollbar {
		width: 6px;
	}

	.debug-content::-webkit-scrollbar-track {
		background: #222;
	}

	.debug-content::-webkit-scrollbar-thumb {
		background: #555;
		border-radius: 3px;
	}

	.debug-content::-webkit-scrollbar-thumb:hover {
		background: #666;
	}
</style>

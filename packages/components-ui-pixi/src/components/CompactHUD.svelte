<script lang="ts">
	import { Container, Graphics, Text } from 'pixi-svelte';
	import { stateBet, stateBetDerived, stateConfig, stateModal } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';
	import { getContext } from '../context';
	import { UI_BASE_SIZE, UI_BASE_FONT_SIZE } from '../constants';
	import { i18nDerived } from '../i18n/i18nDerived';

	const props: {
		x?: number;
		y?: number;
		scale?: number;
	} = $props();

	const context = getContext();
	
	// HUD dimensions and styling
	const HUD_WIDTH = 700;
	const HUD_HEIGHT = 100;
	const HUD_BG_COLOR = 0x2c3e50;
	const HUD_BG_ALPHA = 0.2;
	const BUTTON_SIZE = 50;
	const SPACING = 120;
	
	// Reactive state
	const balance = $derived(stateBet.balanceAmount);
	const bet = $derived(stateBet.betAmount);
	const win = $derived(stateBet.winBookEventAmount);
	const isTurbo = $derived(stateBet.isTurbo);
	const isAutoSpinning = $derived(stateBetDerived.hasAutoBetCounter());
	const isIdle = $derived(context.stateXstateDerived.isIdle());
	const canBet = $derived(stateBetDerived.isBetCostAvailable());
	
	// Event handlers
	const handleSpin = () => {
		if (!canBet || !isIdle) return;
		context.eventEmitter.broadcast({ type: 'soundPressBet' });
		context.eventEmitter.broadcast({ type: 'bet' });
	};
	
	const handleStop = () => {
		if (isIdle) return;
		context.eventEmitter.broadcast({ type: 'soundPressBet' });
		if (isAutoSpinning) stateBet.autoSpinsCounter = 0;
		context.eventEmitter.broadcast({ type: 'stopButtonClick' });
	};
	
	const handleTurbo = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.updateIsTurbo(!isTurbo, { persistent: true });
	};
	
	const handleAuto = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'autoSpin' };
	};
	
	const handleSettings = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'settings' };
	};
	
	// Text style for labels
	const labelStyle = {
		fontFamily: 'proxima-nova',
		fontSize: UI_BASE_FONT_SIZE * 0.8,
		fill: 0xffffff,
		fontWeight: '600' as const,
		align: 'left' as const,
	};
	
	const valueStyle = {
		...labelStyle,
		fontSize: UI_BASE_FONT_SIZE * 1.1,
		fill: 0xffffff,
	};
	
	const titleStyle = {
		...labelStyle,
		fontSize: UI_BASE_FONT_SIZE * 0.6,
		fill: 0xaaaaaa,
	};
</script>

<!-- Main HUD Container -->
<Container x={props.x ?? 50} y={props.y ?? 500} scale={props.scale ?? 1}>
	<!-- Background -->
	<Graphics
		draw={(g) => {
			g.clear();
			g.beginFill(HUD_BG_COLOR, HUD_BG_ALPHA);
			g.drawRoundedRect(0, 0, HUD_WIDTH, HUD_HEIGHT, 25);
			g.endFill();
		}}
	/>
	
	<!-- Settings Button -->
	<Container x={30} y={HUD_HEIGHT / 2} eventMode="static" cursor="pointer" onpointerup={handleSettings}>
		<Graphics
			draw={(g) => {
				g.clear();
				g.beginFill(0xffffff, 0.1);
				g.drawCircle(0, 0, 20);
				g.endFill();
			}}
		/>
		<Text text="⚙️" anchor={0.5} style={{ fontSize: 16, fill: 0xffffff }} />
	</Container>
	
	<!-- Balance Display -->
	<Container x={80} y={20}>
		<Text text="BALANCE" anchor={0} style={titleStyle} />
		<Text text={numberToCurrencyString(balance)} y={20} anchor={0} style={valueStyle} />
	</Container>
	
	<!-- Bet Display -->
	<Container x={240} y={20}>
		<Text text="BET" anchor={0} style={titleStyle} />
		<Text text={numberToCurrencyString(bet)} y={20} anchor={0} style={valueStyle} />
	</Container>
	
	<!-- Spin/Stop Button -->
	<Container x={380} y={HUD_HEIGHT / 2} eventMode="static" cursor={canBet && isIdle ? 'pointer' : 'not-allowed'} onpointerup={isIdle ? handleSpin : handleStop}>
		<Graphics
			draw={(g) => {
				g.clear();
				const color = canBet && isIdle ? 0x27ae60 : 0xaaaaaa;
				g.beginFill(color, 0.8);
				g.drawCircle(0, 0, 45);
				g.endFill();
			}}
		/>
		<Text 
			text={isIdle ? i18nDerived.bet() : i18nDerived.stop()} 
			anchor={0.5} 
			style={{ 
				fontSize: 16, 
				fill: 0xffffff, 
				fontWeight: 'bold',
				fontFamily: 'proxima-nova'
			}} 
		/>
	</Container>
	
	<!-- Turbo Button -->
	<Container x={460} y={HUD_HEIGHT / 2} eventMode="static" cursor="pointer" onpointerup={handleTurbo}>
		<Graphics
			draw={(g) => {
				g.clear();
				const color = isTurbo ? 0xf39c12 : 0xffffff;
				g.beginFill(color, 0.1);
				g.drawCircle(0, 0, 25);
				g.endFill();
			}}
		/>
		<Text text="⚡" anchor={0.5} style={{ fontSize: 20, fill: isTurbo ? 0xf39c12 : 0xffffff }} />
	</Container>
	
	<!-- Auto Button -->
	<Container x={510} y={HUD_HEIGHT / 2} eventMode="static" cursor="pointer" onpointerup={handleAuto}>
		<Graphics
			draw={(g) => {
				g.clear();
				const color = isAutoSpinning ? 0xe74c3c : 0xffffff;
				g.beginFill(color, 0.1);
				g.drawCircle(0, 0, 25);
				g.endFill();
			}}
		/>
		<Text text="🔁" anchor={0.5} style={{ fontSize: 20, fill: isAutoSpinning ? 0xe74c3c : 0xffffff }} />
	</Container>
	
	<!-- Win Display -->
	<Container x={580} y={20}>
		<Text text="WIN" anchor={0} style={titleStyle} />
		<Text text={numberToCurrencyString(win)} y={20} anchor={0} style={valueStyle} />
	</Container>
</Container> 
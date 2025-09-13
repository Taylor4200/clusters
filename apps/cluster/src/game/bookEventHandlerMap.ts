import _ from 'lodash';

import { recordBookEvent, checkIsMultipleRevealEvents, type BookEventHandlerMap } from 'utils-book';
import { stateBet } from 'state-shared';

import { eventEmitter } from './eventEmitter';
import { playBookEvent } from './utils';
import { winLevelMap, type WinLevel, type WinLevelData } from './winLevelMap';
import { stateGame, stateGameDerived } from './stateGame.svelte';
import type { BookEvent, BookEventOfType, BookEventContext } from './typesBookEvent';
import type { Position } from './types';

const winLevelSoundsPlay = ({ winLevelData }: { winLevelData: WinLevelData }) => {
	if (winLevelData?.alias === 'max') eventEmitter.broadcastAsync({ type: 'uiHide' });
	if (winLevelData?.sound?.sfx) {
		eventEmitter.broadcast({ type: 'soundOnce', name: winLevelData.sound.sfx });
	}
	if (winLevelData?.sound?.bgm) {
		eventEmitter.broadcast({ type: 'soundMusic', name: winLevelData.sound.bgm });
	}
	if (winLevelData?.type === 'big') {
		eventEmitter.broadcast({ type: 'soundLoop', name: 'sfx_bigwin_coinloop' });
	}
};

const winLevelSoundsStop = () => {
	eventEmitter.broadcast({ type: 'soundStop', name: 'sfx_bigwin_coinloop' });
	if (stateBet.activeBetModeKey === 'SUPERSPIN' || stateGame.gameType === 'freegame') {
		// check if SUPERSPIN, when finishing a bet.
		eventEmitter.broadcast({ type: 'soundMusic', name: 'bgm_freespin' });
	} else {
		eventEmitter.broadcast({ type: 'soundMusic', name: 'bgm_main' });
	}
	eventEmitter.broadcastAsync({ type: 'uiShow' });
};

const animateSymbols = async ({ positions }: { positions: Position[] }) => {
	eventEmitter.broadcast({ type: 'boardShow' });
	await eventEmitter.broadcastAsync({
		type: 'boardWithAnimateSymbols',
		symbolPositions: positions,
	});
};

export const bookEventHandlerMap: BookEventHandlerMap<BookEvent, BookEventContext> = {
	reveal: async (bookEvent: BookEventOfType<'reveal'>, { bookEvents }: BookEventContext) => {
		console.log('🎲 REVEAL EVENT', {
			event: bookEvent,
			totalEvents: bookEvents.length,
			timestamp: new Date().toISOString()
		});
		
		eventEmitter.broadcast({ type: 'tumbleWinAmountReset' });
		const isBonusGame = checkIsMultipleRevealEvents({ bookEvents });
		if (isBonusGame) {
			console.log('🎁 BONUS GAME DETECTED');
			eventEmitter.broadcast({ type: 'stopButtonEnable' });
			recordBookEvent({ bookEvent });
		}

		stateGame.gameType = bookEvent.gameType;
		await stateGameDerived.enhancedBoard.spin({ revealEvent: bookEvent });
		eventEmitter.broadcast({ type: 'soundScatterCounterClear' });
	},
	winInfo: async (bookEvent: BookEventOfType<'winInfo'>) => {
		const promise1 = async () => {
			eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_winlevel_small' });
			await animateSymbols({ positions: _.flatten(bookEvent.wins.map((win) => win.positions)) });
		};

		const promise2 = async () => {
			await eventEmitter.broadcastAsync({
				type: 'showClusterWinAmounts',
				wins: bookEvent.wins.map((win) => {
					return {
						win: win.meta.winWithoutMult,
						mult: win.meta.globalMult,
						result: win.meta.winWithoutMult * win.meta.globalMult,
						reel: win.meta.overlay.reel,
						row: win.meta.overlay.row,
					};
				}),
			});
		};

		await Promise.all([promise1(), promise2()]);
	},
	updateTumbleWin: async (bookEvent: BookEventOfType<'updateTumbleWin'>) => {
		if (bookEvent.amount > 0) {
			eventEmitter.broadcast({ type: 'tumbleWinAmountShow' });
			eventEmitter.broadcast({
				type: 'tumbleWinAmountUpdate',
				amount: bookEvent.amount,
				animate: false,
			});
		}
	},
	setTotalWin: async (bookEvent: BookEventOfType<'setTotalWin'>) => {
		console.log('💎 SET TOTAL WIN EVENT', {
			amount: bookEvent.amount,
			betAmount: stateBet.betAmount,
			multiplier: bookEvent.amount / stateBet.betAmount,
			timestamp: new Date().toISOString()
		});
		
		stateBet.winBookEventAmount = bookEvent.amount;
		
		// Check if we've hit the win cap (5000x bet)
		const winCapMultiplier = 5000.0;
		const currentBetAmount = stateBet.betAmount;
		const maxPossibleWin = currentBetAmount * winCapMultiplier;
		
		if (bookEvent.amount >= maxPossibleWin) {
			// Player hit the win cap - show max win screen
			eventEmitter.broadcast({ type: 'winScreenShow' });
			eventEmitter.broadcast({
				type: 'winScreenUpdate',
				amount: bookEvent.amount,
				winLevelData: winLevelMap[6] // Use max win level data
			});
		}
	},
	freeSpinTrigger: async (bookEvent: BookEventOfType<'freeSpinTrigger'>) => {
		console.log('🎰 FREE SPIN TRIGGER EVENT', {
			totalFs: bookEvent.totalFs,
			positions: bookEvent.positions,
			timestamp: new Date().toISOString()
		});
		
		// animate scatters - DISABLED to prevent symbol removal
		// eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_scatter_win_v2' });
		// await animateSymbols({ positions: bookEvent.positions });
		// Skip heist continue screen to avoid white screen issues
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_superfreespin' });
		// DISABLED - these might be clearing the board
		// await eventEmitter.broadcastAsync({ type: 'uiHide' });
		// await eventEmitter.broadcastAsync({ type: 'transition' });
		// eventEmitter.broadcast({ type: 'heistContinueShow' });
		eventEmitter.broadcast({ type: 'soundOnce', name: 'jng_intro_fs' });
		eventEmitter.broadcast({ type: 'soundMusic', name: 'bgm_freespin' });
		// await eventEmitter.broadcastAsync({
		// 	type: 'heistContinueUpdate',
		// });
		// Simple approach - just show free spins UI
		console.log('🎁 Free spins mode activated - treasure vault background is now visible');
		// Set treasure vault background to visible
		stateGame.showTreasureVault = true;
		// eventEmitter.broadcast({ type: 'heistContinueHide' });
		// Skip boom explosion to avoid white screen issues
		// eventEmitter.broadcast({ type: 'boomExplosionShow' });
		// await eventEmitter.broadcastAsync({ type: 'boomExplosionUpdate' });
		// eventEmitter.broadcast({ type: 'boomExplosionHide' });
		eventEmitter.broadcast({ type: 'globalMultiplierShow' });
		await eventEmitter.broadcastAsync({
			type: 'globalMultiplierUpdate',
			multiplier: 1, // resets when multiplier === 1
		});
		eventEmitter.broadcast({ type: 'freeSpinCounterShow' });
		eventEmitter.broadcast({
			type: 'freeSpinCounterUpdate',
			current: 0, // Start with 0 free spins used
			total: bookEvent.totalFs,
		});
		// DISABLED - might be interfering with symbols
		// await eventEmitter.broadcastAsync({ type: 'uiShow' });
		await eventEmitter.broadcastAsync({ type: 'drawerButtonShow' });
		eventEmitter.broadcast({ type: 'drawerFold' });
		
		// Free spins mode activated - treasure vault background ready
		console.log(`Free spins mode activated: ${bookEvent.totalFs} free spins available`);
		console.log('Treasure vault background is now visible');
		
		// Free spins mode ready - treasure vault background active
		console.log(`Free spins mode ready: ${bookEvent.totalFs} free spins available`);
		console.log('Treasure vault background is now visible');
		
		// Free spins mode ready - manual control
		console.log(`Free spins mode ready: ${bookEvent.totalFs} free spins available`);
		console.log('Treasure vault background is now visible');
		console.log('Click the spin button to use your free spins manually');
	},
	freeSpinRetrigger: async (bookEvent: BookEventOfType<'freeSpinTrigger'>) => {
		// DISABLED - same issues as freeSpinTrigger
		// eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_scatter_win_v2' });
		// await animateSymbols({ positions: bookEvent.positions });
		// show free spin intro
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_superfreespin' });
		// DISABLED - these clear the board
		// await eventEmitter.broadcastAsync({ type: 'uiHide' });
		// await eventEmitter.broadcastAsync({ type: 'transition' });
		console.log('BookEventHandler: Triggering freeSpinIntroShow');
		eventEmitter.broadcast({ type: 'freeSpinIntroShow' });
		eventEmitter.broadcast({ type: 'soundOnce', name: 'jng_intro_fs' });
		eventEmitter.broadcast({ type: 'soundMusic', name: 'bgm_freespin' });
		console.log('BookEventHandler: Triggering freeSpinIntroUpdate with totalFs:', bookEvent.totalFs);
		await eventEmitter.broadcastAsync({
			type: 'freeSpinIntroUpdate',
			totalFreeSpins: bookEvent.totalFs,
		});
		// Wait for user to press continue before hiding the intro
		// stateGame.gameType = 'freegame';
		// eventEmitter.broadcast({ type: 'freeSpinIntroHide' });
		// DISABLED - boom explosion causes issues
		// eventEmitter.broadcast({ type: 'boomExplosionShow' });
		// await eventEmitter.broadcastAsync({ type: 'boomExplosionUpdate' });
		// eventEmitter.broadcast({ type: 'boomExplosionHide' });
		eventEmitter.broadcast({ type: 'globalMultiplierShow' });
		await eventEmitter.broadcastAsync({
			type: 'globalMultiplierUpdate',
			multiplier: 1, // resets when multiplier === 1
		});
		eventEmitter.broadcast({ type: 'freeSpinCounterShow' });
		eventEmitter.broadcast({
			type: 'freeSpinCounterUpdate',
			current: 0, // Start with 0 free spins used
			total: bookEvent.totalFs,
		});
		
		// Ensure board is visible and trigger spin
		eventEmitter.broadcast({ type: 'boardShow' });
		
		// Trigger a spin to continue free spins
		setTimeout(() => {
			eventEmitter.broadcast({ type: 'bet' });
			console.log('Free spin retrigger - continuing spins');
		}, 1000);
		
		// DISABLED - might interfere with symbols
		// await eventEmitter.broadcastAsync({ type: 'uiShow' });
	},
	updateFreeSpin: async (bookEvent: BookEventOfType<'updateFreeSpin'>) => {
		eventEmitter.broadcast({ type: 'freeSpinCounterShow' });
		eventEmitter.broadcast({
			type: 'freeSpinCounterUpdate',
			current: bookEvent.amount,
			total: bookEvent.total,
		});
	},
	updateGlobalMult: async (bookEvent: BookEventOfType<'updateGlobalMult'>) => {
		eventEmitter.broadcast({ type: 'globalMultiplierShow' });
		if (bookEvent.globalMult === 1) {
			eventEmitter.broadcast({ type: 'tumbleWinAmountReset' });
		}
		await eventEmitter.broadcastAsync({
			type: 'globalMultiplierUpdate',
			multiplier: bookEvent.globalMult, // resets when multiplier === 1
		});
	},
	freeSpinEnd: async (bookEvent: BookEventOfType<'freeSpinEnd'>) => {
		const winLevelData = winLevelMap[bookEvent.winLevel as WinLevel];

		await eventEmitter.broadcastAsync({ type: 'uiHide' });
		stateGame.gameType = 'basegame';
		// Hide treasure vault background when exiting bonus mode
		stateGame.showTreasureVault = false;
		eventEmitter.broadcast({ type: 'boardFrameGlowHide' });
		eventEmitter.broadcast({ type: 'globalMultiplierHide' });
		eventEmitter.broadcast({ type: 'freeSpinOutroShow' });
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_youwon_panel' });
		winLevelSoundsPlay({ winLevelData });
		await eventEmitter.broadcastAsync({
			type: 'freeSpinOutroCountUp',
			amount: bookEvent.amount,
			winLevelData,
		});
		winLevelSoundsStop();
		eventEmitter.broadcast({ type: 'freeSpinOutroHide' });
		eventEmitter.broadcast({ type: 'freeSpinCounterHide' });
		eventEmitter.broadcast({ type: 'globalMultiplierHide' });
		eventEmitter.broadcast({ type: 'tumbleWinAmountHide' });
		await eventEmitter.broadcastAsync({ type: 'transition' });
		await eventEmitter.broadcastAsync({ type: 'uiShow' });
		await eventEmitter.broadcastAsync({ type: 'drawerUnfold' });
		eventEmitter.broadcast({ type: 'drawerButtonHide' });
	},
	tumbleBoard: async (bookEvent: BookEventOfType<'tumbleBoard'>) => {
		eventEmitter.broadcast({ type: 'boardHide' });
		eventEmitter.broadcast({ type: 'tumbleBoardShow' });
		eventEmitter.broadcast({ type: 'tumbleBoardInit', addingBoard: bookEvent.newSymbols });
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_b' });
		await eventEmitter.broadcastAsync({
			type: 'tumbleBoardExplode',
			explodingPositions: bookEvent.explodingSymbols,
		});
		eventEmitter.broadcast({ type: 'tumbleBoardRemoveExploded' });
		await eventEmitter.broadcastAsync({ type: 'tumbleBoardSlideDown' });
		eventEmitter.broadcast({
			type: 'boardSettle',
			board: stateGameDerived
				.tumbleBoardCombined()
				.map((tumbleReel) => tumbleReel.map((tumbleSymbol) => tumbleSymbol.rawSymbol)),
		});
		eventEmitter.broadcast({ type: 'tumbleBoardReset' });
		eventEmitter.broadcast({ type: 'tumbleBoardHide' });
		eventEmitter.broadcast({ type: 'boardShow' });
	},
	setWin: async (bookEvent: BookEventOfType<'setWin'>) => {
		const winLevelData = winLevelMap[bookEvent.winLevel as WinLevel];

		// Always use WinScreen for set wins to show pig police officers background
		eventEmitter.broadcast({ type: 'winScreenShow' });
		eventEmitter.broadcast({
			type: 'winScreenUpdate',
			amount: bookEvent.amount,
			winLevelData: winLevelData
		});
	},
	updateGrid: async (bookEvent: BookEventOfType<'updateGrid'>) => {
		eventEmitter.broadcast({ type: 'multiplierGridShow' });
		eventEmitter.broadcast({ type: 'multiplierGridUpdate', grid: bookEvent.gridMultipliers });
	},
	finalWin: async (bookEvent: BookEventOfType<'finalWin'>) => {
		eventEmitter.broadcast({ type: 'multiplierGridClear' });
		eventEmitter.broadcast({ type: 'multiplierGridHide' });
		eventEmitter.broadcast({ type: 'globalMultiplierHide' });
		eventEmitter.broadcast({ type: 'tumbleWinAmountHide' });
		
		// Show final win screen with the pig police officers background
		eventEmitter.broadcast({ 
			type: 'finalWinScreenShow' 
		});
		eventEmitter.broadcast({ 
			type: 'finalWinScreenUpdate', 
			amount: bookEvent.amount 
		});
	},
	// customised
	createBonusSnapshot: async (bookEvent: BookEventOfType<'createBonusSnapshot'>) => {
		const { bookEvents } = bookEvent;

		function findLastBookEvent<T>(type: T) {
			return _.findLast(bookEvents, (bookEvent) => bookEvent.type === type) as
				| BookEventOfType<T>
				| undefined;
		}

		const lastFreeSpinTriggerEvent = findLastBookEvent('freeSpinTrigger' as const);
		const lastUpdateFreeSpinEvent = findLastBookEvent('updateFreeSpin' as const);
		const lastSetTotalWinEvent = findLastBookEvent('setTotalWin' as const);
		const lastUpdateGlobalMultEvent = findLastBookEvent('updateGlobalMult' as const);

		if (lastFreeSpinTriggerEvent) await playBookEvent(lastFreeSpinTriggerEvent, { bookEvents });
		if (lastUpdateFreeSpinEvent) playBookEvent(lastUpdateFreeSpinEvent, { bookEvents });
		if (lastSetTotalWinEvent) playBookEvent(lastSetTotalWinEvent, { bookEvents });
		if (lastUpdateGlobalMultEvent) playBookEvent(lastUpdateGlobalMultEvent, { bookEvents });
	},
};

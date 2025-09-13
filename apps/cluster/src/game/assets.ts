export default {
	loader: {
		type: 'sprite',
		src: new URL('../../assets/spines/loader/loaderstatic.webp', import.meta.url).href,
		preload: true,
	},
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url).href,
		preload: true,
	},

	reelsFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/reelsFrame/reels_frame.png', import.meta.url).href,
	},
	payFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	boomExplosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/winMeterExplosion/ui_explosion.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/winMeterExplosion/ui_explosion.json', import.meta.url).href,
			scale: 1,
		},
	},
	goldFont: {
		type: 'font',
		src: new URL('../../assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
		preload: true,
	},
	// Golden Letters A-Z (from your image)
	goldenLetters: {
		type: 'sprites',
		src: new URL('../../assets/sprites/goldenLetters/golden_letters.json', import.meta.url).href,
		preload: true,
	},
	// Golden Numbers 0-9 (from your image)
	goldenNumbers: {
		type: 'sprites',
		src: new URL('../../assets/sprites/goldenNumbers/golden_numbers.json', import.meta.url).href,
		preload: true,
	},
	// Golden Special Characters (!@#$%)
	goldenSymbols: {
		type: 'sprites',
		src: new URL('../../assets/sprites/goldenSymbols/golden_symbols.json', import.meta.url).href,
		preload: true,
	},
	goldBlur: {
		type: 'font',
		src: new URL('../../assets/fonts/goldBlur/miningfont_gold_blur.xml', import.meta.url).href,
	},
	silverFont: {
		type: 'font',
		src: new URL('../../assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},
	purpleFont: {
		type: 'font',
		src: new URL('../../assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},
	superbubble: {
		type: 'font',
		src: new URL('../../assets/fonts/superbubble/superbubble.xml', import.meta.url).href,
		preload: true,
	},
	// Win Screen Images
	'big-win.png': {
		type: 'sprite',
		src: new URL('../../assets/sprites/winScreen/big-win.png', import.meta.url).href,
		preload: true,
	},
	'epic-win.png': {
		type: 'sprite',
		src: new URL('../../assets/sprites/winScreen/epic-win.png', import.meta.url).href,
		preload: true,
	},
	'mega-win.png': {
		type: 'sprite',
		src: new URL('../../assets/sprites/winScreen/mega-win.png', import.meta.url).href,
		preload: true,
	},
	'max-win.png': {
		type: 'sprite',
		src: new URL('../../assets/sprites/winScreen/max-win.png', import.meta.url).href,
		preload: true,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	foregroundAnimation: {
		type: 'sprite',
		src: new URL('../../assets/spines/foregroundAnimation/mm_bg.png', import.meta.url).href,
		preload: true,
	},
	foregroundFeatureAnimation: {
		type: 'sprite',
		src: new URL('../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.png', import.meta.url).href,
		preload: true,
	},
	treasureVaultBg: {
		type: 'sprite',
		src: new URL('../../assets/spines/foregroundFeatureAnimation/treasure_vault_bg.png', import.meta.url).href,
		preload: true,
	},
	heistContinueScreen: {
		type: 'sprite',
		src: new URL('../../assets/sprites/heistContinue/heist_continue_screen.webp', import.meta.url).href,
		preload: true,
	},
	pigPoliceVault: {
		type: 'sprite',
		src: new URL('../../assets/sprites/winScreen/pig_police_vault.webp', import.meta.url).href,
		preload: true,
	},
	freeSpinBackground: {
		type: 'sprite',
		src: new URL('../../assets/sprites/winScreen/free_spin_background.png', import.meta.url).href,
		preload: true,
	},
	finalWinBackground: {
		type: 'sprite',
		src: new URL('../../assets/sprites/winScreen/final_win_background.png', import.meta.url).href,
		preload: true,
	},
	bigWinSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigWinSpine/big_win_spine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigWinSpine/big_win_spine.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	epicWinSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/maxWinSpine/max_win_spine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/maxWinSpine/max_win_spine.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	maxWinSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/maxWinSpine/max_win_spine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/maxWinSpine/max_win_spine.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	megawinSpineNew: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/maxWinSpine/max_win_spine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/maxWinSpine/max_win_spine.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	clusterWinSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	heistWinSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/heistWinSpine/heist_win_spine.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/heistWinSpine/heist_win_spine.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	bigwinSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/bigwin.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/bigwin.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	tumbleWinSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	winMeterExplosionSpine: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/winMeterExplosion/winMeterExplosion.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/winMeterExplosion/winMeterExplosion.json', import.meta.url).href,
			scale: 1,
		},
		preload: true,
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url).href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},
	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
		preload: true,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url).href,
		preload: true,
	},
	heistCrewBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/winScreen/heist_crew_bg.png', import.meta.url).href,
		preload: true,
	},
	goldenFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/bonusReel/golden_frame.png', import.meta.url).href,
		preload: true,
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},
	// coins: {
	// 	type: 'spriteSheet',
	// 	src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	// },
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
	// Golden number assets temporarily disabled
	// goldenNumber0: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_0.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber1: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_1.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber2: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_2.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber3: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_3.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber4: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_4.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber5: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_5.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber6: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_6.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber7: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_7.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber8: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_8.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenNumber9: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_9.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenDollar: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_dollar.png', import.meta.url).href,
	// 	preload: true,
	// },
	// goldenDot: {
	// 	type: 'image',
	// 	src: new URL('../../assets/sprites/numbers/golden_dot.png', import.meta.url).href,
	// 	preload: true,
	// },
} as const;

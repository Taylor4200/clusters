export default {
	reveal: {
		type: 'reveal',
		board: [
			[
				// Row 1: A, B, C, D, E, F
				{ name: 'GOLD_A' },
				{ name: 'GOLD_B' },
				{ name: 'GOLD_C' },
				{ name: 'GOLD_D' },
				{ name: 'GOLD_E' },
				{ name: 'GOLD_F' },
				{ name: 'GOLD_A' },
			],
			[
				// Row 2: G, H, I, J, K, L, M
				{ name: 'GOLD_G' },
				{ name: 'GOLD_H' },
				{ name: 'GOLD_I' },
				{ name: 'GOLD_J' },
				{ name: 'GOLD_K' },
				{ name: 'GOLD_L' },
				{ name: 'GOLD_M' },
			],
			[
				// Row 3: N, O, P, Q, R, S
				{ name: 'GOLD_N' },
				{ name: 'GOLD_O' },
				{ name: 'GOLD_P' },
				{ name: 'GOLD_Q' },
				{ name: 'GOLD_R' },
				{ name: 'GOLD_S' },
				{ name: 'GOLD_N' },
			],
			[
				// Row 4: T, U, V, W, X, Y, Z
				{ name: 'GOLD_T' },
				{ name: 'GOLD_U' },
				{ name: 'GOLD_V' },
				{ name: 'GOLD_W' },
				{ name: 'GOLD_X' },
				{ name: 'GOLD_Y' },
				{ name: 'GOLD_Z' },
			],
			[
				// Mixed golden letters
				{ name: 'GOLD_A' },
				{ name: 'GOLD_B' },
				{ name: 'GOLD_C' },
				{ name: 'GOLD_D' },
				{ name: 'GOLD_E' },
				{ name: 'GOLD_F' },
				{ name: 'GOLD_G' },
			],
			[
				// More golden letters
				{ name: 'GOLD_H' },
				{ name: 'GOLD_I' },
				{ name: 'GOLD_J' },
				{ name: 'GOLD_K' },
				{ name: 'GOLD_L' },
				{ name: 'GOLD_M' },
				{ name: 'GOLD_N' },
			],
			[
				// Final row of golden letters
				{ name: 'GOLD_O' },
				{ name: 'GOLD_P' },
				{ name: 'GOLD_Q' },
				{ name: 'GOLD_R' },
				{ name: 'GOLD_S' },
				{ name: 'GOLD_T' },
				{ name: 'GOLD_U' },
			],
		],
		gameType: 'basegame',
	},
	winInfo: {
		type: 'winInfo',
		totalWin: 1500, // Total win from golden letter clusters
		wins: [
			{
				symbol: 'GOLD_A',
				clusterSize: 7,
				win: 200,
				positions: [
					{ reel: 0, row: 0 },
					{ reel: 0, row: 6 },
					{ reel: 4, row: 0 },
					{ reel: 4, row: 1 },
					{ reel: 4, row: 2 },
					{ reel: 4, row: 3 },
					{ reel: 4, row: 4 },
				],
			},
			{
				symbol: 'GOLD_N',
				clusterSize: 7,
				win: 200,
				positions: [
					{ reel: 2, row: 0 },
					{ reel: 2, row: 6 },
					{ reel: 5, row: 6 },
					{ reel: 6, row: 0 },
					{ reel: 6, row: 1 },
					{ reel: 6, row: 2 },
					{ reel: 6, row: 3 },
				],
			},
			{
				symbol: 'GOLD_B',
				clusterSize: 5,
				win: 100,
				positions: [
					{ reel: 0, row: 1 },
					{ reel: 4, row: 1 },
					{ reel: 5, row: 1 },
					{ reel: 6, row: 1 },
					{ reel: 6, row: 4 },
				],
			},
			{
				symbol: 'GOLD_C',
				clusterSize: 4,
				win: 50,
				positions: [
					{ reel: 0, row: 2 },
					{ reel: 4, row: 2 },
					{ reel: 5, row: 2 },
					{ reel: 6, row: 2 },
				],
			},
		],
	},
	setTotalWin: {
		type: 'setTotalWin',
		amount: 1500,
	},
	finalWin: {
		type: 'finalWin',
		amount: 1500,
	},
};


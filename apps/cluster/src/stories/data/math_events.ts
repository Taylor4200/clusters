export default {
	reveal: {
		type: 'reveal',
		board: [
			[
				// Fibonacci sequence: 1,1,2,3,5,8,13
				{ name: 'L1' }, // 1
				{ name: 'L1' }, // 1
				{ name: 'L2' }, // 2
				{ name: 'L3' }, // 3
				{ name: 'L5' }, // 5
				{ name: 'L8' }, // 8
				{ name: 'L13' }, // 13
			],
			[
				// Prime sequence: 2,3,5,7,11,13,17
				{ name: 'L2' }, // 2
				{ name: 'L3' }, // 3
				{ name: 'L5' }, // 5
				{ name: 'L7' }, // 7
				{ name: 'L11' }, // 11
				{ name: 'L13' }, // 13
				{ name: 'L17' }, // 17
			],
			[
				// Arithmetic sequence: 1,2,3,4,5,6,7
				{ name: 'L1' }, // 1
				{ name: 'L2' }, // 2
				{ name: 'L3' }, // 3
				{ name: 'L4' }, // 4
				{ name: 'L5' }, // 5
				{ name: 'L6' }, // 6
				{ name: 'L7' }, // 7
			],
			[
				// Geometric sequence: 1,2,4,8,16,32,64
				{ name: 'L1' }, // 1
				{ name: 'L2' }, // 2
				{ name: 'L4' }, // 4
				{ name: 'L8' }, // 8
				{ name: 'L16' }, // 16
				{ name: 'L32' }, // 32
				{ name: 'L64' }, // 64
			],
			[
				// Mixed symbols for contrast
				{ name: 'H1' },
				{ name: 'H2' },
				{ name: 'H3' },
				{ name: 'H4' },
				{ name: 'H5' },
				{ name: 'H6' },
				{ name: 'H7' },
			],
			[
				// Another Fibonacci cluster
				{ name: 'L1' }, // 1
				{ name: 'L1' }, // 1
				{ name: 'L2' }, // 2
				{ name: 'L3' }, // 3
				{ name: 'L5' }, // 5
				{ name: 'L8' }, // 8
				{ name: 'L13' }, // 13
			],
			[
				// Prime cluster
				{ name: 'L2' }, // 2
				{ name: 'L3' }, // 3
				{ name: 'L5' }, // 5
				{ name: 'L7' }, // 7
				{ name: 'L11' }, // 11
				{ name: 'L13' }, // 13
				{ name: 'L17' }, // 17
			],
		],
		gameType: 'basegame',
	},
	winInfo: {
		type: 'winInfo',
		totalWin: 2500, // Enhanced total for math sequences
		wins: [
			{
				symbol: 'MATH_FIB',
				clusterSize: 7,
				win: 500, // Base win
				multiplier: 2.5, // Fibonacci multiplier
				bonusMultiplier: 1.5, // Match quality bonus
				mathSequence: {
					type: 'fibonacci',
					sequence: [1, 1, 2, 3, 5, 8, 13],
					description: 'Fibonacci Sequence: 1, 1, 2, 3, 5, 8, 13',
				},
				positions: [
					{ reel: 0, row: 0 },
					{ reel: 0, row: 1 },
					{ reel: 0, row: 2 },
					{ reel: 0, row: 3 },
					{ reel: 0, row: 4 },
					{ reel: 0, row: 5 },
					{ reel: 0, row: 6 },
				],
			},
			{
				symbol: 'MATH_PRIME',
				clusterSize: 7,
				win: 750, // Base win
				multiplier: 3.0, // Prime multiplier
				bonusMultiplier: 2.0, // Match quality bonus
				mathSequence: {
					type: 'prime',
					sequence: [2, 3, 5, 7, 11, 13, 17],
					description: 'Prime Numbers: 2, 3, 5, 7, 11, 13, 17',
				},
				positions: [
					{ reel: 1, row: 0 },
					{ reel: 1, row: 1 },
					{ reel: 1, row: 2 },
					{ reel: 1, row: 3 },
					{ reel: 1, row: 4 },
					{ reel: 1, row: 5 },
					{ reel: 1, row: 6 },
				],
			},
			{
				symbol: 'MATH_ARITH',
				clusterSize: 7,
				win: 400, // Base win
				multiplier: 2.0, // Arithmetic multiplier
				bonusMultiplier: 1.2, // Match quality bonus
				mathSequence: {
					type: 'arithmetic',
					sequence: [1, 2, 3, 4, 5, 6, 7],
					description: 'Arithmetic Sequence: 1, 2, 3, 4, 5, 6, 7',
				},
				positions: [
					{ reel: 2, row: 0 },
					{ reel: 2, row: 1 },
					{ reel: 2, row: 2 },
					{ reel: 2, row: 3 },
					{ reel: 2, row: 4 },
					{ reel: 2, row: 5 },
					{ reel: 2, row: 6 },
				],
			},
			{
				symbol: 'MATH_GEOM',
				clusterSize: 7,
				win: 600, // Base win
				multiplier: 2.8, // Geometric multiplier
				bonusMultiplier: 1.8, // Match quality bonus
				mathSequence: {
					type: 'geometric',
					sequence: [1, 2, 4, 8, 16, 32, 64],
					description: 'Geometric Sequence: 1, 2, 4, 8, 16, 32, 64',
				},
				positions: [
					{ reel: 3, row: 0 },
					{ reel: 3, row: 1 },
					{ reel: 3, row: 2 },
					{ reel: 3, row: 3 },
					{ reel: 3, row: 4 },
					{ reel: 3, row: 5 },
					{ reel: 3, row: 6 },
				],
			},
		],
	},
	setTotalWin: {
		type: 'setTotalWin',
		amount: 2500,
	},
	finalWin: {
		type: 'finalWin',
		amount: 2500,
	},
};


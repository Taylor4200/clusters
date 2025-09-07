/**
 * Mathematical sequence detection and win calculation utilities
 */

export type MathSequenceType = 'fibonacci' | 'prime' | 'arithmetic' | 'geometric';

export interface MathSequenceResult {
	type: MathSequenceType;
	sequence: number[];
	multiplier: number;
	bonusMultiplier: number;
}

/**
 * Generate Fibonacci sequence up to n terms
 */
export function generateFibonacci(n: number): number[] {
	if (n <= 0) return [];
	if (n === 1) return [1];
	if (n === 2) return [1, 1];
	
	const fib = [1, 1];
	for (let i = 2; i < n; i++) {
		fib.push(fib[i - 1] + fib[i - 2]);
	}
	return fib;
}

/**
 * Generate prime numbers up to n terms
 */
export function generatePrimes(n: number): number[] {
	if (n <= 0) return [];
	
	const primes = [];
	let num = 2;
	
	while (primes.length < n) {
		if (isPrime(num)) {
			primes.push(num);
		}
		num++;
	}
	return primes;
}

/**
 * Check if a number is prime
 */
function isPrime(num: number): boolean {
	if (num < 2) return false;
	if (num === 2) return true;
	if (num % 2 === 0) return false;
	
	for (let i = 3; i <= Math.sqrt(num); i += 2) {
		if (num % i === 0) return false;
	}
	return true;
}

/**
 * Generate arithmetic sequence: start, start+d, start+2d, ...
 */
export function generateArithmetic(start: number, difference: number, n: number): number[] {
	const sequence = [];
	for (let i = 0; i < n; i++) {
		sequence.push(start + i * difference);
	}
	return sequence;
}

/**
 * Generate geometric sequence: start, start*r, start*r², ...
 */
export function generateGeometric(start: number, ratio: number, n: number): number[] {
	const sequence = [];
	for (let i = 0; i < n; i++) {
		sequence.push(start * Math.pow(ratio, i));
	}
	return sequence;
}

/**
 * Detect mathematical sequences in a cluster of symbols
 * Returns the best matching sequence with bonus multipliers
 */
export function detectMathSequence(symbols: string[], positions: {reel: number, row: number}[]): MathSequenceResult | null {
	// Convert symbols to numbers for sequence detection
	const numbers = symbols.map(symbol => {
		// Map symbols to numbers based on their names
		if (symbol.startsWith('L')) {
			return parseInt(symbol.substring(1)) || 1;
		}
		if (symbol.startsWith('H')) {
			return parseInt(symbol.substring(1)) + 10 || 11;
		}
		return 1; // Default fallback
	});

	// Sort numbers for sequence detection
	const sortedNumbers = [...numbers].sort((a, b) => a - b);
	
	// Check each sequence type
	const sequences = [
		{ type: 'fibonacci' as MathSequenceType, sequence: generateFibonacci(sortedNumbers.length) },
		{ type: 'prime' as MathSequenceType, sequence: generatePrimes(sortedNumbers.length) },
		{ type: 'arithmetic' as MathSequenceType, sequence: generateArithmetic(sortedNumbers[0] || 1, 1, sortedNumbers.length) },
		{ type: 'geometric' as MathSequenceType, sequence: generateGeometric(sortedNumbers[0] || 1, 2, sortedNumbers.length) },
	];

	// Find the best matching sequence
	let bestMatch: MathSequenceResult | null = null;
	let bestScore = 0;

	for (const seq of sequences) {
		const score = calculateSequenceMatch(sortedNumbers, seq.sequence);
		if (score > bestScore && score >= 0.7) { // 70% match threshold
			bestMatch = {
				type: seq.type,
				sequence: seq.sequence,
				multiplier: getSequenceMultiplier(seq.type, sortedNumbers.length),
				bonusMultiplier: getBonusMultiplier(seq.type, score),
			};
			bestScore = score;
		}
	}

	return bestMatch;
}

/**
 * Calculate how well a sequence matches the given numbers
 */
function calculateSequenceMatch(numbers: number[], sequence: number[]): number {
	if (numbers.length !== sequence.length) return 0;
	
	let matches = 0;
	for (let i = 0; i < numbers.length; i++) {
		if (numbers[i] === sequence[i]) {
			matches++;
		}
	}
	
	return matches / numbers.length;
}

/**
 * Get base multiplier for sequence type and length
 */
function getSequenceMultiplier(type: MathSequenceType, length: number): number {
	const baseMultipliers = {
		fibonacci: 2.5,
		prime: 3.0,
		arithmetic: 2.0,
		geometric: 2.8,
	};
	
	return baseMultipliers[type] * Math.pow(1.5, length - 3); // Exponential growth
}

/**
 * Get bonus multiplier based on sequence type and match quality
 */
function getBonusMultiplier(type: MathSequenceType, matchScore: number): number {
	const typeBonuses = {
		fibonacci: 1.5,
		prime: 2.0,
		arithmetic: 1.2,
		geometric: 1.8,
	};
	
	return typeBonuses[type] * matchScore;
}

/**
 * Calculate enhanced win amount for mathematical sequences
 */
export function calculateMathWin(baseWin: number, mathResult: MathSequenceResult): number {
	const enhancedWin = baseWin * mathResult.multiplier * mathResult.bonusMultiplier;
	return Math.round(enhancedWin * 100) / 100; // Round to 2 decimal places
}

/**
 * Get sequence description for UI display
 */
export function getSequenceDescription(result: MathSequenceResult): string {
	const descriptions = {
		fibonacci: `Fibonacci Sequence: ${result.sequence.join(', ')}`,
		prime: `Prime Numbers: ${result.sequence.join(', ')}`,
		arithmetic: `Arithmetic Sequence: ${result.sequence.join(', ')}`,
		geometric: `Geometric Sequence: ${result.sequence.join(', ')}`,
	};
	
	return descriptions[result.type];
}


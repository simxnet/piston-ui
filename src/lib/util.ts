/**
 * Reduce calls to the passed function.
 *
 * @param func - Function to debounce.
 * @param threshold - The delay to avoid recalling the function.
 * @param execAsap - If true, the function is called at the start of the threshold, otherwise the function is called at the end of the threshold.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	threshold: number,
	execAsap = false,
): T {
	let timeout: NodeJS.Timeout | null;

	return function debounced(this: unknown, ...args: unknown[]): unknown {
		const self = this;

		if (timeout) {
			clearTimeout(timeout);
		} else if (execAsap) {
			func.apply(self, args);
		}

		timeout = setTimeout(delayed, threshold || 100);

		function delayed(): void {
			if (!execAsap) {
				func.apply(self, args);
			}
			timeout = null;
		}

		return undefined as unknown;
	} as T;
}

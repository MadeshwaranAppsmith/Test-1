// Global config and feature flags
export const AppConfig = {
	reducedMotion: false, // toggled at runtime based on media query and user choice
	heavyEffects: true, // can be disabled for low-power devices
	theme: 'dark' // 'light' | 'dark'
};

export function initializeConfigFromEnvironment() {
	// Respect prefers-reduced-motion and expose feature flag
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) AppConfig.reducedMotion = true;

	// Lightweight heuristic for low-power devices
	const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
	if (isLowPower) {
		AppConfig.heavyEffects = false;
	}

	// Allow overrides via URL params
	try {
		const params = new URLSearchParams(window.location.search);
		if (params.has('reducedMotion')) {
			AppConfig.reducedMotion = params.get('reducedMotion') === 'true';
		}
		if (params.has('heavyEffects')) {
			AppConfig.heavyEffects = params.get('heavyEffects') === 'true';
		}
		if (params.has('theme')) {
			AppConfig.theme = params.get('theme') === 'light' ? 'light' : 'dark';
		}
	} catch {}

	document.documentElement.setAttribute('data-theme', AppConfig.theme);
	document.documentElement.setAttribute('data-reduced-motion', String(AppConfig.reducedMotion));
}



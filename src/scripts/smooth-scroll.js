// Smooth scrolling via Lenis (CDN), supports reduced motion
import { AppConfig } from './config.js';

export function initSmoothScroll() {
	if (AppConfig.reducedMotion) return;
	// Lenis is added via CDN on pages; use global if present
	const Lenis = window.Lenis || window.lenis || window.Lenis?.default;
	if (!Lenis) return;

	const lenis = new Lenis({
		duration: 1.1,
		lerp: 0.1,
		wheelMultiplier: 1.1,
		touchMultiplier: 1.2,
		smoothWheel: true,
		normalizeWheel: true
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	// Optional: snap sections (data-snap), minimal to keep perf good
	const snapSections = Array.from(document.querySelectorAll('[data-snap]'));
	if (snapSections.length) {
		let isSnapping = false;
		lenis.on('scroll', ({ scroll, velocity }) => {
			if (isSnapping || Math.abs(velocity) < 0.1) return;
			const positions = snapSections.map((s) => s.offsetTop);
			const target = positions.reduce((prev, curr) =>
				Math.abs(curr - scroll) < Math.abs(prev - scroll) ? curr : prev
			, positions[0]);
			isSnapping = true;
			lenis.scrollTo(target, { duration: 0.7, force: false, lock: true, onComplete: () => { isSnapping = false; } });
		});
	}
}



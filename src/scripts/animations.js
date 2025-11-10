// Animation module: intro hero, reveal-on-scroll, hover reveals.
// Uses GSAP via CDN (window.gsap) to avoid bundler requirement for immediate run.
import { AppConfig } from './config.js';

export function initAnimations() {
	const gsap = window.gsap;
	if (!gsap) return; // graceful degrade

	// Intro timeline for hero
	if (!AppConfig.reducedMotion) {
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
		tl.from('[data-hero-title] span', {
			yPercent: 110,
			stagger: 0.08,
			duration: 0.9
		});
		tl.from('[data-hero-subtitle]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');
		tl.from('[data-hero-cta] .btn', { y: 16, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.2');
	}

	// Reveal on scroll
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.setAttribute('data-reveal', 'in');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });

	document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

	// Hover image displacement-like reveal (lightweight mask)
	if (AppConfig.heavyEffects && !AppConfig.reducedMotion) {
		document.querySelectorAll('.card').forEach((card) => {
			const media = card.querySelector('.card-media img');
			if (!media) return;
			card.addEventListener('pointermove', (e) => {
				const rect = card.getBoundingClientRect();
				const dx = (e.clientX - rect.left) / rect.width - 0.5;
				const dy = (e.clientY - rect.top) / rect.height - 0.5;
				gsap.to(media, { duration: 0.6, x: dx * 12, y: dy * 12, ease: 'power3.out' });
			});
			card.addEventListener('pointerleave', () => {
				gsap.to(media, { duration: 0.6, x: 0, y: 0, ease: 'power3.out' });
			});
		});
	}
}



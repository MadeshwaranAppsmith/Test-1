// Custom cursor with magnetic interactions
import { AppConfig } from './config.js';

export function initCursor() {
	if (AppConfig.reducedMotion) return;

	const cursor = document.createElement('div');
	cursor.className = 'cursor';
	cursor.setAttribute('aria-hidden', 'true');

	const label = document.createElement('div');
	label.className = 'cursor-label';
	label.setAttribute('aria-hidden', 'true');

	document.body.append(cursor, label);

	let mouseX = window.innerWidth / 2;
	let mouseY = window.innerHeight / 2;

	// Follow pointer
	window.addEventListener('pointermove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
		positionElements();
	}, { passive: true });

	function positionElements() {
		cursor.style.left = `${mouseX}px`;
		cursor.style.top = `${mouseY}px`;
		label.style.left = `${mouseX}px`;
		label.style.top = `${mouseY}px`;
	}

	// Magnetic hover
	const magnetTargets = Array.from(document.querySelectorAll('[data-magnet]'));
	magnetTargets.forEach((el) => {
		el.addEventListener('pointerenter', () => {
			cursor.setAttribute('data-variant', 'magnet');
			const cursorText = el.getAttribute('data-cursor');
			if (cursorText) {
				label.textContent = cursorText;
				label.setAttribute('data-show', 'true');
			}
		});
		el.addEventListener('pointerleave', () => {
			cursor.setAttribute('data-variant', '');
			label.setAttribute('data-show', 'false');
		});
	});

	// Hide cursor when leaving window
	document.addEventListener('mouseleave', () => {
		cursor.setAttribute('data-variant', 'hide');
	});
	document.addEventListener('mouseenter', () => {
		cursor.setAttribute('data-variant', '');
	});
}



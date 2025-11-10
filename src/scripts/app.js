// App bootstrapper: initializes config, smooth scroll, cursor, and animations
import { initializeConfigFromEnvironment } from './config.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initCursor } from './cursor.js';
import { initAnimations } from './animations.js';

function init() {
	initializeConfigFromEnvironment();
	initSmoothScroll();
	initCursor();
	initAnimations();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}



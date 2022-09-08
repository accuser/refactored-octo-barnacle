const defaultTheme = require('tailwindcss/defaultTheme');

const round = (num) =>
	num
		.toFixed(7)
		.replace(/(\.[0-9]+?)0+$/, '$1')
		.replace(/\.0$/, '');

const rem = (px) => `${round(px / 16)}rem`;

const em = (px, base) => `${round(px / base)}em`;

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography')
	],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'p:first-of-type': {
							color: 'var(--tw-prose-lead)'
						}
					}
				},
				sm: {
					css: {
						'p:first-of-type': {
							fontSize: em(18, 14),
							lineHeight: round(28 / 18),
							marginTop: em(16, 18),
							marginBottom: em(16, 18)
						}
					}
				},
				base: {
					css: {
						'p:first-of-type': {
							fontSize: em(20, 16),
							lineHeight: round(32 / 20),
							marginTop: em(24, 20),
							marginBottom: em(24, 20)
						}
					}
				},
				lg: {
					css: {
						'p:first-of-type': {
							fontSize: em(22, 18),
							lineHeight: round(32 / 22),
							marginTop: em(24, 22),
							marginBottom: em(24, 22)
						}
					}
				},
				xl: {
					css: {
						'p:first-of-type': {
							fontSize: em(24, 20),
							lineHeight: round(36 / 24),
							marginTop: em(24, 24),
							marginBottom: em(24, 24)
						}
					}
				},
				'2xl': {
					css: {
						'p:first-of-type': {
							fontSize: em(30, 24),
							lineHeight: round(44 / 30),
							marginTop: em(32, 30),
							marginBottom: em(32, 30)
						}
					}
				}
			}
		}
	}
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			keyframes: {
				pop: {
					'50%': {
						transform: 'scale(1.2)'
					},
				},
				clockwise: {
					'0%': {
						transform: 'translate(0 px, 0 px)'
					},
					'25%': {
						transform: 'translate(100 px, 0 px)'
					},
					'50%': {
						transform: 'translate(100 px, 100 px)'
					},
					'75%': {
						transform: 'translate(0 px, 100 px)'
					},
					'100%': {
						transform: 'translate(0 px, 0 px)'
					}
				}
			},
			animation: {
				'pop': 'pop 0.3s linear 1',
				'clockwise': 'clockwise 200ms linear infinite'
			},
			fontFamily: {
				macondo: ["'Macondo','cursive'"],
				patrickHand: ['Patrick Hand', 'cursive'],
				handlee: ['Handlee', 'cursive']
			}
		},
	},
	plugins: [],
}
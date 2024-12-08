import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				strongblue: '#1E4173',
				lightblue: '#A2B6D1',
				strongorage: '#C2834C',
				lightorange: '#EFD5BE'
			}
		}
	},
	plugins: []
} satisfies Config;

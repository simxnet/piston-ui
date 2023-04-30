import { Config } from "tailwindcss";
import "flowbite/plugin";

export default {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
	darkMode: "class",
} satisfies Config;

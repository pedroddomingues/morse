module.exports = {
	mode: 'jit',
	content: [
		"./src/pages/**/*.tsx",
		"./src/components/**/*.tsx"
	],
	theme: {
		minHeight: {
		'1/2': '50%',
		'3/4': '75%',
	  },
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		styled: true,
		themes: ['aqua', 'night'],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "night",
	  },
}

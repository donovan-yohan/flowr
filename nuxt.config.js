import colors from "vuetify/es5/util/colors";

export default {
	mode: "spa",
	/*
	 ** Headers of the page
	 */
	head: {
		titleTemplate: "Flowr",
		title: "Flowr",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content: process.env.npm_package_description || ""
			}
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "favicon.ico" },
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
			}
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: "#fff" },
	/*
	 ** Global CSS
	 */
	css: ["~/css/main.css"],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [{ src: "~/plugins/vuex-persist", ssr: false }],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		"@nuxtjs/vuetify",
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios"
	],
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {},
	/*
	 ** vuetify module configuration
	 ** https://github.com/nuxt-community/vuetify-module
	 */
	vuetify: {
		options: {
			customProperties: true
		},
		theme: {
			primary: colors.blue.darken2,
			accent: colors.grey.darken3,
			secondary: colors.amber.darken3,
			info: colors.teal.lighten1,
			warning: colors.amber.base,
			error: colors.deepOrange.accent4,
			success: colors.green.accent3,
			flowrRed: colors.red.darken1,
			flowrOrange: colors.orange.base,
			flowrYellow: colors.amber.lighten1,
			flowrGreen: "#90D844",
			flowrTurquoise: "#2CC6AB",
			flowrBlue: "#09A9ED",
			flowrIndigo: "#0C85E8",
			flowrViolet: "#6E5EE5",
			flowrPurple: "#AB5DE6",
			flowrMagenta: "#EA4BBD",
			gray: "#bfbfbf"
		}
	},

	router: {
		base: "/flowr/"
	}
	/*
	 ** Build configuration
	 */
};

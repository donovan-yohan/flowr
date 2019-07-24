import colors from "vuetify/es5/util/colors";

export default {
	mode: "universal",
	/*
	 ** Headers of the page
	 */
	head: {
		titleTemplate: "Flowr",
		title: process.env.npm_package_name || "",
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
	css: [],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		"@nuxtjs/vuetify",
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		"@nuxtjs/pwa"
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
			red: "#D33535",
			orange: "#FF8500",
			yellow: "#FFC74A",
			green: "AAE565",
			turquoise: "2CC6AB",
			blue: "09A9ED",
			darkblue: "0C85E8",
			purple: "6E5EE5",
			violet: "AB5DE6",
			magenta: "EA4BBD",
			gray: "#bfbfbf"
		}
	},

	router: {
		base: "/flowr/"
	},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	}
};

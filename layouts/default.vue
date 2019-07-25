<template>
	<v-app>
		<v-toolbar
			:clipped-left="clipped"
			fixed
			app
			color="white"
		>
			<v-toolbar-title class="text-capitalize" v-text="title" />
			<v-spacer />

			<v-btn v-if="title === 'grades'" icon @click="toggleHidden()">
				<v-icon color="flowrYellow">
					{{ gradesIcon }}
				</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>more_vert</v-icon>
			</v-btn>
		</v-toolbar>
		<v-content>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
		<v-bottom-nav
			ref="bottomNav"
			:active.sync="title"
			:value="true"
			fixed
			color="white"
			mandatory
		>
			<v-btn
				color="flowrYellow"
				flat
				value="grades"
				to="grades"
				nuxt
			>
				<span>Classes</span>
				<v-icon>spellcheck</v-icon>
			</v-btn>

			<v-btn
				color="flowrOrange"
				flat
				value="tasks"
				to="/"
				exact
				nuxt
			>
				<span>Tasks</span>
				<v-icon>list</v-icon>
			</v-btn>

			<v-btn
				color="flowrRed"
				flat
				value="calendar"
				to="calendar"
				nuxt
			>
				<span>Calendar</span>
				<v-icon>calendar_today</v-icon>
			</v-btn>
		</v-bottom-nav>
	</v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	data() {
		return {
			clipped: false,
			miniVariant: false,
			title: ""
		};
	},
	computed: {
		hidden() {
			return this.$store.state.hidden;
		},
		gradesIcon() {
			return this.$store.state.gradesIcon;
		}
	},
	mounted() {
		const bottomNav = this.$refs.bottomNav.$el;
		const navValue = bottomNav
			.querySelector("a.v-btn--active")
			.getAttribute("value");
		this.title = navValue;
	},
	methods: {
		...mapMutations(["toggleHidden"])
	}
};
</script>

<style lang="scss" scoped>
@font-face {
	font-family: "Montserrat";
	src: url("../static/fonts/Montserrat-Regular.ttf");
	font-weight: 400;
}

@font-face {
	font-family: "Montserrat";
	src: url("../static/fonts/Montserrat-Bold.ttf");
	font-weight: 700;
}

.application {
	font-family: "Montserrat", sans-serif;
}

.v-content {
	margin-bottom: 64px;
}

.v-btn__content span {
	font-size: 12px;
	color: gray;
}
.v-btn--active span {
	color: black;
}

.v-item-group.v-bottom-nav {
	.v-btn--active {
		padding-top: 8px;
	}
}

/* iPhone X Series adjustments */
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	.v-bottom-nav {
		height: auto !important;
	}
	.v-item-group.v-bottom-nav .v-btn {
		padding-bottom: 28px;
	}
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
	.v-bottom-nav {
		height: auto !important;
	}
	.v-item-group.v-bottom-nav .v-btn {
		padding-bottom: 28px;
	}
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	.v-bottom-nav {
		height: auto !important;
	}
	.v-item-group.v-bottom-nav .v-btn {
		padding-bottom: 28px;
	}
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
	.v-bottom-nav {
		height: auto !important;
	}
	.v-item-group.v-bottom-nav .v-btn {
		padding-bottom: 28px;
	}
}
</style>

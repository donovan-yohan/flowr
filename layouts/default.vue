<template>
	<v-app>
		<v-toolbar :clipped-left="clipped" fixed app color="white">
			<transition name="fade" mode="out-in">
				<v-toolbar-title :key="title" class="text-capitalize">
					{{ title }}
				</v-toolbar-title>
			</transition>
			<v-spacer />

			<v-btn v-if="title === 'classes'" icon @click="toggleHidden()">
				<v-icon color="flowrYellow">
					{{ gradesHidden ? "visibility_off" : "visibility" }}
				</v-icon>
			</v-btn>

			<v-btn
				v-if="title === 'tasks'"
				icon
				@click="
					() => {
						return null;
					}
				"
			>
				<v-icon color="flowrOrange">
					spellcheck
				</v-icon>
			</v-btn>

			<v-btn v-if="title === 'tasks'" icon @click="toggleUnfold()">
				<v-icon color="flowrOrange">
					{{ unfolded ? "unfold_more" : "unfold_less" }}
				</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>more_vert</v-icon>
			</v-btn>
		</v-toolbar>

		<v-content
			v-touch="{
				left: () => swipeLeft(title),
				right: () => swipeRight(title)
			}"
		>
			<v-container>
				<transition :name="getTransition()">
					<nuxt />
				</transition>
			</v-container>
		</v-content>

		<v-bottom-nav
			ref="bottomNav"
			v-touch="{
				left: () => swipeLeft(title),
				right: () => swipeRight(title)
			}"
			:active.sync="title"
			:value="true"
			fixed
			color="white"
			mandatory
		>
			<v-btn color="flowrYellow" flat value="classes" to="grades" nuxt>
				<span>Classes</span>
				<v-icon>spellcheck</v-icon>
			</v-btn>

			<v-btn color="flowrOrange" flat value="tasks" to="/" exact nuxt>
				<span>Tasks</span>
				<v-icon>list</v-icon>
			</v-btn>

			<v-btn color="flowrRed" flat value="calendar" to="calendar" nuxt>
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
		gradesHidden() {
			return this.$store.state.gradesHidden;
		},
		unfolded() {
			return this.$store.state.unfolded;
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
		...mapMutations(["toggleHidden", "toggleUnfold"]),
		swipeLeft(title) {
			if (title == "tasks") {
				this.title = "calendar";
				this.$router.push({ path: "/calendar" });
			}
			if (title == "classes") {
				this.title = "tasks";
				this.$router.push({ path: "/" });
			}
		},
		swipeRight(title) {
			if (title == "tasks") {
				this.title = "classes";
				this.$router.push({ path: "/grades" });
			}
			if (title == "calendar") {
				this.title = "tasks";
				this.$router.push({ path: "/" });
			}
		},
		getTransition(target) {}
	}
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
	animation: acrossIn 0.4s ease-out both;
}
.slide-leave-to {
	animation: acrossOut 0.6s ease-in both;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-active {
	transition: opacity 0.2s ease;
}

.fade-leave-active {
	transition: opacity 0.2s ease;
}
@keyframes acrossIn {
	0% {
		transform: translate3d(-100%, 0, 0);
	}
	100% {
		transform: translate3d(0, 0, 0);
	}
}
@keyframes acrossOut {
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(100%, 0, 0);
	}
}

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
.v-btn--icon {
	.v-btn__content i {
		max-width: 24px;
	}
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

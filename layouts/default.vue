<template>
	<v-app class="app-wrapper">
		<v-toolbar :clipped-left="clipped" fixed app color="white">
			<transition name="fade" mode="out-in">
				<v-toolbar-title :key="title" class="text-capitalize">
					{{ title }}
				</v-toolbar-title>
			</transition>
			<v-spacer />
			<transition name="fade" mode="out-in" />

			<transition name="fade" mode="out-in">
				<div v-if="title === 'classes'" :key="0">
					<v-btn icon @click="toggleHidden()">
						<v-icon color="flowrYellow">
							{{ gradesHidden ? "visibility_off" : "visibility" }}
						</v-icon>
					</v-btn>
				</div>
				<div v-else-if="title === 'tasks'" :key="1">
					<v-btn
						icon
						@click="toggleMissingGrades()"
					>
						<v-icon color="flowrOrange">
							spellcheck
						</v-icon>
					</v-btn>

					<v-btn icon @click="toggleUnfold()">
						<v-icon color="flowrOrange">
							{{ unfolded ? "unfold_less" : "unfold_more" }}
						</v-icon>
					</v-btn>
				</div>
				<div v-else :key="2" class="calendar-toolbar">
					<div class="calendar-switch">
						<v-btn small flat round @click="toggleCalendar()">
							<span :class="{ 'active-calendar': showingEvents }">
								Tasks
							</span>
							<span :class="{ 'active-calendar': !showingEvents }">
								Classes
							</span>
						</v-btn>
					</div>
					<v-menu
						bottom
						left
						content-class="calendar-class-menu"
						:close-on-content-click="false"
					>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon>more_vert</v-icon>
							</v-btn>
						</template>
						<v-slider
							v-if="!showingEvents"
							v-model="intervalHeight"
							append-icon="zoom_in"
							prepend-icon="zoom_out"
							:min="20"
							:max="100"
							@click:append="zoomIn"
							@click:prepend="zoomOut"
						/>
					</v-menu>
				</div>
			</transition>
		</v-toolbar>

		<v-content
			v-touch="{
				left: () => swipeLeft(title),
				right: () => swipeRight(title)
			}"
		>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
		<transition appear name="fade">
			<v-btn
				v-if="title == 'tasks'"
				color="flowrOrange"
				class="fab-button"
				fixed
				bottom
				right
				fab
				@click="() => {}"
			>
				<v-icon color="white">
					add
				</v-icon>
			</v-btn>
		</transition>
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
import { mapMutations, mapActions } from "vuex";

export default {
	data() {
		return {
			clipped: false,
			buildModal: false,
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
		},
		showingEvents() {
			return this.$store.state.showingEvents;
		},
		classesGenerated() {
			return this.$store.state.classEvents.length > 0;
		},
		intervalHeight: {
			get: function() {
				return this.$store.state.intervalHeight;
			},
			set: function(newHeight) {
				this.$store.commit("setIntervalHeight", newHeight);
			}
		}
	},
	mounted() {
		const bottomNav = this.$refs.bottomNav.$el;
		const navValue = bottomNav
			.querySelector("a.v-btn--active")
			.getAttribute("value");
		this.title = navValue;
		if (!this.classesGenreated) {
			this.generateAllClassEvents();
		}
	},
	methods: {
		...mapMutations([
			"toggleHidden",
			"toggleUnfold",
			"toggleCalendar",
			"generateAllClassEvents",
			"toggleMissingGrades"
		]),
		...mapActions(["scrollScheduleIntoView"]),
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
		zoomOut() {
			let val =
				this.$store.state.intervalHeight - 5 < 20
					? 20
					: this.$store.state.intervalHeight - 5;
			this.$store.commit("setIntervalHeight", val);
		},
		zoomIn() {
			let val =
				this.$store.state.intervalHeight + 5 > 100
					? 100
					: this.$store.state.intervalHeight + 5;
			this.$store.commit("setIntervalHeight", val);
		}
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

.app-wrapper {
	position: fixed;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
}

.calendar-toolbar {
	display: flex;
	align-items: center;
}

.calendar-switch {
	button {
		margin: 0;
		padding: 0;
	}
	.v-btn__content span {
		color: black;
		padding: 0px 6px;
	}
	.active-calendar {
		font-weight: 700;
		color: var(--v-flowrRed-base) !important;
	}
}

.calendar-class-menu {
	background-color: white;
	padding: 0 4px;
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

.fab-button {
	bottom: 72px;
}

/* iPhone X Series adjustments */
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	.v-bottom-nav {
		height: auto !important;
	}
	.v-item-group.v-bottom-nav .v-btn {
		padding-bottom: 28px;
	}
	.fab-button {
		bottom: 90px;
	}
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
	.v-bottom-nav {
		height: auto !important;
	}
	.v-item-group.v-bottom-nav .v-btn {
		padding-bottom: 28px;
	}
	.fab-button {
		bottom: 90px;
	}
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	.v-bottom-nav {
		height: auto !important;
	}
	.v-item-group.v-bottom-nav .v-btn {
		padding-bottom: 28px;
	}
	.fab-button {
		bottom: 90px;
	}
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
	.v-bottom-nav {
		height: auto !important;
	}
	.v-item-group.v-bottom-nav .v-btn {
		padding-bottom: 28px;
	}
	.fab-button {
		bottom: 90px;
	}
}
</style>

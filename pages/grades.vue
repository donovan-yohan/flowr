<template>
	<v-container fluid grid-list-md>
		<v-layout column>
			<v-flex v-for="c in classes" :key="c.classes_id">
				<v-dialog
					v-model="modal"
					fullscreen
					hide-overlay
					transition="slide-x-transition"
					scrollable
				>
					<template v-slot:activator="{ on }">
						<v-card v-on="on" v-ripple :color="c.colour" class="class-card">
							<v-layout row>
								<div>
									<v-card-title>
										<h1>{{ c.name + "-" + c.section }}</h1>
									</v-card-title>
									<v-card-text>
										<span class="class-time">{{
											formatTime(c.start) + " - " + formatTime(c.end)
										}}</span>
										<span>
											{{ c.end >= "12:00" ? "PM" : "AM" }}
										</span>
									</v-card-text>
									<v-card-text>
										<div class="class-day-wrapper">
											<div
												v-for="(day, i) in c.days"
												:key="i"
												:class="{ day: 'true', class: day > 0 }"
											>
												{{ daysOfWeek[i + 1] }}
											</div>
										</div>
									</v-card-text>
								</div>
								<v-spacer />
								<div class="grade-wrapper">
									<v-card-title>
										<transition name="fade" mode="out-in">
											<h1 v-if="hidden" :key="'hidden'" class="hidden">
												--%
											</h1>
											<h1 v-else :key="'unhidden'">
												{{ c.grade + "%" }}
											</h1>
										</transition>
									</v-card-title>
									<v-card-text>
										<span class="class-location">{{ c.location }}</span>
									</v-card-text>
									<v-card-text>
										<span>{{ c.professor }}</span>
									</v-card-text>
								</div>
							</v-layout>
						</v-card>
					</template>
					<fullclassmodal
						v-bind="c"
						@exit="
							modal = false;
						"
						@delete="deleteClass(c.class_id)"
					/>
				</v-dialog>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { SHORTDAYS } from "@/global/constants.js";
import fullclassmodal from "~/components/fullclassmodal.vue";

export default {
	key: to => to.fullPath,
	transition(to, from) {
		if (to.name == "grades") {
			return { name: "slide-right" };
		} else {
			return { name: "slide-left" };
		}
	},
	components: {
		fullclassmodal,
	},
	data() {
		return {
			daysOfWeek: SHORTDAYS,
			modal: false,
		};
	},
	computed: {
		events() {
			return this.$store.state.events;
		},
		classes() {
			return this.$store.state.classes;
		},
		hidden() {
			return this.$store.state.gradesHidden;
		}
	},
	methods: {
		...mapMutations(["deleteClassEvent", "deleteClass"]),
		getClassColour(id) {
			return this.$store.state.classes.find(c => c.class_id === id).colour;
		},
		formatTime(time) {
			let hour = time.substring(0, 2);
			if (time >= "13:00") hour = parseInt(hour) - 12;
			else if (hour[0] === "0") hour = hour[1];

			return hour + time.substring(2, 5);
		}
	}
};
</script>

<style lang="scss">
.grid-list-md {
	padding: 0;
}

.class-card {
	padding: 12px 0;
	border-radius: 0;

	.v-card__title {
		line-height: 1.2;
	}

	.v-card__text {
		line-height: 1.3;
	}

	.v-card__title,
	.v-card__text {
		padding: 0px 16px;
		color: white;
	}
}

.class-time,
.class-location {
	font-size: 16px;
}

.class-day-wrapper {
	display: flex;
	.day {
		margin-right: 1em;
		opacity: 0.5;
	}
	.class {
		font-weight: 700;
		opacity: 1;
	}
}

.grade-wrapper {
	display: flex;
	flex-direction: column;
	color: white;
	align-items: flex-end;
	text-align: right;
	.hidden {
		opacity: 0.5;
	}
}
</style>

<template>
	<v-container fluid grid-list-md>
		<v-layout column>
			<v-flex v-for="c in classes" :key="c.classes_id">
				<v-card :color="c.colour" class="class-card">
					<v-layout row>
						<div>
							<v-card-title>
								<h1>{{ c.name }}</h1>
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
							<h2 v-if="hidden" class="hidden">
								--%
							</h2>
							<h2 v-else>
								{{ c.grade + "%" }}
							</h2>
						</div>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { SHORTDAYS } from "@/global/constants.js";

export default {
	transition: "fade",
	data() {
		return {
			daysOfWeek: SHORTDAYS
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

.class-time {
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
	display: inline-flex;
	color: white;
	padding: 16px;
	align-items: center;
	font-size: 16px;
	h2 {
		transition: 1.2s;
	}
	.hidden {
		opacity: 0.5;
	}
}
</style>

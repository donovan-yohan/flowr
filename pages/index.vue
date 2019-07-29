<template>
	<v-layout column class="page">
		<div v-for="(week, i) in eventsMap" :key="i">
			<h2
				v-if="week.length > 0"
				:class="{
					weekheader: true,
					longheader: i > 1
				}"
			>
				{{ getWeekString(i) }}
			</h2>
			<template>
				<v-layout v-for="e in eventsMap[i]" :key="e.event_id" row>
					<div v-ripple class="task-wrapper" @click="() => {}">
						<div class="task-folded">
							<div class="task-info">
								<v-btn icon class="task-checkbox">
									<v-icon color="gray">
										check_circle_outline
									</v-icon>
								</v-btn>
								<span
									:style="{
										maxWidth:
											'calc(100vw - 32px - 30px - 80px' + e.weight / 1.25 + ')'
									}"
									class="task-title"
								>
									{{ e.title }}
								</span>
								<span
									:style="{
										color: 'var(--v-' + getClassColour(e.class_id) + '-base)'
									}"
									class="task-weight"
								>{{ e.weight + "%" }}</span>
								<div
									:style="{
										width: e.weight / 1.25 + 'px',
										backgroundColor:
											'var(--v-' + getClassColour(e.class_id) + '-base)'
									}"
									class="task-weight-bar"
								/>
							</div>

							<div class="task-class-info">
								<span v-if="!unfolded" class="task-class-date">
									{{ `${getDayString(e.date, i)}` }}
								</span>
								<div
									:style="{
										backgroundColor:
											'var(--v-' + getClassColour(e.class_id) + '-base)'
									}"
									class="task-class-wrapper"
								>
									<span v-if="unfolded" class="task-class-name">{{
										getClassName(e.class_id)
									}}</span>
								</div>
							</div>
						</div>
						<div v-if="unfolded" class="task-unfolded">
							<div class="task-detail">
								<div class="task-detail-date">
									{{ getDetailDayString(e.date) }}
								</div>
								<div class="task-detail-time">
									{{ `${getTimeString(e.time, e.duration)}` }}
								</div>
							</div>
							<v-spacer />
							<div v-if="unfolded" class="task-location">
								{{ e.location }}
							</div>
						</div>
					</div>
				</v-layout>
			</template>
		</div>
	</v-layout>
</template>

<script>
import { mapMutations } from "vuex";
import { MONTHS, DAYSOFWEEK, SHORTMONTHS } from "@/global/constants.js";
import * as helpers from "@/global/mixins.js";

export default {
	key: to => to.fullPath,
	transition(to, from) {
		if (to.name == "calendar" || (from && from.name == "grades")) {
			return { name: "slide-left" };
		} else {
			return { name: "slide-right" };
		}
	},
	data() {
		return {
			startMonday: false,
			remainingDays: 0
		};
	},
	computed: {
		events() {
			return this.$store.state.events;
		},
		eventsMap() {
			let weekArray = this.$store.state.events.reduce((r, e, i, a) => {
				// find week e belongs in as an index
				const eventDate = new Date(`${e.date} ${e.time}`);
				const today = new Date();

				if (eventDate > today) {
					let weekIndex = this.weeksFromToday(today, eventDate);

					// make length of array match number of weeks
					if (r.length < weekIndex + 1) {
						while (r.length < weekIndex + 1) {
							r.push([]);
						}
					}

					r[weekIndex].push(e);
				}
				return r;
			}, []);
			weekArray.forEach(week => {
				// sort by date and time
				week.sort((a, b) => {
					if (a.date < b.date) return -1;
					else if (a.date > b.date) return 1;
					else {
						if (a.time < b.time) return -1;
						else if (a.time > b.time) return 1;
						else return 0;
					}
				});
			});
			return weekArray;
		},
		unfolded() {
			return this.$store.state.unfolded;
		}
	},
	methods: {
		getDayString(dateString, week) {
			const date = new Date(`${dateString} ${"00:00"}`);
			const today = new Date();
			const weekday = DAYSOFWEEK[date.getDay()];
			const month = SHORTMONTHS[date.getMonth()];
			const day = date.getDate();

			if (
				today.getDate() == date.getDate() &&
				today.getMonth() == date.getMonth()
			)
				return "Today";
			else if (
				today.getDate() + 1 == date.getDate() &&
				today.getMonth() == date.getMonth()
			)
				return "Tomorrow";
			else if (week == 0 || week == 1) {
				let oneWeekFromToday = new Date();
				oneWeekFromToday = oneWeekFromToday.setDate(
					oneWeekFromToday.getDate() + 7
				);

				if (date.getDate() <= oneWeekFromToday.getDate()) {
					return `${weekday}`;
				}
			} else {
				return `${month} ${day}`;
			}
		},
		getWeekString: helpers.getWeekString,
		parseEndTime(time, duration) {
			let t = new Date(`01-01-01 ${time}`);
			t.setMinutes(t.getMinutes() + duration);
			let hours = t.getHours();
			if (hours < 10) hours = `0${hours}`;
			return `${hours}:${t.getMinutes()}`;
		},
		getTimeString(time, duration) {
			let endTime = this.parseEndTime(time, duration);
			let end = this.formatTime(endTime);
			let start = this.formatTime(time);

			return `${start} - ${end} ${endTime >= "12:00" ? "PM" : "AM"}`;
		},
		getDetailDayString(dateString) {
			const today = new Date();
			const date = new Date(`${dateString} ${"00:00"}`);
			let weekday = DAYSOFWEEK[date.getDay()];
			const month = SHORTMONTHS[date.getMonth()];
			const day = date.getDate();

			if (
				today.getDate() == date.getDate() &&
				today.getMonth() == date.getMonth()
			)
				weekday = "Today";
			else if (
				today.getDate() + 1 == date.getDate() &&
				today.getMonth() == date.getMonth()
			)
				weekday = "Tomorrow";

			return `${weekday}, ${month} ${day}`;
		},
		getClassName(id) {
			return this.$store.state.classes.find(c => c.class_id == id).name;
		},
		getClassColour(id) {
			return this.$store.state.classes.find(c => c.class_id == id).colour;
		},
		getWeekNumber: helpers.getWeekNumber,
		weeksFromToday: helpers.weeksFromToday,
		formatTime(time) {
			let hour = time.substring(0, 2);
			if (time >= "12:00") hour = parseInt(hour) - 12;
			else if (hour[0] === "0") hour = hour[1];

			return hour + time.substring(2, 5);
		}
	}
};
</script>

<style lang="scss">
.page {
	margin-bottom: 64px;
	margin-top: -16px;
}

.weekheader {
	font-size: 21px;
	padding-top: 16px;
	&.longheader {
		font-size: 18px;
	}
}

.task-wrapper {
	display: inline-flex;
	flex-direction: column;
	width: 100%;
	padding: 4px 0;
	border-bottom: 1px solid var(--v-gray-base);
	height: auto;

	.task-info {
		display: inline-flex;
		align-items: center;
		.task-checkbox {
			margin: 0 0 0 -0.5em;
			z-index: 1;
		}
		.task-title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.task-weight {
			font-weight: 700;
			font-size: 12px;
			margin-left: 6px;
			margin-right: 3px;
		}
		.task-weight-bar {
			height: 0.8em;
		}
	}
	.task-detail {
		font-size: 12px;
	}
	.task-class-info {
		display: inline-flex;
		align-items: center;
		.task-class-date {
			font-size: 12px;
		}
		.task-class-wrapper {
			height: 1em;
			min-width: 1em;
			display: flex;
			align-items: center;
			border-radius: 10px;
			margin-left: 4px;
			padding: 0px 6px;
			.task-class-name {
				font-weight: 700;
				font-size: 11px;
				color: white;
			}
		}
	}
	.task-location {
		font-size: 12px;
	}

	.task-unfolded {
		display: flex;
		margin-left: calc(36px - 0.5em);
		margin-top: -4px;
	}

	.task-folded {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>

<template>
	<v-layout column>
		<transition name="fade" mode="out-in">
			<div v-if="showingEvents" :key="0">
				<div class="calendar-header">
					<h1 id="header" :key="month">
						{{ month }}
					</h1>
					<v-spacer />
					<v-btn icon @click="$refs.calendar.prev()">
						<v-icon color="gray">
							chevron_left
						</v-icon>
					</v-btn>
					<v-btn icon @click="$refs.calendar.next()">
						<v-icon color="gray">
							chevron_right
						</v-icon>
					</v-btn>
				</div>
				<v-flex text-xs-center class="calendar-wrapper">
					<v-calendar
						id="month-calendar"
						:key="10"
						ref="calendar"
						v-model="start"
						type="month"
						color="flowrRed"
						:show-month-on-first="false"
						:weekday-format="
							vTimestamp => {
								return this.$options.shortdays[vTimestamp.weekday];
							}
						"
						@change="updateMonth($event)"
					>
						<template v-slot:day="{ date, past }">
							<template v-if="eventsMap[date]">
								<div class="weight-wrapper">
									<div
										v-for="event in eventsMap[date]"
										:key="event.event_id"
										:style="{
											height: event.weight + '%',
											background:
												'var(--v-' + getClassColour(event.class_id) + '-base)'
										}"
										:class="{ calendarWeight: 'true', faded: past }"
									/>
								</div>
							</template>
						</template>
					</v-calendar>
				</v-flex>
				<v-flex>
					<h2 :key="day" class="day-header">
						{{ day }}
					</h2>
				</v-flex>
				<v-flex id="scheduleWrapper" text-xs-center class="schedule-wrapper">
					<v-calendar
						id="schedule"
						ref="schedule"
						v-model="start"
						type="day"
						:hide-header="true"
						@change="
							updateDay($event);
							scrollScheduleIntoView(
								new Date($event.start.date + ' 00:00'),
								eventsMap
							);
						"
					>
						<template
							v-slot:dayBody="{ date, timeToY, minutesToPixels, present, past }"
						>
							<template v-for="event in eventsMap[date]">
								<div
									v-if="event.duration"
									:key="event.event_id"
									:style="{
										top: timeToY(event.time) + 'px',
										height: minutesToPixels(event.duration) + 'px',
										border:
											'2px solid ' +
											'var(--v-' +
											getClassColour(event.class_id) +
											'-base)'
									}"
									class="schedule-event with-time"
									@click="open(event)"
								>
									<div
										class="schedule-event--details"
										:style="{
											backgroundColor:
												'var(--v-' + getClassColour(event.class_id) + '-base)',
											width: event.weight + '%',
											height: minutesToPixels(event.duration) - 3 + 'px'
										}"
									>
										<div class="schedule-event--details__text-wrapper">
											<div class="schedule-event--details__left">
												<span class="schedule-event--details__title">{{
													event.title
												}}</span>
												<span class="schedule-event--details__time">{{
													event.time
												}}</span>
											</div>
											<span class="schedule-event--details__weight">{{
												event.weight + "%"
											}}</span>
										</div>
									</div>
								</div>
							</template>
							<template v-if="present">
								<div
									class="current-time past-time"
									:style="{
										height: minutesToPixels(getCurrentMinutes(date)) + 'px'
									}"
								/>
								<div
									id="currentTime"
									class="current-time"
									:style="{
										borderBottom: '2px solid var(--v-flowrRed-base)',
										top: minutesToPixels(getCurrentMinutes(date)) + 'px'
									}"
								/>
							</template>
							<template v-if="past">
								<div
									class="current-time past-time"
									:style="{
										height: '100%'
									}"
								/>
							</template>
						</template>
					</v-calendar>
				</v-flex>
			</div>
			<div v-else :key="1">
				<div class="calendar-header">
					<h1 class="week-header">
						{{ weekHeader }}
					</h1>
					<v-spacer />
					<v-btn icon @click="changeWeek(-1)">
						<v-icon color="gray">
							chevron_left
						</v-icon>
					</v-btn>
					<v-btn icon @click="changeWeek(1)">
						<v-icon color="gray">
							chevron_right
						</v-icon>
					</v-btn>
				</div>
				<div>
					<v-calendar
						id="classes"
						ref="classes"
						v-model="start"
						:start="start"
						:end="end"
						:type="'custom-daily'"
						:weekdays="[1, 2, 3, 4, 5]"
						:weekday-format="
							vTimestamp => {
								return this.$options.shortdays[vTimestamp.weekday];
							}
						"
						:max-days="5"
						@change="updateWeek($event.start.date)"
					>
						<template v-slot:day-body="{ date }">
							<template v-for="event in eventsMap[date]">
								<div
									v-if="event.duration"
									:key="event.event_id"
									:style="{
										top: timeToY(event.time) + 'px',
										height: minutesToPixels(event.duration) + 'px',
										border:
											'2px solid ' +
											'var(--v-' +
											getClassColour(event.class_id) +
											'-base)'
									}"
									class="schedule-event with-time"
									@click="open(event)"
								>
									<div
										class="schedule-event--details"
										:style="{
											backgroundColor:
												'var(--v-' + getClassColour(event.class_id) + '-base)',
											width: event.weight + '%',
											height: minutesToPixels(event.duration) - 3 + 'px'
										}"
									>
										<div class="schedule-event--details__text-wrapper">
											<div class="schedule-event--details__left">
												<span class="schedule-event--details__title">{{
													event.title
												}}</span>
												<span class="schedule-event--details__time">{{
													event.time
												}}</span>
											</div>
											<span class="schedule-event--details__weight">{{
												event.weight + "%"
											}}</span>
										</div>
									</div>
								</div>
							</template>
						</template>
					</v-calendar>
				</div>
			</div>
		</transition>
	</v-layout>
</template>

<script>
import { MONTHS, SHORTDAYS, DAYSOFWEEK } from "@/global/constants.js";
import { mapMutations, mapActions } from "vuex";
import * as helpers from "@/global/mixins.js";

export default {
	key: to => to.fullPath,
	transition(to, from) {
		if (to.name == "calendar") {
			return { name: "slide-left" };
		} else {
			return { name: "slide-right" };
		}
	},
	shortdays: SHORTDAYS,
	data() {
		let startString = this.dateToString(new Date());
		let currentMonth = MONTHS[new Date().getMonth()];
		let currentDay =
			DAYSOFWEEK[new Date().getDay()] +
			", " +
			currentMonth +
			" " +
			new Date().getDate();
		return {
			type: "month",
			month: currentMonth,
			day: currentDay,
			start: startString,
			end: "2050-01-01",
			weekHeader: "This Week"
		};
	},
	computed: {
		events() {
			return this.$store.state.events;
		},
		classes() {
			return this.$store.state.classes;
		},
		eventsMap() {
			const map = {};
			this.$store.state.events.forEach(e =>
				(map[e.date] = map[e.date] || []).push(e)
			);
			return map;
		},
		showingEvents() {
			return this.$store.state.showingEvents;
		}
	},
	watch: {
		showingEvents(newValue) {
			if (newValue == false) {
				this.updateWeek(this.start);
			}
		}
	},
	mounted() {
		// scroll schedule view to show current time
		if (this.showingEvents) {
			this.scrollScheduleIntoView(new Date(), this.eventsMap);
		}
		this.updateWeek(this.start);
	},
	methods: {
		scrollScheduleIntoView: helpers.scrollScheduleIntoView,
		updateMonth(e) {
			this.month = MONTHS[e.start.month - 1];
		},
		updateDay(e) {
			this.day =
				DAYSOFWEEK[e.start.weekday] +
				", " +
				MONTHS[e.start.month - 1] +
				" " +
				e.start.day;
			this.currentDay = new Date(
				`${MONTHS[e.start.month - 1]} ${e.start.day} ${e.start.year}`
			);
		},
		updateWeek(dateString) {
			let weeksFromToday = this.weeksFromToday(
				new Date(),
				new Date(dateString + " 00:00")
			);
			this.weekHeader = this.getWeekString(weeksFromToday, true);

			let date = new Date(this.start + " 00:00");
			date.setDate(date.getDate() + (1 - date.getDay()));
			this.start = this.dateToString(date);
		},
		getClassColour(id) {
			return this.$store.state.classes.find(c => c.class_id == id).colour;
		},
		getCurrentMinutes(date) {
			return (
				(new Date().getTime() - new Date(date).getTime()) / (1000 * 60) -
				new Date().getTimezoneOffset()
			);
		},
		open(event) {
			alert(event.title);
		},
		getWeekString: helpers.getWeekString,
		weeksFromToday: helpers.weeksFromToday,
		dateToString: helpers.dateToString,
		changeWeek(direction) {
			let date = new Date(this.start + " 00:00");

			if (direction < 0) {
				date.setDate(date.getDate() - 7);
			} else {
				date.setDate(date.getDate() + 7);
			}

			this.start = this.dateToString(date);
		}
	}
};
</script>

<style lang="scss">
.v-content {
	background: white;
}

.calendar-header {
	display: flex;
	align-items: center;
	padding-bottom: 8px;
	button {
		margin: 0;
	}
}
.calendar-wrapper {
	padding-bottom: 16px;
}

#month-calendar {
	.v-calendar-weekly__head-weekday {
		border: none;
		font-weight: 700;
	}
	.v-calendar-weekly__day {
		border: none;
		padding: 0;
		display: inline-flex;
		min-width: calc((100vw - 32px) / 7);
		min-height: calc((100vw - 32px) / 7);
		justify-content: center;
		align-items: center;
	}

	.v-calendar-weekly__day-label {
		position: static;
		line-height: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 4vw;
		z-index: 1;
	}

	.v-present .v-calendar-weekly__day-label {
		border-radius: 10vw;
		border-width: 3px;
	}
	.primary--text {
		color: black !important;
	}
	.v-past {
		color: var(--v-gray-base);
	}
}

.weight-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column-reverse;
}

.calendarWeight {
	width: 100%;
	z-index: 0;
	&.faded {
		opacity: 0.33;
	}
}

.day-header {
	padding-bottom: 8px;
}

.schedule-wrapper {
	// total height - toolbar - footer - margin - header
	max-height: calc(100vh - 56px - 56px - 32px - 39px);
	overflow-y: scroll;
}

#schedule,
#classes {
	margin-left: -8px;
}

.schedule-event {
	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: white;

	font-size: 14px;
	cursor: pointer;
	margin-bottom: 1px;
	left: 0px;
	margin-right: 8px;
	position: relative;

	&.with-time {
		position: absolute;
		right: 8px;
		margin-right: 0px;
	}
	.schedule-event--details {
		padding: 0 4px;
		color: black;
		min-height: fit-content;
		overflow: visible;

		.schedule-event--details__text-wrapper {
			position: absolute;
			width: 96%;
			display: flex;
			justify-content: space-between;
			.schedule-event--details__left {
				display: flex;
				flex-direction: column;
			}
			.schedule-event--details__title {
				font-weight: 700;
			}
			.schedule-event--details__weight {
				text-align: right;
				font-weight: 700;
				font-size: 18px;
			}
		}
	}
}

.current-time {
	position: absolute;
	width: 100%;
	&.past-time {
		background-color: var(--v-gray-base);
		opacity: 0.33;
		top: 0;
		pointer-events: none;
	}
}

.week-header {
	font-size: 18px;
}

#classes {
	.v-calendar-daily_head-day {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: auto;
		.v-calendar-daily_head-weekday {
			font-weight: 700;
			padding: 0;
		}
		.v-calendar-daily_head-day-label {
			height: auto;
			font-size: 12px;
			line-height: 1.5;
			padding: 0;
		}
	}
}
</style>

<!-- Functionality for the calendar view of flowr -->
<template>
	<v-layout column>
		<transition name="fade" mode="out-in">
			<!-- Key 0 is for viewing the calendar in a monthly persepctive -->
			<div v-if="showingEvents" :key="0">
				<div class="calendar-header">
					<h1 id="header" :key="month">
						{{ month }}
					</h1>
					<v-spacer />
					<!-- See the previous month's schedule -->
					<v-btn icon @click="$refs.calendar.prev()">
						<v-icon color="gray">
							chevron_left
						</v-icon>
					</v-btn>
					<!-- See the next month's schedule -->
					<v-btn icon @click="$refs.calendar.next()">
						<v-icon color="gray">
							chevron_right
						</v-icon>
					</v-btn>
				</div>
				<!-- Formatting for the calendar -->
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
									<!-- Ensure events are added to the proper dates -->
									<div
										v-for="event in eventsMap[date]"
										:key="event.event_id"
										:style="{
											height: event.weight + '%',
											/* Style the calendar events by the colour of their class that they belong to
											Fade if the event has already passed */
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
<!-- if key is 1, then we move to a weekly calendar view -->
			<div v-else :key="1">
				<div class="calendar-header">
					<h1 class="week-header">
						{{ weekHeader }}
					</h1>
					<v-spacer />
					<!-- move back a week -->
					<v-btn icon @click="changeWeek(-1)">
						<v-icon color="gray">
							chevron_left
						</v-icon>
					</v-btn>
					<!-- move forward a week -->
					<v-btn icon @click="changeWeek(1)">
						<v-icon color="gray">
							chevron_right
						</v-icon>
					</v-btn>
				</div>
				<!-- formatting/data for week view of classes -->
				<div>
					<v-calendar
						id="classes"
						ref="classes"
						v-model="start"
						:start="start"
						:end="end"
						:type="'custom-daily'"
						:first-interval="firstInterval"
						:interval-count="24 - firstInterval"
						:interval-height="intervalHeight"
						:weekdays="[1, 2, 3, 4, 5]"
						:weekday-format="
							vTimestamp => {
								return this.$options.shortdays[vTimestamp.weekday];
							}
						"
						:max-days="5"
						class="classes-wrapper"
						@change="updateWeek($event.start.date)"
					>
						<template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
							<template v-for="event in classMap[date]">
								<!-- format the size of the event based on its given duration, and format colour based on the class it belongs to -->
								<div
									:key="event.event_id"
									:style="{
										top: timeToY(event.time) + 'px',
										height: minutesToPixels(event.duration) + 'px',
										backgroundColor:
											'var(--v-' + getClassColour(event.class_id) + '-base)'
									}"
									class="class-event with-time"
									@click="open(event)"
								>
								<!-- information on a specific event: time, location, details -->
									<div class="class-event--details">
										<span class="class-event--details__title">{{
											event.title + "-" + event.section
										}}</span>
										<span class="class-event--details__time">{{
											getTimeString(event.time, event.duration)
										}}</span>
										<span class="class-event--details__location">{{
											event.location
										}}</span>
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
//transitions from different tabs within flowr
	transition(to, from) {
		if (to.name == "calendar") {
			return { name: "slide-left" };
		} else {
			return { name: "slide-right" };
		}
	},
	shortdays: SHORTDAYS,
	data() {
		//get current date, month, etc to instantiate calendar
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
			weekHeader: "This Week",
			firstInterval: 24
		};
	},
	//Access global states for events, classes, and heights of events
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
		classMap() {
			const map = {};
			this.$store.state.classEvents.forEach(e => {
				(map[e.date] = map[e.date] || []).push(e);
			});
			return map;
		},
		showingEvents() {
			return this.$store.state.showingEvents;
		},
		intervalHeight() {
			return this.$store.state.intervalHeight;
		}
	},
	watch: {
		// check if you need to show events or not
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
		// updates the month when navigating between months
		updateMonth(e) {
			this.month = MONTHS[e.start.month - 1];
		},
		// updates the day when navigating between days
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
		// updates the week when navigating between weeks
		updateWeek(dateString) {
			let weeksFromToday = this.weeksFromToday(
				new Date(),
				new Date(dateString + " 00:00")
			);
			this.weekHeader = this.getWeekString(weeksFromToday, true);

			//start of the week is the monday
			let date = new Date(this.start + " 00:00");
			date.setDate(date.getDate() + (1 - date.getDay()));
			this.start = this.dateToString(date);

			// for our purposes, end of week is a friday
			let endOfWeek = new Date(+date);
			endOfWeek.setDate(endOfWeek.getDate() + 4);
			endOfWeek = this.dateToString(endOfWeek);

			this.firstInterval = 24;

			while (this.dateToString(date) != endOfWeek) {
				if (this.classMap[this.dateToString(date)]) {
					this.classMap[this.dateToString(date)].forEach(e => {
						// view for the day in the week is based on when the first event occurs that day
						if (e.time.substring(0, 2) < this.firstInterval)
							this.firstInterval = e.time.substring(0, 2);
					});
				}
				date.setDate(date.getDate() + 1);
			}
			this.firstInterval -= 1;
			// if the first event is near the end of the day, or if no events are present, we set the screen to start at 9am
			if (this.firstInterval > 20) {
				this.firstInterval = 9;
			}
		},
		// gets the colour based on the class the event belongs to
		getClassColour(id) {
			return this.$store.state.classes.find(c => c.class_id == id).colour;
		},
		// gets the current time, taking into account your timezone
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
			//decrements or increments the days by 7, depending on which way you progress through weeks
			if (direction < 0) {
				date.setDate(date.getDate() - 7);
			} else {
				date.setDate(date.getDate() + 7);
			}

			this.start = this.dateToString(date);
		},
		getTimeString: helpers.getTimeString
	}
};
</script>

<!-- CSS Styling -->
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
.classes-wrapper {
	// total height - toolbar - footer - margin - header
	max-height: calc(100vh - 56px - 56px - 45px - 39px);
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
	.class-event {
		max-width: 100%;
		overflow: hidden;
		text-align: left;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: white;
		font-size: 12px;
		cursor: pointer;
		left: 0px;
		position: absolute;
		.class-event--details {
			display: flex;
			flex-direction: column;
			padding: 3px;
			line-height: 1.1;
			.class-event--details__title {
				font-weight: 700;
				font-size: 13px;
				margin-bottom: 2px;
			}
		}
	}
}
</style>

<template>
	<v-layout column>
		<transition name="fade" mode="out-in">
			<div v-if="showingEvents" :key="0">
				<div class="calendar-header">
					<h1 id="header" :key="month">
						{{ month }}
					</h1>
					<v-spacer />
					<v-btn icon @click="start = dateToString(new Date())">
						<v-icon color="gray">
							today
						</v-icon>
					</v-btn>
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
										v-for="event in eventsMap[date].sort((a, b) => {
											if (a.time < b.time) return -1;
											else if (a.time > b.time) return 1;
											else return 0;
										})"
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
											'-base)',
										/* im sorry */
										background:
											'linear-gradient(90deg, ' +
											'var(--v-' +
											getClassColour(event.class_id) +
											'-base)' +
											' ' +
											(event.weight / 2 + 50) +
											'%,' +
											' white 0%)'
									}"
									class="schedule-event with-time"
								>
									<div
										class="schedule-event--details__left"
										:style="{
											height: minutesToPixels(event.duration) - 8 + 'px',
											width: event.weight / 2 + 50 + '%'
										}"
									>
										<span class="schedule-event--details__title">
											{{ event.title }}
										</span>
										<span class="schedule-event--details__time">
											{{ event.time }}
										</span>
									</div>
									<div>
										<span class="schedule-event--details__weight">
											{{ event.weight + "%" }}
										</span>
									</div>
								</div>
								<div
									v-else
									:key="event.event_id"
									:style="{
										top: timeToY(event.time) + 'px',
										borderTop:
											'2px solid ' +
											'var(--v-' +
											getClassColour(event.class_id) +
											'-base)',
										/* im sorry */
										background:
											'linear-gradient(90deg, ' +
											'var(--v-' +
											getClassColour(event.class_id) +
											'-base)' +
											' ' +
											(event.weight / 2 + 50) +
											'%,' +
											' white 0%)'
									}"
									class="schedule-event"
								>
									<div
										class="schedule-event--details__left"
										:style="{
											width: event.weight / 2 + 50 + '%'
										}"
									>
										<span class="schedule-event--details__title">
											{{ event.title }}
										</span>
										<span class="schedule-event--details__time">
											{{ event.time }}
										</span>
									</div>
									<div>
										<span class="schedule-event--details__weight">
											{{ event.weight + "%" }}
										</span>
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
					<v-btn icon @click="start = dateToString(new Date())">
						<v-icon color="gray">
							today
						</v-icon>
					</v-btn>
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
						<template
							v-slot:dayBody="{ date, timeToY, minutesToPixels, present, past }"
						>
							<template v-for="event in classMap[date]">
								<v-menu
									:key="event.event_id"
									full-width
									offset-x
									transition="slide-y-transition"
									max-height="275px"
								>
									<template v-slot:activator="{ on }">
										<div
											v-ripple
											:style="{
												top: timeToY(event.time) + 'px',
												height: minutesToPixels(event.duration) + 'px',
												backgroundColor:
													'var(--v-' + getClassColour(event.class_id) + '-base)'
											}"
											class="class-event with-time"
											v-on="on"
										>
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
									<preview
										:id="event.event_id"
										scrollable
										:colour="getClassColour(event.class_id)"
										:title="event.title + '-' + event.section"
										:date="getDetailDayString(event.date)"
										:time="getTimeString(event.time, event.duration)"
										:location="event.location"
										:checklist="event.checklist"
										:details="event.details"
										:weight="event.weight"
										@delete="deleteClassEvent(event.event_id)"
									/>
								</v-menu>
							</template>
							<template v-if="present">
								<div
									class="current-time past-time"
									:style="{
										height:
											minutesToPixels(
												getCurrentMinutes(date) - firstInterval * 60
											) + 'px'
									}"
								/>
								<div
									class="current-time"
									:style="{
										borderBottom: '2px solid var(--v-flowrRed-base)',
										top:
											minutesToPixels(
												getCurrentMinutes(date) - firstInterval * 60
											) + 'px'
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
				</div>
			</div>
		</transition>
	</v-layout>
</template>

<script>
import { MONTHS, SHORTDAYS, DAYSOFWEEK } from "@/global/constants.js";
import { mapMutations, mapActions } from "vuex";
import * as helpers from "@/global/mixins.js";
import preview from "~/components/preview.vue";

export default {
	key: to => to.fullPath,
	transition(to, from) {
		if (to.name == "calendar") {
			return { name: "slide-left" };
		} else {
			return { name: "slide-right" };
		}
	},
	components: {
		preview
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
			weekHeader: "This Week",
			firstInterval: 24
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
			this.$store.state.events.forEach(e => {
				if (e.weight) {
					(map[e.date] = map[e.date] || []).push(e);
				}
			});
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
		...mapMutations(["deleteClassEvent", "deleteClass"]),
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

			let endOfWeek = new Date(+date);
			endOfWeek.setDate(endOfWeek.getDate() + 4);
			endOfWeek = this.dateToString(endOfWeek);

			this.firstInterval = 24;
			while (this.dateToString(date) != endOfWeek) {
				if (this.classMap[this.dateToString(date)]) {
					this.classMap[this.dateToString(date)].forEach(e => {
						if (e.time.substring(0, 2) < this.firstInterval)
							this.firstInterval = e.time.substring(0, 2);
					});
				}
				date.setDate(date.getDate() + 1);
			}
			this.firstInterval -= 1;

			if (this.firstInterval > 20) {
				this.firstInterval = 9;
			}
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
		getDetailDayString: helpers.getDetailDayString,
		changeWeek(direction) {
			let date = new Date(this.start + " 00:00");

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
	position: absolute;
	right: 0;
	margin-right: 0px;
	overflow: hidden;
	display: flex;
	justify-content: space-between;
	text-align: left;
	align-items: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: white;

	font-size: 14px;
	cursor: pointer;
	margin-bottom: 1px;
	left: 0px;

	&.with-time {
		background: white;
	}
	.schedule-event--details__left {
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		align-content: flex-start;
		overflow: hidden;
		min-width: 0;
	}
	.schedule-event--details__title {
		font-weight: 700;
		padding: 0 4px;
	}
	.schedule-event--details__time {
		padding: 0 4px;
	}
	.schedule-event--details__weight {
		padding: 0 4px;
		color: black;
		text-align: right;
		font-weight: 700;
		font-size: 18px;
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

<template>
	<v-layout column>
		<v-flex>
			<h1 id="header">
				{{ month }}
			</h1>
		</v-flex>
		<v-flex text-xs-center class="calendar-wrapper">
			<v-calendar
				id="month-calendar"
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
			<h2 class="day-header">
				{{ day }}
			</h2>
		</v-flex>
		<v-flex text-xs-center>
			<v-calendar
				id="schedule"
				ref="schedule"
				v-model="start"
				type="day"
				:hide-header="true"
				@change="updateDay($event)"
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
	</v-layout>
</template>

<script>
import { MONTHS, SHORTDAYS, DAYSOFWEEK } from "@/global/constants.js";
import { mapMutations } from "vuex";

export default {
	key: to => to.fullPath,
	transition(to, from) {
		console.log(to);
		console.log(from);
		if (to.name == "calendar") {
			return { name: "slide-left" };
		} else {
			return { name: "slide-right" };
		}
	},
	shortdays: SHORTDAYS,
	data() {
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
			start: new Date().toString()
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
		}
	},
	methods: {
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
		}
	}
};
</script>

<style lang="scss">
.v-content {
	background: white;
}

#header {
	padding-bottom: 8px;
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

.calendar-event {
}

.day-header {
	padding-bottom: 8px;
}

#schedule {
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
</style>

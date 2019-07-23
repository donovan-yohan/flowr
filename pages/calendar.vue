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
				color="red"
				:show-month-on-first="false"
				:weekday-format="
					vTimestamp => {
						return this.$options.shortdays[vTimestamp.weekday];
					}
				"
				@change="updateMonth($event)"
			>
				<template v-slot:day="{ date, future, present }">
					<template v-if="eventsMap[date] && (future || present)">
						<div class="weight-wrapper">
							<div
								v-for="event in eventsMap[date]"
								:key="event.event_id"
								:style="{
									height: event.weight + '%',
									background:
										'var(--v-' + getClassColour(event.class_id) + '-base)'
								}"
								class="calendar-weight"
							/>
						</div>
					</template>
				</template>
			</v-calendar>
		</v-flex>
		<v-flex>
			<h2>{{ day }}</h2>
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
				<template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
					<template v-for="event in eventsMap[date]">
						<!-- timed events -->
						<div
							v-if="event.time"
							:key="event.title"
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
							v-html="event.title"
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
			console.log(map);
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
			return this.$store.state.classes.find(c => c.class_id === id).colour;
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
		color: #bfbfbf;
	}
}

.weight-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column-reverse;
}

.calendar-weight {
	width: 100%;
	z-index: 0;
}

.calendar-event {
}

.schedule-event {
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: white;

	font-size: 12px;
	padding: 3px;
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
}
</style>

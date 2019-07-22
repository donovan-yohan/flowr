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
				:show-month-on-first="false"
				:weekday-format="
					vTimestamp => {
						return this.$options.shortdays[vTimestamp.weekday];
					}
				"
				@change="updateMonth($event)"
			/>
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
			/>
		</v-flex>
	</v-layout>
</template>
<script>
import { MONTHS, SHORTDAYS, DAYSOFWEEK } from "@/global/constants.js";
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
	}

	.v-present .v-calendar-weekly__day-label {
		border-radius: 4vw;
		border-color: var(--v-secondary);
	}
	.primary--text {
		color: black !important;
	}
	.v-past {
		color: #bfbfbf;
	}
}
</style>

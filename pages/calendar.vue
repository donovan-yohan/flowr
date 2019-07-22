<template>
	<v-layout column>
		<v-flex>
			<h1 id="header">
				{{ month }}
			</h1>
		</v-flex>
		<v-flex text-xs-center>
			<v-calendar
				id="month-calendar"
				ref="calendar"
				v-model="start"
				type="month"
				color="primary"
				:show-month-on-first="false"
				:weekday-format="
					vTimestamp => {
						return this.$options.shortdays[vTimestamp.weekday];
					}
				"
				@change="updateMonth($event)"
			/>
		</v-flex>
	</v-layout>
</template>
<script>
import { MONTHS, SHORTDAYS } from "@/global/constants.js";
export default {
	shortdays: SHORTDAYS,
	data() {
		let currentMonth = MONTHS[new Date().getMonth()];
		return {
			type: "month",
			month: currentMonth,
			start: new Date().toString()
		};
	},
	methods: {
		updateMonth(e) {
			this.month = MONTHS[e.start.month - 1];
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
	}
	.v-past {
		color: #ececec;
	}
}
</style>

<template>
	<v-layout>
		<v-flex>
			<h1>{{ month }}</h1>
		</v-flex>
		<v-flex text-xs-center>
			<v-calendar
				id="month-calendar"
				ref="calendar"
				:type="type"
				color="primary"
				:show-month-on-first="false"
				:weekday-format="
					vTimestamp => {
						days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
						return days[vTimestamp.weekday];
					}
				"
			/>
		</v-flex>
	</v-layout>
</template>
<script>
import { MONTHS } from "@/global/constants.js";
export default {
	data() {
		let currentMonth = MONTHS[new Date().getMonth()];
		return {
			type: "month",
			month: currentMonth
		};
	}
};
</script>
<style lang="scss">
.v-content {
	background: white;
}
#month-calendar {
	.v-calendar-weekly__head-weekday {
		border: none;
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

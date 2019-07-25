<template>
	<v-layout column>
		<div v-for="(date, i) in nextMonth" :key="i">
			<h2
				v-if="
					(i == 0 ||
						(startMonday
							? date.date.getDay() === 1
							: date.date.getDay() === 0)) &&
						weekHasEvents(i)
				"
				:class="{ weekheader: true, longheader: i > remainingDays + 6 }"
			>
				{{
					i &lt; remainingDays
						? "This Week"
						: i &lt; remainingDays + 7
							? "Next Week"
							: getWeekString(date.date)
				}}
			</h2>
			<div v-if="eventsMap[date.stringDate]">
				<p>
					{{ eventsMap[date.stringDate] }}
				</p>
			</div>
		</div>
		<v-btn
			color="flowrOrange"
			style="margin-bottom: 2.5em"
			absolute
			bottom
			right
			fab
			@click="testEventMap()"
		>
			<v-icon color="white">
				add
			</v-icon>
		</v-btn>
	</v-layout>
</template>

<script>
import { mapMutations } from "vuex";
import { MONTHS, DAYSOFWEEK } from "@/global/constants.js";

export default {
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
		nextMonth() {
			let currentDay = new Date().getDay();
			let remainingDays = 0;
			let days = [];

			if (this.startMonday) {
				if (currentDay > 1) remainingDays = 8 - currentDay;
				else if (currentDay < 1) remainingDays = 1;
			} else {
				if (currentDay > 0) remainingDays = 7 - currentDay;
			}

			for (let i = 0; i < remainingDays + 28; i++) {
				let date = new Date();
				date.setDate(date.getDate() + i);

				let day = date.getDate() + "";
				if (day.length === 1) day = "0" + day;

				let month = date.getMonth() + 1 + "";
				if (month.length === 1) month = "0" + month;

				days.push({
					stringDate: date.getFullYear() + "-" + month + "-" + day,
					date: date
				});
			}

			this.setRemainingDays(remainingDays);
			return days;
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
		testEventMap() {
			const map = {};
			this.$store.state.events.forEach(e =>
				(map[e.date] = map[e.date] || []).push(e)
			);
		},
		getWeekString(date) {
			let day = date.getDate();
			let month = MONTHS[date.getMonth()];

			date.setDate(date.getDate() + 6);

			let endDay = date.getDate();
			let endMonth = MONTHS[date.getMonth()];

			return month + " " + day + " - " + endMonth + " " + endDay;
		},
		weekHasEvents(startOfWeek) {
			let hasEvents = false;
			for (let i = startOfWeek; i < startOfWeek + 7 && !hasEvents; i++) {
				if (this.eventsMap[this.nextMonth[i].stringDate]) hasEvents = true;
			}
			return hasEvents;
		},
		setRemainingDays(days) {
			this.remainingDays = days;
		}
	}
};
</script>

<style lang="scss">
.weekheader {
	font-size: 21px;
	&.longheader {
		font-size: 18px;
	}
}
</style>

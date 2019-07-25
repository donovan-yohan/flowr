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
				:class="{
					weekheader: true,
					longheader: i > remainingDays + 6,
					topHeader: i == 0
				}"
			>
				{{
					i &lt; remainingDays
						? "This Week"
						: i &lt; remainingDays + 7
							? "Next Week"
							: getWeekString(date.date)
				}}
			</h2>
			<template v-if="eventsMap[date.stringDate]">
				<v-layout
					row
					v-for="e in eventsMap[date.stringDate].sort((a, b) => {
						if (a.time < b.time) return -1;
						else if (a.time > b - time) return 1;
						else return 0;
					})"
					:key="e.event_id"
				>
					<div v-ripple @click="" class="task-wrapper">
						<div class="task-info">
							<v-btn icon class="task-checkbox">
								<v-icon color="gray">check_circle_outline</v-icon>
							</v-btn>
							<span class="task-title">{{ e.title }}</span>
							<span
								:style="{
									color: 'var(--v-' + getClassColour(e.class_id) + '-base)'
								}"
								class="task-weight"
								>{{ e.weight + "%" }}</span
							>
							<div
								:style="{
									width: e.weight / 1.25 + 'px',
									backgroundColor:
										'var(--v-' + getClassColour(e.class_id) + '-base)'
								}"
								class="task-weight-bar"
							></div>
						</div>
						<div class="task-class-info">
							<span class="task-class-date">{{ getDayString(e.date) }}</span>
							<div
								:style="{
									backgroundColor:
										'var(--v-' + getClassColour(e.class_id) + '-base)'
								}"
								class="task-class-wrapper"
							>
								<span class="task-class-name">{{
									getClassName(e.class_id)
								}}</span>
							</div>
						</div>
					</div>
				</v-layout>
			</template>
		</div>
		<v-btn
			color="flowrOrange"
			style="margin-bottom: 4em"
			fixed
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
		},
		getDayString(dateString) {
			let day = dateString.substring(8, 10);
			let monthString = dateString.substring(5, 7);

			if (monthString[0] === "0") monthString = monthString.substring(1, 2);
			let monthIndex = parseInt(monthString) - 1;

			let today = new Date();
			if (today.getDate() == day && today.getMonth() == monthIndex)
				return "Today";
			else if (today.getDate() + 1 == day && today.getMonth() == monthIndex)
				return "Tomorrow";

			let month = MONTHS[monthIndex];
			return month + " " + day;
		},
		getClassName(id) {
			return this.$store.state.classes.find(c => c.class_id === id).name;
		},
		getClassColour(id) {
			return this.$store.state.classes.find(c => c.class_id === id).colour;
		}
	}
};
</script>

<style lang="scss">
.weekheader {
	font-size: 21px;
	padding-top: 16px;
	&.longheader {
		font-size: 18px;
	}
	&.topHeader {
		padding-top: 0;
	}
}

.task-wrapper {
	display: inline-flex;
	justify-content: space-between;
	width: 100%;
	padding: 4px 0;
	border-bottom: 1px solid var(--v-gray-base);

	.task-info {
		display: inline-flex;
		align-items: center;
		.task-checkbox {
			margin: 0;
			z-index: 1;
		}
		.task-weight {
			font-weight: 700;
			font-size: 12px;
			margin-left: 6px;
			margin-right: 3px;
		}
		.task-weight-bar {
			height: 33%;
		}
	}

	.task-class-info {
		display: inline-flex;
		align-items: center;
		.task-class-date {
			font-size: 12px;
		}
		.task-class-wrapper {
			display: flex;
			border-radius: 10px;
			margin-left: 4px;
			padding: 1px 6px;
			.task-class-name {
				font-weight: 700;
				font-size: 11px;
				color: white;
			}
		}
	}
}
</style>

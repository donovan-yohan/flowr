<template>
	<v-layout column>
		<div v-for="(week, i) in eventsMap" :key="i">
			<h2
				v-if="week.length > 0"
				:class="{
					weekheader: true,
					longheader: i > 1,
					topHeader: i == 0
				}"
			>
				{{ getWeekString(i) }}
			</h2>
			<template>
				<v-layout v-for="e in eventsMap[i]" :key="e.event_id" row>
					<div
						v-ripple
						class="task-wrapper"
						@click="
							() => {
								return null;
							}
						"
					>
						<div class="task-info">
							<v-btn icon class="task-checkbox">
								<v-icon color="gray">
									check_circle_outline
								</v-icon>
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
							/>
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
								<span v-if="unfolded" class="task-class-name">{{
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
			@click="() => {}"
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
			let weekArray = this.$store.state.events.reduce((r, e, i, a) => {
				// find week e belongs in as an index
				const eventDate = new Date(`${e.date} ${e.time}`);
				const today = new Date();

				if (eventDate > today) {
					const currentWeek = this.getWeekNumber(today);
					const eventWeek = this.getWeekNumber(eventDate);

					const weekIndex = eventWeek[1] - currentWeek[1];

					if (weekIndex < 0 || eventWeek[0] != currentWeek[0]) {
						weekIndex += 52 * eventWeek[0] - currentWeek[0];
					}

					// make length of array match number of weeks
					if (r.length < weekIndex + 1) {
						while (r.length < weekIndex + 1) {
							r.push([]);
						}
					}

					r[weekIndex].push(e);
				}
				return r;
			}, []);
			weekArray.forEach(week => {
				// sort by date and time
				week.sort((a, b) => {
					if (a.date < b.date) return -1;
					else if (a.date > b.date) return 1;
					else {
						if (a.time < b.time) return -1;
						else if (a.time > b.time) return 1;
						else return 0;
					}
				});
			});
			return weekArray;
		},
		unfolded() {
			return this.$store.state.unfolded;
		}
	},
	methods: {
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
		getWeekString(i) {
			if (i == 0) return "This Week";
			if (i == 1) return "Next Week";

			// find first day of week i weeks away
			let date = new Date();
			date.setDate(date.getDate() + (i - 1) * 7);
			while (date.getDay() != 0) {
				date.setDate(date.getDate() + 1);
			}

			let day = date.getDate();
			let month = MONTHS[date.getMonth()];

			date.setDate(date.getDate() + 6);

			let endDay = date.getDate();
			let endMonth = MONTHS[date.getMonth()];

			return month + " " + day + " - " + endMonth + " " + endDay;
		},
		getClassName(id) {
			return this.$store.state.classes.find(c => c.class_id == id).name;
		},
		getClassColour(id) {
			return this.$store.state.classes.find(c => c.class_id == id).colour;
		},
		getWeekNumber(d) {
			d = new Date(+d);
			d.setHours(0, 0, 0, 0);
			d.setDate(d.getDate() + 4 - (d.getDay() || 7));
			var yearStart = new Date(d.getFullYear(), 0, 1);
			var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
			return [d.getFullYear(), weekNo];
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
			padding: 0px 6px;
			.task-class-name {
				font-weight: 700;
				font-size: 11px;
				color: white;
			}
		}
	}
}
</style>

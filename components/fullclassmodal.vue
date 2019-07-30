<template>
	<v-card tile>
		<v-toolbar card dark :color="colour">
			<v-btn icon dark @click="$emit('exit')">
				<v-icon>chevron_left</v-icon>
			</v-btn>
			<v-toolbar-title class="modal-toolbar__title">
				{{
					name + '-' + section
				}}
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon @click="hidden = !hidden">
				<v-icon>{{ hidden ? 'visibility_off' : 'visibility' }}</v-icon>
			</v-btn>
			<v-dialog v-model="dialog">
				<template v-slot:activator="{ on }">
					<v-btn icon class="event-preview__button" v-on="on">
						<v-icon>delete</v-icon>
					</v-btn>
				</template>
				<confirm
					confirm-text="Delete"
					cancel-text="Cancel"
					@confirm="
						$emit('delete');
						dialog = false;
						$emit('exit');
					"
					@cancel="dialog = false"
				>
					Are you sure you want to delete this class and all associated events?
				</confirm>
			</v-dialog>
		</v-toolbar>
		<v-card-text>
			<div class="header-content">
				<div class="card-items">
					<v-card-text>
						<span class="class-time">{{
							getTimeString(start, duration)
						}}</span>
					</v-card-text>
					<v-card-text>
						<div class="class-day-wrapper">
							<div
								v-for="(day, i) in days"
								:key="i"
								:class="{ day: 'true', class: day > 0 }"
							>
								{{ daysOfWeek[i + 1] }}
							</div>
						</div>
						<h2>
							Grade
						</h2>
					</v-card-text>
				</div>
				<div class="card-items grade-wrapper">
					<v-card-text>
						<span class="class-location">{{ location }}</span>
					</v-card-text>
					<v-card-text>
						<span>{{ professor }}</span>
					</v-card-text>
					<v-card-title>
						<transition name="fade" mode="out-in">
							<h2 v-if="hidden" :key="'hidden'" class="hidden">
								--%
							</h2>
							<h2 v-else :key="'unhidden'">
								{{ grade + "%" }}
							</h2>
						</transition>
					</v-card-title>
				</div>
			</div>
			<div style="display: flex; justify-content: space-between">
				<h3>Tasks</h3>
				<h3>Score</h3>
			</div>
			<v-layout v-for="e in classEventsMap" :key="e.event_id" row>
				<div class="task-wrapper">
					<div class="task-folded">
						<div class="task-info">
							<span
								class="task-title"
							>
								{{ e.title }}
							</span>
							<span
								:style="{
									color: 'var(--v-' + getClassColour(e.class_id) + '-base)'
								}"
								class="task-weight"
							>{{ e.weight + "%" }}</span>
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
							<transition name="fade" mode="out-in">
								<span
									v-if="hidden"
									:key="e.class_id + 'U1'"
									class="task-class-date"
								>
									--%
								</span>
								<v-text-field
									v-else
									:key="'unhidden'"
									class="grade-input"
									prefix="%"
									mask="##"
									reverse
									:color="getClassColour(e.class_id)"
									:value="e.grade"
									@blur="e.grade = $event.target.value"
								/>
								</span>
							</transition>
						</div>
						<div
							<
							div
						/>
					</div>
				</div>
			</v-layout>
		</v-card-text>

		<div style="flex: 1 1 auto;" />
	</v-card>
</template>

<script>
import { mapMutations } from "vuex";
import * as helpers from "@/global/mixins.js";
import confirm from "~/components/confirm.vue";
import { SHORTDAYS } from "@/global/constants.js";

export default {
	components: {
		confirm
	},
	props: {
		name: String,
		section: String,
		colour: String,
		classId: Number,
		startDate: String,
		start: String,
		endDate: String,
		end: String,
		duration: Number,
		grade: Number,
		location: String,
		professor: String,
		days: Array,
	},
	data() {
		return {
			daysOfWeek: SHORTDAYS,
			dialog: false,
			hidden: true,
		};
	},
	computed: {
		classEventsMap() {
			let map = this.$store.state.events.filter(e => {
				return e.weight && (e.class_id == this.class_id);
			});
			map.sort((a, b) => {
				if (a.time < b.time) return -1;
				else if (a.time > b.time) return 1;
				else return 0;
			});
			return map;
		},
	},
	methods: {
		getDetailDayString: helpers.getDetailDayString,
		getTimeString: helpers.getTimeString,
		getClassColour(id) {
			return this.$store.state.classes.find(c => c.class_id == id).colour;
		},
	}
};
</script>

<style lang="scss">
.full-page {
	width: 100%;
	height: 100%;
	background: white;
}

.modal-toolbar__title {
	margin: 0 !important;
	font-weight: 700;
}

.header-content {
	display: flex;
	justify-content: space-between;
	align-content: flex-start;
	margin-bottom: 16px;
}

.list-item {
	.v-list__tile {
		padding: 0;
	}
	.v-list__tile__action {
		min-width: 40px;
	}
}
.list-add-item {
	color: var(--v-gray-base);
}
.completed {
	color: var(--v-gray-base);
	text-decoration: line-through;
}

.class-time,
.class-location {
	font-size: 16px;
}

.class-day-wrapper {
	display: flex;
	.day {
		margin-right: 1em;
		opacity: 0.5;
	}
	.class {
		font-weight: 700;
		opacity: 1;
	}
}

.card-items {
	&.grade-wrapper {
		color: black;
		text-align: right;
	}
	color: black;
	.v-card__text {
		padding: 0;
	}
	.v-card__title {
		padding: 0;
	}
}

.task-wrapper {
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	padding: 4px 0;
	border-bottom: 1px solid var(--v-gray-base);
	height: auto;
	min-height: 41px;

	.task-info {
		display: inline-flex;
		align-items: center;
		min-width: 0;
		.task-checkbox {
			margin: 0 0 0 -0.5em;
			z-index: 1;
		}
		.task-title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.task-weight {
			font-weight: 700;
			font-size: 12px;
			margin-left: 6px;
			margin-right: 3px;
		}
		.task-weight-bar {
			height: 0.8em;
			flex-shrink: 0;
		}
	}
	.task-detail {
		font-size: 12px;
	}
	.task-class-info {
		display: inline-flex;
		justify-content: flex-end;

		.task-class-date {
			font-size: 12px;
			white-space: nowrap;
			padding-left: 8px;
		}
		.task-class-wrapper {
			height: 1em;
			min-width: 1em;
			display: flex;
			align-items: center;
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
	.task-location {
		font-size: 12px;
	}

	.task-unfolded {
		display: flex;
		margin-left: calc(36px - 0.5em);
		margin-top: -4px;
	}

	.task-folded {
		display: flex;
		align-content: center;
		justify-content: space-between;
	}
}

.grade-input {
	max-width: 50px;
	padding: 0;
	margin: 0;
	.v-input__slot {
		margin: 0;
	}
	.v-text-field__details {
		max-height: 0;
	}
}
</style>

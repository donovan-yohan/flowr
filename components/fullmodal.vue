<template>
	<v-card tile>
		<v-toolbar card dark :color="colour">
			<v-btn icon dark @click="$emit('exit')">
				<v-icon>chevron_left</v-icon>
			</v-btn>
			<v-toolbar-title class="modal-toolbar__title">{{
				title
			}}</v-toolbar-title>
			<v-spacer></v-spacer>
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
					Are you sure you want to delete this occurence?
				</confirm>
			</v-dialog>
			<v-menu bottom right offset-y>
				<template v-slot:activator="{ on }">
					<v-btn dark icon v-on="on">
						<v-icon>more_vert</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-tile @click="() => {}">
						<v-list-tile-title>placeholder</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
		</v-toolbar>
		<v-card-text>
			<div class="header-content">
				<div>
					<h3>{{ getDetailDayString(date) }}</h3>
					<div>
						{{ location }}
					</div>
				</div>
				<div>
					<div v-if="weight" class="weight-title">
						{{ weight + "%" }}
					</div>
				</div>
			</div>
			<h3>Checklist</h3>
			<v-list>
				<v-list-tile v-for="item in checklist" class="list-item">
					<v-list-tile-action>
						<v-checkbox v-model="item.completed"></v-checkbox>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title :class="{ completed: item.completed }">{{
							item.name
						}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile class="list-item">
					<v-list-tile-action>
						<v-btn icon :disabled="!newTodo" @click="addTodo(newTodo)">
							<v-icon :color="newTodo ? colour : 'gray'"
								>add_circle_outline</v-icon
							>
						</v-btn>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title class="list-add-item">
							<v-text-field
								v-model="newTodo"
								label="Add an item"
								single-line
							></v-text-field>
						</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
			<!-- <h3>Notes</h3>
			<v-textarea
				 v-model="detailsComputed"
				 :color="colour"
			 >
			 </v-textarea> -->
		</v-card-text>

		<div style="flex: 1 1 auto;"></div>
	</v-card>
</template>

<script>
import { mapMutations } from "vuex";
import * as helpers from "@/global/mixins.js";
import confirm from "~/components/confirm.vue";

export default {
	components: {
		confirm
	},
	props: {
		title: String,
		colour: String,
		date: String,
		weight: Number,
		location: String,
		checklist: Array,
		details: String,
		id: Number
	},
	data() {
		return {
			dialog: false,
			newTodo: ""
		};
	},
	computed: {},
	methods: {
		getDetailDayString: helpers.getDetailDayString,
		addTodo(todoName) {
			this.checklist.push({ name: todoName, completed: false });
			this.newTodo = "";
		}
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
	margin: 0;
	font-weight: 700;
}

.header-content {
	display: flex;
	justify-content: space-between;
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
</style>

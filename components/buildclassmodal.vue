<template>
	<v-card tile>
		<v-toolbar color="white">
			<v-dialog v-model="dialog">
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-icon>chevron_left</v-icon>
					</v-btn>
				</template>
				<confirm
					confirm-text="leave"
					cancel-text="Cancel"
					@confirm="
						dialog = false;
						$emit('exit');
					"
					@cancel="dialog = false"
				>
					Are you sure you want to stop adding this class?
					You will lose your progress.
				</confirm>
			</v-dialog>
			<v-toolbar-title class="modal-toolbar__title">
				Add a Class
			</v-toolbar-title>
		</v-toolbar>
		<v-card-text>
			<div style="display: flex">
				<v-text-field label="Name" placeholder="CP317"></v-text-field>
				<v-text-field label="Section" placeholder="A"></v-text-field>
				<v-btn icon color="gray"><v-icon color="white">colorize</v-icon></v-btn>
			</div>
			<div style="display: flex; justify-content: space-between" class="checkbox-wrapper">
				<v-checkbox
					label="M"
				></v-checkbox>
				<v-checkbox
					label="T"
				></v-checkbox>
				<v-checkbox
					label="W"
				></v-checkbox>
				<v-checkbox
					label="T"
				></v-checkbox>
				<v-checkbox
					label="F"
				></v-checkbox>
			</div>
			<div style="display: flex">
				<v-text-field
					label="Start Date"
					placeholder="2019-05-04"
				></v-text-field>
				<v-text-field label="End Date" placeholder="2019-08-02"></v-text-field>
			</div>
			<div style="display: flex">
				<v-text-field
					label="Start Time"
					placeholder="9:30AM"
				></v-text-field>
				<v-text-field label="End Time" placeholder="10:20AM"></v-text-field>
			</div>
			<div style="display: flex">
				<v-text-field
					label="Location"
					placeholder="SC-N1001"
				></v-text-field>
			</div>
			<v-text-field
				label="Professor"
				placeholder="Jane Doe"
			></v-text-field>
			<v-text-field
				label="Email"
				placeholder="janedoe@university.ca"
			></v-text-field>
			<v-text-field
				label="Office Hours"
				placeholder="LH3094, 2 - 3 Mon & Thurs"
			></v-text-field>
			<div style="display: flex; justify-content: flex-end">
				<v-btn flat disabled color="gray">Create</v-btn>
			</div>
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
	data() {
		return {
			dialog: false,
			menu: false,
		}
	},
	computed: {

	},
	methods: {
		getDetailDayString: helpers.getDetailDayString,
		getTimeString: helpers.getTimeString,
		dateToString: helpers.dateToString,
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

.checkbox-wrapper {
	.v-input {
		margin: 0;
	}
}
</style>

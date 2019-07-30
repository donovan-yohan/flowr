<template>
	<v-card tile>
		<v-toolbar card color="white">
			<v-toolbar-title class="modal-toolbar__title">
				Create Event
			</v-toolbar-title>
		</v-toolbar>
		<v-card-text>
			<div style="display: flex">
				<v-text-field label="Name" placeholder="Assignment" />
				<v-btn icon color="gray">
					<v-icon color="white">
						colorize
					</v-icon>
				</v-btn>
			</div>
			<div style="display: flex">
				<v-text-field label="Date" placeholder="2019-05-04" />
			</div>
			<div style="display: flex">
				<v-text-field label="Start Time" placeholder="9:30AM" />
				<v-text-field label="End Time" placeholder="10:20AM" />
			</div>
			<div style="display: flex">
				<v-text-field label="Location" placeholder="Online" />
				<v-text-field label="Weight" placeholder="50" suffix="%" />
			</div>

			<div style="display: flex; justify-content: flex-end">
				<v-btn icon disabled color="gray">
					<v-icon>add</v-icon>
				</v-btn>
			</div>
		</v-card-text>
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
			menu: false
		};
	},
	computed: {},
	methods: {
		getDetailDayString: helpers.getDetailDayString,
		getTimeString: helpers.getTimeString,
		dateToString: helpers.dateToString
	}
};
</script>

<style lang="scss">
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

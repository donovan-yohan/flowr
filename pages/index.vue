<template>
	<v-layout column>
		<v-text v-for="e in events" :key="e.event_id">
			{{ e.title }}
		</v-text>
	</v-layout>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	data() {
		return {};
	},
	computed: {
		events() {
			return this.$store.state.events;
		}
	}
};
</script>

<style lang="scss"></style>

<template>
	<v-container fluid grid-list-md>
		<v-layout column>
			<v-flex v-for="c in classes" :key="c.classes_id">
				<v-card :color="c.colour" class="class-card">
					<v-layout column>
						<v-card-title>
							<h1>{{ c.name }}</h1>
						</v-card-title>
						<v-card-text>
							{{ c.start + " - " + c.end }}
						</v-card-text>
					</v-layout>
					<v-spacer />
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
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
		},
		classes() {
			return this.$store.state.classes;
		},
		eventsMap() {
			const map = {};
			this.$store.state.events.forEach(e =>
				(map[e.date] = map[e.date] || []).push(e)
			);
			console.log(map);
			return map;
		}
	},
	methods: {
		getClassColour(id) {
			return this.$store.state.classes.find(c => c.class_id === id).colour;
		}
	}
};
</script>

<style lang="scss">
.grid-list-md {
	padding: 0;
}
.class-card {
	padding: 16px 0;
	.v-card__title,
	.v-card__text {
		padding: 0px 16px;
		color: white;
	}
}
</style>

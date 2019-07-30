<template>
	<v-card>
		<v-card-title v-if="title">
			{{ title }}
		</v-card-title>
		<v-card-text>
			<slot />
		</v-card-text>

		<v-card-actions>
			<v-spacer />
			<v-btn
				flat
				small
				round
				@click="$emit('cancel')"
			>
				{{ cancelText }}
			</v-btn>
			<v-btn
				v-if="confirmText"
				flat
				color="flowrRed"
				small
				round
				@click="$emit('confirm')"
			>
				{{ confirmText }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: {
		title: String,
		confirmText: String,
		cancelText: String
	},
	data() {
		return {
			dialog: false
		};
	}
};
</script>

<style lang="scss" scoped></style>

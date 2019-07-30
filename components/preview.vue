<template>
	<v-card flat class="event-preview">
		<v-toolbar
			class="event-preview__toolbar"
			:color="colour"
			dark
			flat
		>
			<v-toolbar-title class="event-preview__title">
				{{ title }}
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon class="event-preview__button">
				<v-icon>edit</v-icon>
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
					"
					@cancel="dialog = false"
				>
					Are you sure you want to delete this class?
				</confirm>
			</v-dialog>
		</v-toolbar>
		<v-card-title primary-title>
			<div class="event-preview__detail">
				<span class="event-preview__line-item event-preview__date">
					<v-icon>calendar_today</v-icon>
					<span>{{ date }}</span>
				</span>
				<span class="event-preview__line-item event-preview__time">
					<v-icon>access_time</v-icon>
					<span>{{ time }}</span>
				</span>
				<span class="event-preview__line-item event-preview__location">
					<v-icon>location_on</v-icon>
					<span>{{ location }}</span>
				</span>
			</div>
			<div class="event-preview__notes">
				<span v-if="!details" class="event-preview__empty-list">
					No notes
				</span>
				<span v-else class="event-preview__list-item">
					{{ details }}
				</span>
			</div>
			<div class="event-preview__checklist">
				<span v-if="checklist.length == 0" class="event-preview__empty-list">
					No todos
				</span>
				<span
					v-for="item in checklist"
					v-else
					:key="item.name + random()"
					class="event-preview__list-item"
				>
					{{ item.name }}
				</span>
			</div>
		</v-card-title>
	</v-card>
</template>

<script>
import confirm from "~/components/confirm.vue";

export default {
	components: {
		confirm
	},
	props: {
		title: String,
		colour: String,
		details: String,
		checklist: Array,
		date: String,
		time: String,
		location: String
	},
	data() {
		return {
			dialog: false
		};
	}
};
</script>

<style lang="scss" scoped>
.event-preview {
	min-width: 200px;
	.v-card__title {
		padding-top: 12px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.event-preview__toolbar {
		font-size: 14px;
	}

	.event-preview__title {
		font-weight: 700;
	}
	.event-preview__detail {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid var(--v-gray-base);
		width: 100%;
	}
	.event-preview__line-item {
		display: flex;
		align-items: center;
		i {
			padding: 6px 8px 6px 0;
			font-size: 20px;
		}
	}
	.event-preview__notes {
		padding: 8px 0;
		border-bottom: 1px solid var(--v-gray-base);
		width: 100%;
	}
	.event-preview__checklist {
		display: flex;
		flex-direction: column;
		margin-top: 8px;
		overflow: scroll;
		// font-size * line height * number of lines
		max-height: calc(1em * 1.5 * 3);
	}
	.event-preview__empty-list {
		color: var(--v-gray-base);
		font-style: italic;
	}
}
</style>

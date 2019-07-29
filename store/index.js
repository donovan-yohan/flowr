import { MONTHS, DAYSOFWEEK, SHORTMONTHS } from "@/global/constants.js";
import * as helpers from "@/global/mixins.js";

export const state = () => ({
	events: [
		{
			title: "Test 4",
			details: "",
			event_id: 5,
			date: "2019-08-03",
			time: "12:00",
			duration: 45,
			open: false,
			location: "LH1024",
			weight: 15,
			class_id: 4,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		},
		{
			title: "Test",
			details: "",
			event_id: 1,
			date: "2019-07-24",
			time: "09:30",
			duration: 30,
			open: false,
			location: "SC1001",
			weight: 15,
			class_id: 0,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		},
		{
			title: "August 2",
			details: "",
			event_id: 2,
			date: "2019-08-17",
			time: "09:30",
			duration: 30,
			open: false,
			location: "SC1001",
			weight: 15,
			class_id: 0,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		},
		{
			title: "August",
			details: "",
			event_id: 4,
			date: "2019-08-17",
			time: "18:00",
			duration: 90,
			open: false,
			location: "Online",
			weight: 25,
			class_id: 4,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		}
	],
	classes: [
		{
			class_id: 0,
			name: "CP317",
			grade: 100,
			colour: "flowrGreen",
			start: "08:30",
			end: "09:20",
			duration: 50,
			start_date: "2019-07-01",
			end_date: "2019-08-20",
			days: [1, 0, 1, 0, 1],
			location: "place",
			section: "Q",
			professor: "person"
		},
		{
			class_id: 1,
			name: "BU212",
			grade: 67,
			colour: "flowrTurquoise",
			start: "12:30",
			end: "13:50",
			duration: 80,
			start_date: "2019-07-01",
			end_date: "019-08-31",
			days: [0, 1, 0, 1, 0],
			location: "place",
			section: "J",
			professor: "person"
		},
		{
			class_id: 2,
			name: "CP412",
			grade: 90,
			colour: "flowrBlue",
			start: "17:30",
			end: "18:50",
			duration: 80,
			start_date: "2019-07-01",
			end_date: "2019-07-31",
			days: [1, 0, 1, 0, 0],
			location: "place",
			section: "A3",
			professor: "person"
		},
		{
			class_id: 3,
			name: "PS302",
			grade: 8,
			colour: "flowrIndigo",
			start: "19:00",
			end: "21:50",
			duration: 170,
			start_date: "2019-07-01",
			end_date: "2019-07-31",
			days: [1, 0, 0, 0, 0],
			location: "place",
			section: "A5",
			professor: "person"
		},
		{
			class_id: 4,
			name: "BU402",
			grade: 24,
			colour: "flowrViolet",
			start: "09:30",
			end: "10:20",
			duration: 50,
			start_date: "2019-07-01",
			end_date: "2019-08-31",
			days: [1, 0, 1, 0, 1],
			location: "place",
			section: "B5",
			professor: "person"
		},
		{
			class_id: 5,
			name: "CP102",
			grade: 67,
			colour: "flowrPurple",
			start: "19:00",
			end: "22:50",
			duration: 80,
			start_date: "2019-07-01",
			end_date: "2019-08-31",
			days: [0, 0, 0, 1, 0],
			location: "place",
			section: "A",
			professor: "person"
		},
		{
			class_id: 6,
			name: "CP468",
			grade: 88,
			colour: "flowrMagenta",
			start: "11:30",
			end: "12:50",
			duration: 80,
			start_date: "2019-07-14",
			end_date: "2019-09-21",
			days: [0, 1, 0, 1, 0],
			location: "place",
			section: "V",
			professor: "person"
		}
	],
	classEvents: [],
	gradesHidden: true,
	unfolded: true,
	showingEvents: true,
	intervalHeight: 60,
	eventIDtracker: 0,
	classIDtracker: 0,
	classEventIDtracker: 0
});

export const mutations = {
	toggleHidden(state) {
		state.gradesHidden = !state.gradesHidden;
	},
	toggleUnfold(state) {
		state.unfolded = !state.unfolded;
	},
	toggleCalendar(state) {
		state.showingEvents = !state.showingEvents;
	},
	generateClassEvents(state, class_id) {
		let filter = state.classes.filter(classItem => {
			return classItem.class_id == class_id;
		});
		let c = filter[0];
		let current = new Date(`${c.start_date} ${c.start}`);
		let end = new Date(`${c.end_date} ${c.end}`);
		while (current.getTime() < end.getTime()) {
			let weekdayIndex = current.getDay();
			if (weekdayIndex > 0 && weekdayIndex < 6) {
				weekdayIndex -= 1;
				if (c.days[weekdayIndex] > 0) {
					let classEvent = {
						title: c.name,
						event_id: state.classEventIDtracker++,
						date: helpers.dateToString(current),
						time: c.start,
						duration: c.duration,
						location: c.location,
						class_id: c.class_id,
						checklist: []
					};
					state.classEvents.push(classEvent);
				}
			}
			current.setDate(current.getDate() + 1);
		}
	},
	setIntervalHeight(state, newHeight) {
		state.intervalHeight = newHeight;
	},

	// testing function
	generateAllClassEvents(state) {
		state.classes.forEach(c => {
			let current = new Date(`${c.start_date} ${c.start}`);
			let end = new Date(`${c.end_date} ${c.end}`);
			while (current.getTime() < end.getTime()) {
				let weekdayIndex = current.getDay();
				if (weekdayIndex > 0 && weekdayIndex < 6) {
					weekdayIndex -= 1;
					if (c.days[weekdayIndex] > 0) {
						let classEvent = {
							title: c.name,
							details: "",
							event_id: state.classEventIDtracker++,
							date: helpers.dateToString(current),
							time: c.start,
							open: false,
							duration: c.duration,
							location: c.location,
							section: c.section,
							class_id: c.class_id,
							checklist: []
						};
						state.classEvents.push(classEvent);
					}
				}
				current.setDate(current.getDate() + 1);
			}
		});
	}
};

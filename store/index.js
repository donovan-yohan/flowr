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
			location: "LH1024",
			weight: 15,
			grade: 0,
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
			title: "Test 6 lol",
			details: "",
			event_id: 10,
			date: "2019-08-04",
			time: "16:00",
			duration: 0,
			location: "LH1024",
			weight: 25,
			grade: 0,
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
			title: "Test",
			details: "",
			event_id: 1,
			date: "2019-07-24",
			time: "09:30",
			duration: 30,
			location: "SC1001",
			weight: 15,
			grade: 0,
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
			location: "SC1001",
			weight: 15,
			grade: 0,
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
			title: "Big Assignment",
			details: "",
			event_id: 4,
			date: "2019-08-08",
			time: "13:30",
			duration: 80,
			location: "SC1001",
			weight: 70,
			grade: 0,
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
			title: "Big Assignment 2",
			details: "",
			event_id: 7,
			date: "2019-08-08",
			time: "13:00",
			duration: 80,
			location: "SC1001",
			weight: 40,
			grade: 0,
			class_id: 0,
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
		}
	],
	classEvents: [],
	gradesHidden: true,
	unfolded: true,
	showingEvents: true,
	showMissingGrades: false,
	intervalHeight: 60,
	eventIDtracker: 30000,
	classIDtracker: 20000,
	classEventIDtracker: 10000
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
	toggleMissingGrades(state) {
		state.showMissingGrades = !state.showMissingGrades;
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
	deleteClassEvent(state, id) {
		let found = false;
		for (let i = 0; i < state.classEvents.length && !found; i++) {
			if (state.classEvents[i].event_id == id) {
				state.classEvents.splice(i, 1);
				found = true;
			}
		}
	},
	deleteEvent(state, id) {
		let found = false;
		for (let i = 0; i < state.events.length && !found; i++) {
			if (state.events[i].event_id == id) {
				state.events.splice(i, 1);
				found = true;
			}
		}
	},
	deleteClass(state, id) {
		let events = state.events.filter(e => {
			return e.class_id != id;
		});
		let classes = state.classes.filter(c => {
			return c.class_id != id;
		});
		let classEvents = state.classEvents.filter(ce => {
			return ce.class_id != id;
		});
		state.events = events;
		state.classes = classes;
		state.classEvents = classEvents;
	},
	setClassEventDetails(state, id, val) {
		state.classEvents.find(e => (e.event_id = id)).details = val;
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
							duration: c.duration,
							location: c.location,
							section: c.section,
							class_id: c.class_id,
							checklist: [{ name: "FUCK", completed: false }]
						};
						state.classEvents.push(classEvent);
					}
				}
				current.setDate(current.getDate() + 1);
			}
		});
	}
};

export const strict = false;

import { MONTHS, DAYSOFWEEK, SHORTMONTHS } from "@/global/constants.js";
import * as helpers from "@/global/mixins.js";

export const state = () => ({
	events: [
		{
			title: "Assignment 1",
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
			title: "Assignment 2",
			details: "",
			event_id: 10,
			date: "2019-08-04",
			time: "16:00",
			duration: 0,
			location: "LH1024",
			weight: 30,
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
			title: "Midterm",
			details: "",
			event_id: 1,
			date: "2019-08-19",
			time: "09:30",
			duration: 90,
			location: "SC1001",
			weight: 45,
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
			title: "Assignment 1",
			details: "",
			event_id: 21,
			date: "2019-07-27",
			time: "13:00",
			duration: 0,
			location: "LH1024",
			weight: 10,
			grade: 0,
			class_id: 1,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		},
		{
			title: "Assignment 2",
			details: "",
			event_id: 22,
			date: "2019-08-10",
			time: "16:00",
			duration: 0,
			location: "LH1024",
			weight: 20,
			grade: 0,
			class_id: 1,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		},
		{
			title: "Midterm",
			details: "",
			event_id: 24,
			date: "2019-08-19",
			time: "12:30",
			duration: 90,
			location: "N2001",
			weight: 55,
			grade: 0,
			class_id: 1,
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
			event_id: 25,
			date: "2019-08-11",
			time: "16:30",
			duration: 80,
			location: "LH2020",
			weight: 70,
			grade: 0,
			class_id: 1,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		},
		{
			title: "Assignment 1",
			details: "",
			event_id: 31,
			date: "2019-07-27",
			time: "11:00",
			duration: 0,
			location: "LH1024",
			weight: 25,
			grade: 0,
			class_id: 2,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		},
		{
			title: "Assignment 2",
			details: "",
			event_id: 32,
			date: "2019-08-10",
			time: "18:00",
			duration: 0,
			location: "LH1024",
			weight: 40,
			grade: 0,
			class_id: 2,
			completed: false,
			checklist: [
				{
					name: "",
					completed: false
				}
			]
		},
		{
			title: "Midterm",
			details: "",
			event_id: 34,
			date: "2019-08-19",
			time: "19:30",
			duration: 90,
			location: "N2001",
			weight: 45,
			grade: 0,
			class_id: 2,
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
			event_id: 35,
			date: "2019-09-22",
			time: "16:30",
			duration: 80,
			location: "LH2020",
			weight: 50,
			grade: 0,
			class_id: 2,
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
			class_id: 2,
			name: "BU317",
			grade: 0,
			colour: "flowrGreen",
			start: "08:30",
			end: "09:20",
			duration: 50,
			start_date: "2019-05-01",
			end_date: "2019-08-20",
			days: [1, 0, 1, 0, 1],
			location: "SC1001",
			section: "A5",
			professor: "Jane"
		},
		{
			class_id: 1,
			name: "CP468",
			grade: 0,
			colour: "flowrTurquoise",
			start: "12:30",
			end: "13:50",
			duration: 80,
			start_date: "2019-05-01",
			end_date: "2019-08-20",
			days: [0, 1, 0, 1, 0],
			location: "N2000",
			section: "Q",
			professor: "Doe"
		},
		{
			class_id: 0,
			name: "CP329",
			grade: 100,
			colour: "flowrBlue",
			start: "19:00",
			end: "22:50",
			duration: 170,
			start_date: "2019-05-01",
			end_date: "2019-08-20",
			days: [1, 0, 0, 0, 0],
			location: "LH2001",
			section: "A",
			professor: "Professor"
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

export const strict = false;

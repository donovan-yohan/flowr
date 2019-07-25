export const state = () => ({
	events: [
		{
			title: "Test",
			event_id: "1",
			date: "2019-07-24",
			time: "04:00",
			duration: 30,
			weight: 15,
			class_id: "0",
			completed: "",
			checklist: [
				{
					name: "",
					completed: ""
				}
			]
		},
		{
			title: "Test2",
			event_id: "2",
			date: "2019-07-24",
			time: "05:00",
			duration: 60,
			weight: 50,
			class_id: "1",
			completed: "",
			checklist: [
				{
					name: "",
					completed: ""
				}
			]
		},
		{
			title: "Test3",
			event_id: "3",
			date: "2019-07-26",
			time: "08:00",
			duration: 90,
			weight: 25,
			class_id: "0",
			completed: "",
			checklist: [
				{
					name: "",
					completed: ""
				}
			]
		}
	],
	classes: [
		{
			class_id: "0",
			name: "CP317",
			grade: 100,
			colour: "flowrGreen",
			start: "08:30",
			end: "09:20",
			duration: 50,
			start_date: "",
			end_date: "",
			days: [1, 0, 1, 0, 1]
		},
		{
			class_id: "1",
			name: "BU212",
			grade: 67,
			colour: "flowrTurquoise",
			start: "12:30",
			end: "13:50",
			duration: 80,
			start_date: "",
			end_date: "",
			days: [0, 1, 0, 1, 0]
		},
		{
			class_id: "2",
			name: "CP412",
			grade: 90,
			colour: "flowrBlue",
			start: "17:30",
			end: "18:50",
			duration: 80,
			start_date: "",
			end_date: "",
			days: [1, 0, 1, 0, 0]
		},
		{
			class_id: "3",
			name: "PS302",
			grade: 8,
			colour: "flowrIndigo",
			start: "19:00",
			end: "21:50",
			duration: 170,
			start_date: "",
			end_date: "",
			days: [1, 0, 0, 0, 0]
		},
		{
			class_id: "4",
			name: "BU402",
			grade: 24,
			colour: "flowrViolet",
			start: "9:30",
			end: "10:20",
			duration: 50,
			start_date: "",
			end_date: "",
			days: [1, 0, 1, 0, 1]
		},
		{
			class_id: "5",
			name: "CP102",
			grade: 67,
			colour: "flowrPurple",
			start: "19:00",
			end: "22:50",
			duration: 80,
			start_date: "",
			end_date: "",
			days: [0, 0, 0, 1, 0]
		},
		{
			class_id: "6",
			name: "CP468",
			grade: 88,
			colour: "flowrMagenta",
			start: "11:30",
			end: "12:50",
			duration: 80,
			start_date: "",
			end_date: "",
			days: [0, 1, 0, 1, 0]
		}
	],
	hidden: true,
	gradesIcon: "visibility_off"
});

export const mutations = {
	toggleHidden(state) {
		state.hidden = !state.hidden;

		if (state.hidden) state.gradesIcon = "visibility";
		else state.gradesIcon = "visibility_off";
	}
};

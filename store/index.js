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
			grade: "",
			colour: "green",
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
			grade: "",
			colour: "turquoise",
			start: "12:30",
			end: "13:50",
			duration: 80,
			start_date: "",
			end_date: "",
			days: [0, 1, 0, 1, 0]
		}
	],
	number1: 1,
	number2: 2
});

export const mutations = {};

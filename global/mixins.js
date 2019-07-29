import { MONTHS, DAYSOFWEEK, SHORTMONTHS } from "@/global/constants.js";

export function getWeekString(i, short) {
	short = short || false;

	if (i == 0) return "This Week";
	if (i == 1) return "Next Week";

	// find first day of week i weeks away
	let date = new Date();
	if (i > 0) {
		date.setDate(date.getDate() + (i - 1) * 7);
		while (date.getDay() != 0) {
			date.setDate(date.getDate() + 1);
		}
	} else {
		date.setDate(date.getDate() + i * 7);
		while (date.getDay() != 0) {
			date.setDate(date.getDate() - 1);
		}
	}
	let day = date.getDate();
	let month = "";
	short
		? (month = SHORTMONTHS[date.getMonth()])
		: (month = MONTHS[date.getMonth()]);

	date.setDate(date.getDate() + 6);

	let endDay = date.getDate();
	let endMonth = "";
	short
		? (endMonth = SHORTMONTHS[date.getMonth()])
		: (endMonth = MONTHS[date.getMonth()]);

	return month + " " + day + " - " + endMonth + " " + endDay;
}

export function getWeekNumber(d) {
	d = new Date(+d);
	d.setHours(0, 0, 0, 0);
	// 	d.setDate(d.getDate() + 4 - (d.getDay() || 7)); for startMonday
	d.setDate(d.getDate() + 4 - d.getDay());
	var yearStart = new Date(d.getFullYear(), 0, 1);
	var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return [d.getFullYear(), weekNo];
}

export function weeksFromToday(today, target) {
	const currentWeek = getWeekNumber(today);
	const targetWeek = getWeekNumber(target);

	let weekIndex = targetWeek[1] - currentWeek[1];

	if (weekIndex < 0) {
		weekIndex -= 52 * (currentWeek[0] - targetWeek[0]);
	} else {
		weekIndex += 52 * (targetWeek[0] - currentWeek[0]);
	}
	return weekIndex;
}

export function scrollScheduleIntoView(date, eventsMap) {
	const intervalSize = 40;
	const schedule = document.getElementById("scheduleWrapper");

	let dateString = dateToString(date);

	let today = new Date();
	today.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);

	let value = 9 * intervalSize;

	if (+today == +date) {
		setTimeout(() => {
			const currentTime = document.getElementById("currentTime");
			value = currentTime.offsetTop;
			schedule.scrollTop = value - 75;
		}, 1);
	} else if (eventsMap[dateString]) {
		let hoursToMinutes =
			eventsMap[dateString][0].time.substring(0, 2) * intervalSize;
		let minutes = eventsMap[dateString][0].time.substring(3, 5);
		value = hoursToMinutes + minutes / intervalSize;
	}

	schedule.scrollTop = value - 75;
}

export function dateToString(date) {
	let month = date.getMonth() + 1;
	month < 10 ? (month = "0" + month) : (month = month + "");
	let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	return `${date.getFullYear()}-${month}-${day}`;
}

export function parseEndTime(time, duration) {
	let t = new Date(`01-01-01 ${time}`);
	t.setMinutes(t.getMinutes() + duration);
	let hours = t.getHours();
	if (hours < 10) hours = `0${hours}`;
	return `${hours}:${t.getMinutes()}`;
}

export function getTimeString(time, duration) {
	let endTime = parseEndTime(time, duration);
	let end = formatTime(endTime);
	let start = formatTime(time);

	return `${start} - ${end} ${endTime >= "12:00" ? "PM" : "AM"}`;
}

export function formatTime(time) {
	let hour = time.substring(0, 2);
	if (time >= "13:00") hour = parseInt(hour) - 12;
	else if (hour[0] === "0") hour = hour[1];

	return hour + time.substring(2, 5);
}

import { MONTHS, DAYSOFWEEK, SHORTMONTHS } from "@/global/constants.js";

export function getWeekString(i) {
	if (i == 0) return "This Week";
	if (i == 1) return "Next Week";

	// find first day of week i weeks away
	let date = new Date();
	date.setDate(date.getDate() + (i - 1) * 7);
	while (date.getDay() != 0) {
		date.setDate(date.getDate() + 1);
	}

	let day = date.getDate();
	let month = MONTHS[date.getMonth()];

	date.setDate(date.getDate() + 6);

	let endDay = date.getDate();
	let endMonth = MONTHS[date.getMonth()];

	return month + " " + day + " - " + endMonth + " " + endDay;
}

export function getWeekNumber(d) {
	d = new Date(+d);
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() + 4 - (d.getDay() || 7));
	var yearStart = new Date(d.getFullYear(), 0, 1);
	var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return [d.getFullYear(), weekNo];
}

export function weeksFromToday(today, target) {
	const currentWeek = getWeekNumber(today);
	const targetWeek = getWeekNumber(target);

	let weekIndex = targetWeek[1] - currentWeek[1];

	if (weekIndex < 0 || targetWeek[0] != currentWeek[0]) {
		weekIndex += 52 * targeWeek[0] - currentWeek[0];
	}
	return weekIndex;
}

import {
	getWeekNumber,
	parseEndTime,
	getTimeString,
	formatTime
} from "../global/mixins";

//import { MONTHS, DAYSOFWEEK, SHORTMONTHS } from "@/global/constants.js";

function test() {
	console.log("Testing getWeekNumber:");
	console.log("Test 1:");
	console.log("Input: new Date(2019, 10, 10)");
	console.log("Expected output: 2019,46");
	console.log("Actual Output: " + getWeekNumber(new Date(2019, 10, 10)));
	if (getWeekNumber(new Date(2019, 10, 10)) == "2019,46") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}

	console.log("Test 2:");
	console.log("Input: new Date(2020, 3, 1)");
	console.log("Expected output: 2020,10");
	console.log("Actual Output: " + getWeekNumber(new Date(2020, 3, 1)));
	if (getWeekNumber(new Date(2020, 3, 1)) == "2020,10") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}

	console.log(parseEndTime("13:53", 15));
	console.log(getTimeString("12:44", 20));
	console.log(formatTime("13:33"));
}
test();

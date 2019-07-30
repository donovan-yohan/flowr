import {
	getWeekNumber,
	parseEndTime,
	getTimeString,
	formatTime
} from "../global/mixins";

//import { MONTHS, DAYSOFWEEK, SHORTMONTHS } from "@/global/constants.js";

function testGetWeekNumber() {
	console.log("Testing getWeekNumber:");
	console.log("Test 1:");
	console.log("Input: new Date(2019, 1, 1)");
	console.log("Expected output: 2019,1");
	console.log("Actual Output: " + getWeekNumber(new Date(2019, 1, 1)));
	if (getWeekNumber(new Date(2019, 1, 1)) == "2019,1") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
	console.log();
	console.log("Test 2:");
	console.log("Input: new Date(2020, 3, 1)");
	console.log("Expected output: 2020,10");
	console.log("Actual Output: " + getWeekNumber(new Date(2020, 3, 1)));
	if (getWeekNumber(new Date(2020, 3, 1)) == "2020,10") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}
	console.log();
}

function testParseEndTime() {
	console.log("Testing parseEndTime:");
	console.log("Test 1:");
	console.log("Input: '12:00',15");
	console.log("Expected output: 12:15");
	console.log("Actual Output: " + parseEndTime("12:00", 15));
	if (parseEndTime("12:00", 15) == "12:15") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
	console.log();

	console.log("Test 2:");
	console.log("Input: '13:55',10");
	console.log("Expected output: 14:05");
	console.log("Actual Output: " + parseEndTime("13:55", 10));
	if (parseEndTime("13:55", 10) == "14:05") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}

	console.log();
}

function testGetTimeString() {
	console.log("Testing getTimeString:");
	console.log("Test 1:");
	console.log("Input: \"12:00\",15");
	console.log("Expected output: 12:00 - 12:15 PM");
	console.log("Actual Output: " + getTimeString("12:00", 15));
	if (getTimeString("12:00", 15) == "12:00 - 12:15 PM") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
	console.log();

	console.log("Test 2:");
	console.log("Input: \"13:55\",10");
	console.log("Expected output: 1:55 - 2:05 PM");
	console.log("Actual Output: " + getTimeString("13:55", 10));
	if (getTimeString("13:55", 10) == "1:55 - 2:05 PM") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}
	console.log();
}

function testFormatTime() {
	console.log("Testing formatTime:");
	console.log("Test 1:");
	console.log("Input: 13:33");
	console.log("Expected output: 1:33");
	console.log("Actual Output: " + formatTime("13:33"));
	if (formatTime("13:33") == "1:33") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
	console.log();

	console.log("Test 2:");
	console.log("Input: 4:05");
	console.log("Expected output: 4:05");
	console.log("Actual Output: " + formatTime("4:05"));
	if (formatTime("4:05", 10) == "4:05") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}
	console.log();
}

testGetWeekNumber();
testParseEndTime();
testGetTimeString();
testFormatTime();

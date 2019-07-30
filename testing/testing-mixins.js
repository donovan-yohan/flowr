import * as helpers from "../global/mixins.js";

function testGetWeekString() {
	console.log("-----------------------------------");

	var i = 0;
	console.log("Testing getWeekString from mixins.js");
	console.log(
		"Test 1 - ensure getWeekString returns ThisWeek when passed i = 0"
	);
	console.log("Input: i = 0");
	console.log("Expected Output: This Week");
	console.log("Actual Output: " + helpers.getWeekString(i, true));

	if (helpers.getWeekString(i, true) == "This Week") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}

	// Test 2

	i = 1;

	console.log(
		"Test 2 - ensure getWeekString returns NextWeek when passed i = 1"
	);
	console.log("Input: i = 1");
	console.log("Expected Output: Next Week");
	console.log("Actual Output: " + helpers.getWeekString(i, true));

	if (helpers.getWeekString(i, true) == "Next Week") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}

	//Test 3

	i = 2;

	console.log(
		"Test 3 - ensure getWeekString gets 2 weeks from today's date when passed i = 2"
	);
	console.log("Input: i = 2");
	console.log("Expected Output: Aug 11 - Aug 17");
	console.log("Actual Output: " + helpers.getWeekString(i, true));

	if (helpers.getWeekString(i, true) == "Aug 11 - Aug 17") {
		console.log("Test 3 Successful");
	} else {
		console.log("Test 3 Failed");
	}
}

function testDateToString() {
	console.log("-----------------------------------");

	var date = new Date("December 17, 2019 03:24:00");

	console.log("Testing dateToString from mixins.js");

	console.log(
		"Test 1 - Passing dateToString a date, ensuring that function outputs Date variable as a String"
	);
	console.log("Input: date = December 17, 2019 03:24:00");
	console.log("Expected Output: 2019-12-17");

	console.log("Actual Output: " + helpers.dateToString(date));

	if (helpers.dateToString(date) == "2019-12-17") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
}

function testWeeksFromToday() {
	console.log("-----------------------------------");

	var date = new Date();

	var targetDate = new Date("August 13, 2019 12:00:00");

	console.log("Testing weeksFromToday from mixins.js");
	console.log(
		"Test 1 - Passing getWeeksFromToday today's date and a target date, function will output the number of weeks from today's date to the target date"
	);
	console.log(
		"Input: date = newDate() - will pass today's date to function, targetDate = August 13, 2019 12:00:00"
	);
	console.log("Expected Output: 2");
	console.log("Actual Output: " + helpers.weeksFromToday(date, targetDate));

	if (helpers.weeksFromToday(date, targetDate) == "2") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}

	targetDate = date;

	console.log("Test 2 - Both date and targetDate inputs are the same date");
	console.log(
		"Input: date = newDate() - will pass today's date to function, targetDate = date"
	);
	console.log("Expected Output: 0");
	console.log("Actual Output: " + helpers.weeksFromToday(date, targetDate));

	if (helpers.weeksFromToday(date, targetDate) == "0") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}
}

testGetWeekString();
testDateToString();
testWeeksFromToday();

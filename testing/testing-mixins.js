import * as helpers from "../global/mixins.js";

function testGetWeekString() {
	console.log("Testing getWeekString from mixins.js");

	console.log(
		"Test 1 - ensure getWeekString returns ThisWeek when passed i = 0"
	);

	//Test 1 - ensure getWeekString returns ThisWeek

	var i = 0;

	var testingGetWeekString = helpers.getWeekString(i, true);

	console.log(testingGetWeekString);

	// Test 2 - ensure getWeekString returns NextWeek

	console.log(
		"Test 2 - ensure getWeekString returns NextWeek when passed i = 1"
	);

	i = 1;

	testingGetWeekString = helpers.getWeekString(i, true);

	console.log(testingGetWeekString);

	console.log(
		"Test 3 - ensure getWeekString gets 2 weeks from today's date when passed i = 2"
	);

	i = 2;

	testingGetWeekString = helpers.getWeekString(i, true);

	console.log(testingGetWeekString);

	console.log(
		"Test 4 - ensure getWeekString gets 52 weeks from today's date when passed i = 52"
	);

	i = 52;

	testingGetWeekString = helpers.getWeekString(i, true);

	console.log(testingGetWeekString);
}

function testDateToString() {
	var date = new Date("December 17, 2019 03:24:00");

	var testingDateToString = helpers.dateToString(date);

	console.log(testingDateToString);
}

function testGetWeeksFromToday() {}

testGetWeekString();
testDateToString();

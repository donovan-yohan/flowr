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
	console.log();

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
	console.log();

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
	console.log();
}

function testGetWeekNumber() {
	console.log("Testing getWeekNumber:");
	console.log("Test 1:");
	console.log("Input: new Date(January 1, 2019 0:00:00)");
	console.log("Expected output: 2019,1");
	console.log(
		"Actual Output: " +
			helpers.getWeekNumber(new Date("January 1, 2019 0:00:00"))
	);
	if (helpers.getWeekNumber(new Date("January 1, 2019 0:00:00")) == "2019,1") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
	console.log();
	console.log("Test 2:");
	console.log("Input: new Date(March 1, 2020 0:00:00)");
	console.log("Expected output: 2020,10");
	console.log(
		"Actual Output: " + helpers.getWeekNumber(new Date("March 1, 2020 0:00:00"))
	);
	if (helpers.getWeekNumber(new Date("March 1, 2020 0:00:00")) == "2020,10") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}
	console.log();
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
	console.log();
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
	console.log();
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
	console.log();
}

function testParseEndTime() {
	console.log("Testing parseEndTime:");
	console.log("Test 1:");
	console.log("Input: '12:00',15");
	console.log("Expected output: 12:15");
	console.log("Actual Output: " + helpers.parseEndTime("12:00", 15));
	if (helpers.parseEndTime("12:00", 15) == "12:15") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
	console.log();

	console.log("Test 2:");
	console.log("Input: '13:55',10");
	console.log("Expected output: 14:05");
	console.log("Actual Output: " + helpers.parseEndTime("13:55", 10));
	if (helpers.parseEndTime("13:55", 10) == "14:05") {
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
	console.log("Actual Output: " + helpers.getTimeString("12:00", 15));
	if (helpers.getTimeString("12:00", 15) == "12:00 - 12:15 PM") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
	console.log();

	console.log("Test 2:");
	console.log("Input: \"13:55\",10");
	console.log("Expected output: 1:55 - 2:05 PM");
	console.log("Actual Output: " + helpers.getTimeString("13:55", 10));
	if (helpers.getTimeString("13:55", 10) == "1:55 - 2:05 PM") {
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
	console.log("Actual Output: " + helpers.formatTime("13:33"));
	if (helpers.formatTime("13:33") == "1:33") {
		console.log("Test 1 Successful");
	} else {
		console.log("Test 1 Failed");
	}
	console.log();

	console.log("Test 2:");
	console.log("Input: 4:05");
	console.log("Expected output: 4:05");
	console.log("Actual Output: " + helpers.formatTime("4:05"));
	if (helpers.formatTime("4:05", 10) == "4:05") {
		console.log("Test 2 Successful");
	} else {
		console.log("Test 2 Failed");
	}
	console.log();
}

testGetWeekString();
testGetWeekNumber();
testDateToString();
testWeeksFromToday();
testParseEndTime();
testGetTimeString();
testFormatTime();

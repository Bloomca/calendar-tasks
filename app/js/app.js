define([
	'knockout',
	'Components/calendarGrid',
	'Components/ctrlEnter'
], function(ko) {

	var appEl = document.getElementById('app');

	var MONTHS = "January February March April May June July August September October November \
				  December".split(" ");

	function MonthViewModel (date) {
		if (!date) {
			var newDate = new Date();
			date = {
				year: newDate.getFullYear(),
				month: newDate.getMonth()
			};
		}

		this.date = date;
		this.humanizeDate = MONTHS[date.month] + " " + date.year;


		this.tasks = [];

	}

	function TaskViewModel () {
		this.test = true
	}

	this.test = new TaskViewModel();

	ko.applyBindings(new MonthViewModel(), appEl)

});
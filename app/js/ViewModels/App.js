define([
	'knockout'
], function (ko) {

	var MONTHS = ("January February March April May June July August September October November " +
				"December").split(" ");

	return AppViewModel;

	// main logic
	function AppViewModel () {		

		var newDate = new Date();

		var self = this;

		this.date = ko.observable({
			year: newDate.getFullYear(),
			month: newDate.getMonth()
		});
		this.humanizeDate = ko.computed(function () {
			console.log(self.date().month);
			return MONTHS[self.date().month] + " " + self.date().year;
		});

		this.upMonth = function () {
			var newDate = new Date(self.date().year, self.date().month+1);
			self.date({
				year: newDate.getFullYear(),
				month: newDate.getMonth()
			});
		};

		this.downMonth = function () {
			var newDate = new Date(self.date().year, self.date().month-1);
			self.date({
				year: newDate.getFullYear(),
				month: newDate.getMonth()
			});
		};

	}

});
define(['knockout', 'ViewModels/tooltip'], function (ko, tooltip) {

	var domTooltip = document.getElementById('tooltip');

	var ROW_VALUE = 123,
		COL_VALUE = 146;

	// ViewModel for each day in calendar
	function DayTasks (tasks, date, col, row) {
		// tasks can be added from localStorage
		this.tasks = ko.observableArray(tasks || []);

		// string for tasks in general hash table
		this.dateString = date;

		// value for revealing if number > 3
		this.eventsNumber = ko.computed(function () {
			return this.tasks().length + " events";
		}, this);

		// handler for click on cell
		// we fill tooltip model with current tasks and change it's position
		this.showFull = function () {
			tooltip.active(this);
			tooltip.showTooltip(true);
			tooltip.tasks.removeAll();			
			for (var i = 0; i < this.tasks().length; i++) {
				tooltip.tasks.push(this.tasks()[i]);
			}

			var coords = getCoords(col, row);

			domTooltip.style.left = coords.left + "px";
			domTooltip.style.top = coords.top + "px";
		};
	}

	return DayTasks;

	// adjust coords for tooltip
	function getCoords (col, row) {
		var coords = {
			left: (col + 1) * COL_VALUE + 5,
			top: (row-1) * ROW_VALUE + 110
		};

		// TODO add left and bottom rotate
		// if (col > 4) {
		// 	coords.left -= 3 * COL_VALUE;
		// }

		// if (row > 4) {
		// 	coords.top -= ROW_VALUE;
		// }


		return coords;
	}


});
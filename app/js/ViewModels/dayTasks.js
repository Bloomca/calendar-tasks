define(['knockout', 'ViewModels/tooltip'], function (ko, tooltip) {

	var domTooltip = document.getElementById('tooltip');

	var ROW_VALUE = 120,
		COL_VALUE = 147;

	function DayTasks (tasks, date, col, row) {
		this.tasks = ko.observableArray(tasks || []);

		this.dateString = date;

		this.eventsNumber = ko.computed(function () {
			return this.tasks().length + " events";
		}, this);

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
			left: (col + 1) * COL_VALUE,
			top: row * ROW_VALUE + 33
		};

		if (col > 4) {
			coords.left -= 3 * COL_VALUE;
		}

		if (row > 4) {
			coords.top -= ROW_VALUE;
		}


		return coords;
	}


});
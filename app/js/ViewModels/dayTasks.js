define(['knockout', 'ViewModels/tooltip'], function (ko, tooltip) {

	var domTooltip = document.getElementById('tooltip');

	function DayTasks (tasks, col, row) {
		this.tasks = ko.observableArray(tasks || []);

		this.showFull = function () {
			tooltip.active(this);
			tooltip.showTooltip(true);
			tooltip.tasks.removeAll();
			for (var i = 0; i < this.tasks().length; i++) {
				tooltip.tasks.push(this.tasks()[i]);
			}

			domTooltip.style.left = col * 147 + "px";
			domTooltip.style.top = row * 120 + "px";
		};
	}

	return DayTasks;

});
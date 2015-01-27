define(['knockout', 'ViewModels/tooltip'], function (ko, tooltip) {

	function DayTasks (tasks) {
		this.tasks = ko.observableArray(tasks || []);

		this.showFull = function () {
			tooltip.active(this);
			tooltip.showTooltip(true);
			tooltip.tasks = this.tasks;
			// for (var i = 0; i < this.tasks.length; i++) {
			// 	tooltip.tasks.push(this.tasks[i]);
			// }
		};
	}

	return DayTasks;

});
define([], function () {
	var oldTasks = localStorage && localStorage.getItem('calendar-tasks');

	var tasks = oldTasks ? JSON.parse(oldTasks) : {};

	return tasks;
});
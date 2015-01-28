define([
	'knockout',
	'ViewModels/App',
	'Components/calendarGrid',
	'Components/ctrlEnter'
], function(ko, AppViewModel) {

	var appEl = document.getElementById('app');	

	ko.applyBindings(new AppViewModel(), appEl);
});
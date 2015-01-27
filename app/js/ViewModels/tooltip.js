define(['knockout'], function (ko) {
	var app = document.getElementById('app');
	var el = document.getElementById('tooltip');

	function Tooltip () {
		this.active = ko.observable(null);
		this.tasks = ko.observableArray();
		this.showTooltip = ko.observable(false);
		this.note = ko.observable("");
		this.addNote = function () {
			var text = this.note();
			this.note("");
			this.tasks.push({
				title: text,
				body: text
			});
		};
	}

	var tooltip = new Tooltip();
	ko.applyBindings(tooltip, el);

	// TODO add fading with clicking outside of #app

	return tooltip;
});
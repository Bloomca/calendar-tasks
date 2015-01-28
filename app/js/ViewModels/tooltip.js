define(['knockout', 'Tasks'], function (ko, tasksStorage) {
	var app = document.getElementById('app'),
		el = document.getElementById('tooltip'),
		textarea = el.querySelector('textarea');

	function Tooltip () {
		this.active = ko.observable(null);
		this.tasks = ko.observableArray();
		this.showTooltip = ko.observable(false);
		this.note = ko.observable("");
		this.addNote = function () {
			var text = this.note();
			this.note("");
			textarea.blur();

			var task = {
				title: text,
				body: text
			};

			this.tasks.push(task);

			this.active().tasks.push(task);

			// TODO DRY here and on delete
			tasksStorage[this.active().dateString] = this.active().tasks();

			console.log(tasksStorage);

			updateStorage();
		};

		var self = this;

		this.deleteNote = function (note) {
			self.active().tasks.remove(note);
			self.tasks.remove(note);

			tasksStorage[self.active().dateString] = self.active().tasks();

			updateStorage();
		};

		this.toggleNote = function (note, e) {
			if (e.target.tagName !== "H3") {
				return;
			}
			var cList = e.target.classList;
			cList.contains("active") ? cList.remove("active") : cList.add("active");
		};
	}

	function updateStorage () {
		if (localStorage) {
			localStorage.setItem('calendar-tasks',JSON.stringify(tasksStorage));
		}
	}

	var tooltip = new Tooltip();
	ko.applyBindings(tooltip, el);

	// TODO add fading with clicking outside of #app

	return tooltip;
});
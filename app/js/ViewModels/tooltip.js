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

			var title = text.split('/n')[0];

			if (title.length > 16) {
				title = title.slice(0,15) + '...';
			}
			var task = {
				title: title,
				body: text
			};

			this.tasks.push(task);

			this.active().tasks.push(task);

			// TODO DRY here and on delete
			tasksStorage[this.active().dateString] = this.active().tasks();

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


	var tooltip = new Tooltip();
	ko.applyBindings(tooltip, el);

	// hide tooltip if clicked out of #app
	document.addEventListener('click', function (e) {
		// if el is hidden we don't have to check
		if (isHidden(el)) {
			return;
		}

		var elem = e.target;

		// otherwise we traverse to parent unless null
		while (elem) {
			if (elem === app) {
				return;
			}
			elem = elem.parentNode;
		}

		// we are here if we aren't in #app
		tooltip.showTooltip(false);
	});

	return tooltip;


	// function to write to localStorage
	function updateStorage () {
		if (localStorage) {
			localStorage.setItem('calendar-tasks',JSON.stringify(tasksStorage));
		}
	}

	// hidden elements have no width & height, it's a general check
	function isHidden (elem) {
		return !elem.offsetWidth && !elem.offsetHeight;
	}
});
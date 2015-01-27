define([
	'knockout',
	'ViewModels/dayTasks'
], function(ko, DayTasks) {

	var HEADERS = "SUN MON TUES WEN THU FRI SAT".split(' ');

	
	ko.bindingHandlers.calendarGrid = {
		init: function (el, value) {
			var val = value();
			var date = new Date(val.year, val.month);

			el.innerHTML = "";

			var newEl = document.createElement('tbody');

			var topRow = document.createElement('tr');
			for (var i = 0; i < 7; i++) {
				var colEl = document.createElement('td');
				colEl.classList.add('top');
				colEl.appendChild(document.createTextNode(HEADERS[i]));
				topRow.appendChild(colEl);
			}

			newEl.appendChild(topRow);

			var index = 0;
			var calendar = createCalendar(date);
			console.log(calendar);

			var count = calendar.length / 7;
			for (i = 0; i < count; i++) {
				var listRow = document.createElement('tr');
				var offset = index++ * 7; 
				var row = calendar.slice(offset, offset + 7);
				row.forEach(function (el) {
					var td = document.createElement('td');
					td.setAttribute("data-bind", "click: showFull");
					td.id = Math.random();
					if (el.anotherMonth) {
						td.classList.add('another-month');
					}
					td.innerHTML = '<div class="date-num">' + el.num + '</div>' + 
						'<ul data-bind="foreach: tasks">' + 
							'<li><div data-bind="text: title"></div></li>' +
						'</ul>';
					listRow.appendChild(td);

					//ko.cleanNode(td);
					ko.applyBindings(new DayTasks(null, i, index), td);
				});
				newEl.appendChild(listRow);
			}

			el.appendChild(newEl);
		}
	};

	function createCalendar (date) {
		var res = [];
 
		var startMonth = date;
		var day = startMonth.getDay();

		// add starting days
		if (day) {
			startMonth.setDate(-(day-1));
			var prevMonthDay = startMonth.getDate();
			for (var i = 0; i < day; i++) {
				res.push({
					num: prevMonthDay++,
					anotherMonth: true
				});
			}
		}

		// add days of current month
		var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		for (i = 0; i < newDate.getDate(); i++) {
			res.push({ num: i+1 });
		}

		// fill last cells
		var last = res.length % 7;
		for (i = 0; i < last; i++) {
			res.push({
				num: i+1,
				anotherMonth: true
			});
		}

		return res;
	}

});
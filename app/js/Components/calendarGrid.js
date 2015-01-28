define([
	'knockout',
	'ViewModels/dayTasks',
	'Tasks'
], function(ko, DayTasks, tasksStorage) {

	var HEADERS = "SUN MON TUES WEN THU FRI SAT".split(' ');
	
	ko.bindingHandlers.calendarGrid = {
		init: function (el, value) {

			// subscribe to object's updates due to problems with `update` function
		    value().subscribe(function(newValue) {
		        console.log('update called');
		        updateCalendar(newValue);
		    });

		    // start default case with current month
		    var newDate = new Date();

		    updateCalendar({
		    	year: newDate.getFullYear(),
				month: newDate.getMonth()
		    });

		    // create markup for calendar structure
		    function updateCalendar (value) {
				var val = value;
				var date = new Date(val.year, val.month);

				// clear DOM's el
				// it isn't very safe because of memory leaks
				// we should unref all knockout's objects manually
				// but for prototype it's ok
				el.innerHTML = "";

				// tbody for valid HTML
				var newEl = document.createElement('tbody');

				// list of days' titles
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

				// markup for calendar
				var count = calendar.length / 7;
				for (i = 0; i < count; i++) {
					var listRow = document.createElement('tr');
					var offset = index++ * 7; 
					var row = calendar.slice(offset, offset + 7);

					// TODO change to some template engine
					// and put template to separate file
					row.forEach(function (el, i) {
						var td = document.createElement('td');
						td.setAttribute("data-bind", "click: showFull");
						td.id = Math.random();
						if (el.anotherMonth) {
							td.classList.add('another-month');
						}
						td.innerHTML = '<div class="date-num">' + el.num + '</div>' + 
							'<div class="events-number" ' + 
								 'data-bind="text: eventsNumber, visible: tasks().length > 3"></div>' + 
							'<ul data-bind="foreach: tasks">' + 
								'<li class="item"><div data-bind="text: title"></div></li>' +
							'</ul>';
						listRow.appendChild(td);

						ko.applyBindings(new DayTasks(tasksStorage[el.date], el.date, i, index), td);
					});
					newEl.appendChild(listRow);
				}

				// append in the end, just because of faster render
				el.appendChild(newEl);
		    }

			
		}
	};

	// general function that creates array of calendar's days
	function createCalendar (date) {
		var res = [];
 
		var startMonth = new Date(+date);
		var day = startMonth.getDay(),
			curMonth = date.getMonth(),
			curDate = date.getFullYear() + '-' + curMonth + '-';

		// add starting days from previous month
		if (day) {
			startMonth.setDate(-(day-1));
			var prevMonthDay = startMonth.getDate();
			for (var i = 0; i < day; i++) {
				res.push({
					num: prevMonthDay,
					date: startMonth.getFullYear() + '-' + startMonth.getMonth() + '-' + prevMonthDay++,
					anotherMonth: true
				});
			}
		}

		// add days of current month
		var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		for (i = 0; i < newDate.getDate(); i++) {
			res.push({ 
				num: i+1,
				date: curDate + (i+1)
			});
		}

		// fill last cells with next month's days
		var last = res.length % 7,
			nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
		for (i = 0; i < last; i++) {
			res.push({
				num: i+1,
				date: nextMonth.getFullYear() + '-' + nextMonth.getMonth() + '-' + (i+1),
				anotherMonth: true
			});
		}

		return res;
	}

});
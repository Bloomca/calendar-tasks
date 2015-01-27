define(['knockout'], function (ko) {
	ko.bindingHandlers.ctrlEnter = {
		init: function (el, value) {
			el.addEventListener('keydown', function (e) {
				if (e.keyCode === 17) {
					el.addEventListener('keydown', enterHandler);
				}
			});

			el.addEventListener('keyup', function () {
				el.removeEventListener('keydown', enterHandler);
			});

			function enterHandler (e) {
				if (e.keyCode === 13) {
					value(el);
				}
			}
		}
	};
});
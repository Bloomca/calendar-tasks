define(['knockout'], function (ko) {

	// custom binding for ctrl + enter handle
	ko.bindingHandlers.ctrlEnter = {
		init: function (el, value) {
			// listen for ctrl
			el.addEventListener('keydown', function (e) {
				// after ctrl we start listen to enter
				if (e.keyCode === 17) {
					el.addEventListener('keydown', enterHandler);
				}
			});

			// delete handler to prevent memory leaks
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
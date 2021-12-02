const main = ((d, w, $) => {
	let init;
	init = init || {};

	const ui  = () => {
		const loadHeader = () => {
			$('header').load("../header.html");
		};

		loadHeader();
	}

	init = () => {
		ui();
	}

	return init;
})(document, window, jQuery);

$(document).ready(main);
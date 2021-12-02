const main = (function(d, w, $)  {
	let init;
	init = init || {};

	const ui  = function() {
		const $item = $("article.item");
		const $section = $("section");
		const itemSize = $item.size();
		const widItem = $item.outerWidth(true);
		const widSec = widItem * itemSize;
		const $scrollInfo = $('.scrollInfo');

		const setSize = function() {
			$section.width(widSec);
			$("body").height(widSec);	
		};

		const onEffect = function() {
			const timer = 500;
			const lastOrder = 4;

			setTimeout(function() {
				$scrollInfo.fadeIn();
			}, 100);

			$item.each(function(i, el) {
				if (i < lastOrder) {
					setTimeout(function() {
						$(el).find('a').addClass('on');
						$(el).prev().find('a').removeClass('on');

						if (i === lastOrder - 1) {
							setTimeout(function() {
								$(el).find('a').removeClass('on');
							}, timer);
						}
					}, i * timer);
				}
			})
		};

		const initScroll = function() {
			if ($(w).scrollTop() !== 0) {
				return;
			}

			setTimeout(function() {
				$('html').animate({
					scrollTop: $(d).height()
				}, onEffect);
			}, 800);
		};

		const moveScroll = function(_this) {
			const scrollTop = $(_this).scrollTop();

			$section.stop().animate({"right": -scrollTop},600);
		};

		const loadHeader = function() {
			$('header').load("../header.html");
		};

		const showScoll = function(_this) {
			const scrollTop = $(_this).scrollTop();
			const isBottom = scrollTop + w.innerHeight == $(d).height()

			if (isBottom && $scrollInfo.css('display') === 'none') {
				$scrollInfo.fadeIn();
			}
		};

		initScroll();
		setSize();
		loadHeader();
		showScoll();

		$(w).on("scroll", function() {
			moveScroll(this);
			showScoll(this)
		});
	}

	init = function() {
		ui();
	}

	return init;
})(document, window, jQuery);

$(document).ready(main);
















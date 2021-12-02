const main = ((d, w, $) => {
	let init;
	init = init || {};

	const ui  = () => {
		const $item = $("article.item");
		const $section = $("section");
		const itemSize = $item.size();
		const widItem = $item.outerWidth(true);
		const widSec = widItem * itemSize;
		const $scrollInfo = $('.scrollInfo');

		const setSize = () => {
			$section.width(widSec);
			$("body").height(widSec);	
		};

		const onEffect = () => {
			const timer = 500;
			const lastOrder = 4;

			setTimeout(() => {
				$scrollInfo.fadeIn();
			}, 100);

			$item.each(function(i, el) {
				if (i < lastOrder) {
					setTimeout(function() {
						$(el).find('a').addClass('on');
						$(el).prev().find('a').removeClass('on');

						if (i === lastOrder - 1) {
							setTimeout(() => {
								$(el).find('a').removeClass('on');
							}, timer);
						}
					}, i * timer);
				}
			})
		};

		const initScroll = () => {
			if ($(w).scrollTop() !== 0) {
				return;
			}

			setTimeout(() => {
				$('html').animate({
					scrollTop: $(d).height()
				}, onEffect);
			}, 800);
		};

		const moveScroll = (_this) => {
			const scrollTop = $(_this).scrollTop();

			$section.stop().animate({"right": -scrollTop},600);
		};

		const loadHeader = () => {
			$('header').load("../header.html");
		};

		const showScoll = (_this) => {
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

		$(w).on("scroll", () => {
			moveScroll(this);
			showScoll(this)
		});
	}

	init = () => {
		ui();
	}

	return init;
})(document, window, jQuery);

$(document).ready(main);
















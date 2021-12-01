const init = () => {
	const $item = $("article.item");
	const $section = $("section");
	const itemSize = $item.size();
	const widItem = $item.outerWidth(true);
	const widSec = widItem * itemSize;

	const setSize = () => {
		$section.width(widSec);
		$("body").height(widSec);	
	};

	const onEffect = () => {
		const timer = 500;
		const lastOrder = 4;

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
		setTimeout(() => {
			$('html').animate({
				scrollTop: $(document).height()
			}, onEffect);
		}, 700);
	};

	const moveScroll = (_this) => {
		const scrollTop = $(_this).scrollTop();

		$section.stop().animate({"right": -scrollTop},600);
	};

	initScroll();
	setSize();
	
	$(window).on("scroll", () => {
		moveScroll(this);
	});
}

$(document).ready(init);
















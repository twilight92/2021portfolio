const init = () => {
	const $item = $("article.item");
	const itemSize = $item.size();
	const widItem = $item.outerWidth(true);
	const widSec = widItem * itemSize;
	const $section = $("section");

	const setSize = () => {
		$section.width(widSec);
		$("body").height(widSec);	
	};

	const initScroll = () => {
		setTimeout(() => {
			$(document).scrollTop($(document).height(), 1000);
			
		}, 500);
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
















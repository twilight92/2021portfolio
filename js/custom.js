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

	const moveScroll = (_this) => {
		const scrollTop = $(_this).scrollTop();

		$section.stop().animate({"right": -scrollTop},600);
	};

	setSize();
	
	$(window).on("scroll", () => {
		moveScroll(this);
	});
}

$(document).ready(init);
















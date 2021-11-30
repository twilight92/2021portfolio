const init = () => {
	const $item = $("article.item");
	const winwWidth = $(window).width();
	const numAc = $item.size();
	const articleWidth = $item.outerWidth(true);
	const widSec = articleWidth * numAc;
	const widTotal = widSec+600;
	const $section = $("section");
	const initLeft = $section.offset().left;

	const setSize = () => {
		$section.width(widTotal);
		$("body").height(widSec);	
	};

	const moveScroll = (_this) => {
		const scroll = $(_this).scrollTop();
		const scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
		const amount = scrollBottom === 0 ? winwWidth - initLeft - scroll : initLeft - scroll;

		$section.stop().animate({"left": amount},600);
	}

	setSize();
	
	$(window).on("scroll", () => {
		moveScroll(this);
	});
}

$(document).ready(init);
















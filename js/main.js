const main = (function(d, w, $)  {
	let init;
	init = init || {};

	const data = function() {
		const setHTML = function(objData) {
			const HTML = function(obj, index) {
				return '<article class="item">' +
							'<a href="detail.html?index='+ index + '">' +
								'<div class="item_thumb">' +
									'<img src="/img/item_' + obj.image + '.jpg">' +
								'</div>' +
								'<div class="item_info">' +
									'<span>' + obj.client + '</span>' +
									'<h1>' + obj.name + '</h1>' +
								'</div>' +
							'</a>' +
						'</article>';
			};

			objData.forEach(function(item, i) {
				$('section')
					.append(HTML(item, i))
					.ready(function() {
						if (objData.length - 1 !== i) {
							return;
						}

						ui();
					});
			});
		};

		const getJSONDetail = function(data) {
			setHTML(data)
		};

		// 로컬용
		const jsonSrc = '../json/data.json';
		$.getJSON(jsonSrc, getJSONDetail);
	};

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
			const setParam = function() {
				if (getParam('apply') === '') {
					return;
				}

				const href = $('#navi li a').attr('href');
				$('#navi li a').attr('href', href + '?apply=' + getParam('apply'));

				const indexHref = $('header h1 a').attr('href');
                $('header h1 a').attr('href', indexHref + '?apply=' + getParam('apply'));

				$('section .item').each(function(i, item) {
					const href = $(item).find('a').attr('href');
					$(item).find('a').attr('href', href + '&apply=' + getParam('apply'));
				});
			};

			$('header').load("../header.html", setParam);
		};

		const loadSignature = function() {
			$('.signature').load("../signature.html");
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
		loadSignature();
		showScoll();

		$(w).on("scroll", function() {
			moveScroll(this);
			showScoll(this);
		});
	};

	const getParam = function(paramName) {
		let params = location.search.substr(location.search.indexOf("?") + 1);
		let paramValue = "";

		params = params.split("&");

		for (let i = 0; i < params.length; i++) {
			temp = params[i].split("=");
			if ([temp[0]] == paramName) { paramValue = temp[1]; }
		}

		return paramValue;
	};

	init = function() {
		data();
	};

	return init;
})(document, window, jQuery);

$(document).ready(main);
















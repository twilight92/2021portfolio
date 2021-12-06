const main = (function(d, w, $)  {
	let init;
	init = init || {};

	const ui  = function() {
		const loadHeader = function() {
			$('header').load("../header.html");
		};

		const loadSignature = function() {
			$('.signature').load("../signature.html");
		};

		loadHeader();
		loadSignature();
	};

    const data = function() {
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

        const getJSONDetail = function(data) {
            data.forEach(function(item, i) {
                const tagHTML = function(tag) {
                    return tag.reduce((acc, cur) => {
                        cur = '<li>' + cur + '</li>'
                        return acc + cur;
                    }, '');
                };

                const HTML = function(obj) {
                    return '<div class="slideItem">' +
                            '<div class="imageWrap">' +
                                    '<div class="item_thumb"><img src="img/item_' + obj.image + '.jpg" alt=""></div>' +
                                '</div>' +
                                '<div class="info">' +
                                    '<div class="title">' +
                                        '<p class="title_client">' + obj.client + '</p>' +
                                        '<h1 class="title_name">' + obj.name + '</h1>' +
                                    '</div>' +
                                    '<ul class="workData">' +
                                        '<li>' +
                                            '<strong>링크</strong> - <a href="#">바로가기</a>' +
                                        '</li>' +
                                        '<li>' +
                                            '<strong>기여도</strong> - <span class="contribution">' + obj.work.contribution + '</span>%' +
                                        '</li>' +
                                        '<li>' +
                                            '<strong>작업기간</strong> - <span class="period">' + obj.work.period + '</span>' +
                                        '</li>' +
                                    '</ul>' +
                                    '<p class="detail">' + obj.info + '</p>' +
                                    '<ul class="tag">' + tagHTML(obj.tag) + '</ul>' +
                                '</div>' +
                            '</div>'
                };

                $('.slideWrap')
                    .append(HTML(item))
                    .ready(function() {
						if (data.length - 1 !== i) {
							return;
						}

                        const slideOption = {
                            initialSlide: parseInt(getParam('index'))
                        }

						$('.slideWrap').slick(slideOption);
					});
            });
        };

        // 로컬용
        const jsonSrc = '../json/data.json';
        $.getJSON(jsonSrc, getJSONDetail);
    }

	init = function() {
		ui();
        data();
	}

	return init;
})(document, window, jQuery);

$(document).ready(main);
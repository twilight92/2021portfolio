const main = (function(d, w, $)  {
	let init;
	init = init || {};

	const ui  = function() {
		const loadHeader = function() {
			$('header').load("../header.html");
		};

		loadHeader();
	}

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

        const setHTML = function(objData) {
            $('.item_thumb').html(`<img src="img/${objData.image}.jpg" alt="">`);
            $('.title_client').text(`${objData.client}`);
            $('.title_name').text(`${objData.name}`);
            $('.contribution').text(`${objData.work.contribution}`);
            $('.period').text(`${objData.work.period}`);
            $('.detail').html(`${objData.info}`);
            objData.tag.forEach(function(item) {
                $('.tag').append(`<li>${item}</li>`)
            })
        };

        const getJSONDetail = function(data) {
            setHTML(data[getParam('index')])
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
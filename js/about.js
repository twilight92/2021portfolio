const main = (function(d, w, $)  {
	let init;
	init = init || {};

	const ui  = function() {
        const loadHeader = function() {
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

        const setHref = function($el, param) {
            if (param === undefined) {
                param = 'apply';
            }

            const href = $el.attr('href');
            $el.attr('href', href + '?' + param + '=' + getParam(param));
        };

        const setParam = function() {
            if (getParam('apply') === '') {
                return;
            }

            setHref($('#navi li a'));
            setHref($('header h1 a'));
        };

        $('header').load("./header.html", setParam);
    };

		const loadSignature = function() {
			$('.signature').load("./signature.html");
		};

        const sKvFrame = '.kv-frame-con',
            sKvBg = '.kv-bg';

        const frameIdx = 0;
        const kvMotion = {
            select : {
                aBgList : ['note9']	
            },
            appendBg : function(){
                const $self = this;
                const bgHtml = '<div class="kv-bg"></div>';

                $.each($self.select.aBgList, function(i){
                    $(sKvFrame).prepend(bgHtml);	
                });
                
                $(sKvFrame).find(sKvBg).each(function(i){
                    $(this).css('background-image', 'url(img/frame/' + $self.select.aBgList[i] + '.png)');
                    if( i === $(sKvFrame).find(sKvBg).length -1 ){
                        $(this).addClass('color-animate')
                    }
                })
            },
            fadeOut : function () {
                $('.kv-bg.color-animate').one('oanimationend animationend webkitAnimationEnd', function () {
                    $('.kv').fadeOut(function() {
                        $('.aboutMe').fadeIn(function() {
                            $('.hello').typed(typedOpt.title);
                            setTimeout(function() {
                                $('.introduceMe').fadeIn();
                            }, 1000);
                        });
                    });
                    $("body").off("mousemove");
                });

            }
        }

        const movePen = function(){
            $("body").on("mousemove",function(e){		
                const posX= e.pageX;
                const posY= e.pageY;
                $(".pen").css({"right":-200+(posX/20) , "bottom":-200+(posY/20) });
            });
        };

        (function(){
            const get = {
                paramVal: function (name) {
                    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(location.search);
                    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            }
            const PARAMVALUE = get.paramVal('apply');
            switch (PARAMVALUE) { case "eb": oApplyName = { en: "ZUJheQ==", kr: "", txt: "" }; break; default: oApplyName = { en: "", kr: "", txt:"" } }
        })();

        /**
        *
        *  Base64 encode / decode
        *  http://www.webtoolkit.info/
        *
        **/
        const Base64 = {

            // private property
            _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode : function (input) {
                let output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                let i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            // public method for decoding
            decode : function (input) {
                let output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                let i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = Base64._utf8_decode(output);

                return output;

            },

            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                let utftext = "";

                for (let n = 0; n < string.length; n++) {

                    let c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode : function (utftext) {
                let string = "";
                let i = 0;
                let c = c1 = c2 = 0;

                while ( i < utftext.length ) {

                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }

                }

                return string;
            }
        }

        const checkParam = {
            changeText : function(){
                $('.company').text(Base64.decode(oApplyName.en));
            }
        };

        const checkCompany = function() {
            if (oApplyName.en === undefined) {
                return '';
            }

            return ' ' + Base64.decode(oApplyName.en)
        }

        const typedOpt = {
            title: {
                strings: ['안녕하세요' + checkCompany() + '!<br>만나서 반갑습니다.'],
                typeSpeed: 30,
                loop: false,
                showCursor: false,
                contentType: 'html'
            },
        }

		loadHeader();
		loadSignature();
        kvMotion.appendBg();
		kvMotion.fadeOut();
        movePen();
        checkParam.changeText()

        // if(oApplyName.en !== '') checkParam.changeText();
	};

	init = function() {
		ui();
	}

	return init;
})(document, window, jQuery);

$(document).ready(main);
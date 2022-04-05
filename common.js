Common={
	version:'2.1',
	
	/**
	 * 배열에서 대상 요소 삭제
	 * @param array
	 * @param item
	 */
	removeArrayItem:function(array, item){
		for(let i in array){
			if(array[i]===item){
				array.splice(i,1);
				break;
			}
		}
		
		return array;
	},
	
	/**
	 * 쿠키생성
	 * @doc setCookie|쿠키생성
	 * @param name
	 * @param [value]
	 * @param {object} [setOption]
	 * @cfg Common.setCookie_option.days {int} [days]
	 * @cfg Common.setCookie_option.path {string} [path]
	 */
	setCookie: function (name, value, setOption) {
		let _this = this;
		// 기본값은 맴버변수
		let _option = _this.setCookie_option;

		// 인자로 받아온 옵션이 있다면 적용
		if( typeof setOption == 'object' ){
			_option = $.extend({}, _option, setOption);
		}

		if( !value ){ value = "1" }
		let days = _option.days;
		let path = _option.path;

		let _date = new Date();
		_date.setTime(_date.getTime() + (parseInt(days) * 24 * 60 * 60 * 1000));
		document.cookie = name + "=" + encodeURI(value) +
			((path) ? "; path=" + path : "") +
			((days) ? "; expires=" + _date.toUTCString() : "");
	},
	setCookie_option:{
		days:0 // {int} [days]
		, path:'/' // {string} [path]
	},

	/**
	 * 쿠키 가져오기
	 * @doc getCookie|쿠키 가져오기
	 * @param name
	 * @returns {*}
	 */
	getCookie: function (name) {
		let _name = name + "=";
		let _arrCookie = document.cookie.split(';');
		for (let i = 0; i < _arrCookie.length; i++) {
			let _cookie = _arrCookie[i];
			while (_cookie.charAt(0) === ' ')
				_cookie = _cookie.substring(1, _cookie.length);
			if (_cookie.indexOf(_name) === 0) return decodeURI(_cookie.substring(_name.length, _cookie.length));
		}
		return null;
	}
};

if( typeof jQuery == 'function' ){
	jQuery(function($){
		let ver_cookie = Common.getCookie('version');
		let this_ver = Common.version;
		if( ver_cookie !== this_ver ){
			Common.setCookie('ext_list', '', {days:-1});
			Common.setCookie('target_select', '', {days:-1});
			Common.setCookie('version', this_ver);
		}
	});
};
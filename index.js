/**
 * 쿠키에 저장된 타겟 값을 선택
 */
function checked_target_select(){
	let cookie_target_select = Common.getCookie('target_select');
	let el_target_select = $("input[name='target_select']");
	el_target_select.attr({checked:false}).prop({checked:false});
	$(`input[name='target_select'][value='${cookie_target_select}']`).attr({checked:true}).prop({checked:true});
}

/**
 * 현재 선택된 대상 값을 쿠키로 저장
 */
function save_cookie_target_select(){
	let target_select = $("input[name='target_select']:checked").val();
	Common.setCookie('target_select', target_select);
}

/**
 * 파일 타겟 선택 박스
 */
function toggle_target_select_wrap(){
	let el_target_select = $("input[name='target_select']:checked");
	let target_select = el_target_select.val();
	let el_targetSelectWrap = $(".targetSelectWrap");
	el_targetSelectWrap.addClass('display_none');
	if( target_select === 'target' ){
		el_targetSelectWrap.removeClass('display_none');
	}
}

/**
 * 선택된 타겟 목록을 뿌린다.
 */
function target_select_view(){
	let el_selectExtList = $(".selectExtList");
	let ext_list = el_selectExtList.data('ext-list');
	let ext_list_arr = ext_list.split('|');
	
	let ext_html = '';
	ext_list_arr.forEach(function(ext, idx){
		if( $.trim(ext) === '' ) return true;
		ext_html += `<a class="ui teal label btnExt" href="#" data-ext="${ext}">${ext}&nbsp;✖</a>`;
	});
	
	el_selectExtList.html(ext_html);
}

/**
 * 선택 확장자 배열에서 대상을 지운다
 * @param target_ext
 */
function delete_target(target_ext){
	let el_selectExtList = $(".selectExtList");
	let ext_list = el_selectExtList.data('ext-list');
	let ext_list_arr = ext_list.split('|');
	let new_ext_arr = Common.removeArrayItem(ext_list_arr, target_ext);
	let ext_list_str = new_ext_arr.join('|');
	el_selectExtList.data('ext-list', ext_list_str).attr('data-ext-list', ext_list_str);
}

/**
 * 로그를 파일 목록으로 변환
 */
function log_change(){
	let el_from_log = $("#from_log");
	let prev_log_text = el_from_log.val();
	
	let check_target = ['Modified', 'Rename', 'Added', 'Deleted'];
	
	let log_text_arr = [];
	let next_log_text = '';
	if( prev_log_text !== '' ){
		check_target.forEach(function(target, idx){
			const regexp = new RegExp(`${target}:.+\n`,'g');
			const matches = prev_log_text.matchAll(regexp);
			for (const match of matches) {
				// console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
				let text_line = match[0];
				let log_text = text_line.replace(`${target}:`, '');
				log_text = $.trim(log_text);
				log_text_arr.push(log_text);
			}
		});
	}
	log_text_arr = Array.from(new Set(log_text_arr));
	next_log_text = log_text_arr.join("\n");
	$("#to_log").val(next_log_text);
}

if( typeof jQuery == 'function' ){
	jQuery(function($){
		$('.ui.radio.checkbox').checkbox();
		checked_target_select();
		toggle_target_select_wrap();
		target_select_view();

		let el_target_select = $("input[name='target_select']");
		el_target_select.on('change', function(){
			toggle_target_select_wrap();
			save_cookie_target_select();
		});
		
		// from 이 변경되면 to 로 변환
		let el_from_log = $("#from_log");
		el_from_log.on('keyup', function(){
			log_change();
		});
		el_from_log.on('change', function(){
			log_change();
		});
		
		// 복사하기
		let clipboard = new ClipboardJS('#copy_clipboard');
		clipboard.on('success', function(e) {
			let el_copied_alert = $("#copied_alert");
			el_copied_alert.removeClass('display_none');
			let time_out = setTimeout(function(){
				el_copied_alert.addClass('display_none');
				clearTimeout(time_out);
			}, 500);
		});
		
		// 선택된 타겟 삭제
		$("body").on('click', '.btnExt', function(e){
			let ext = $(this).data('ext');
			delete_target(ext);
			target_select_view();
			e.preventDefault();
			return false;
		});
	});
}
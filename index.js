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

function toggle_target_select_wrap(){
	let el_target_select = $("input[name='target_select']:checked");
	let target_select = el_target_select.val();
	let el_targetSelectWrap = $(".targetSelectWrap");
	el_targetSelectWrap.addClass('display_none');
	if( target_select === 'target' ){
		el_targetSelectWrap.removeClass('display_none');
	}
}

function log_change(){
	let el_from_log = $("#from_log");
	let prev_log_text = el_from_log.val();
	
	let check_target = ['Modified', 'Rename', 'Added', 'Deleted'];
	
	let log_text_arr = [];
	let next_log_text = '';
	if( prev_log_text !== '' ){
		const regexp = new RegExp('Deleted:.+\n','g');
		const matches = prev_log_text.matchAll(regexp);
		for (const match of matches) {
			// console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
			let text_line = match[0];
			let log_text = text_line.replace('Deleted:', '');
			log_text = $.trim(log_text);
			log_text_arr.push(log_text);
		}
	}
	next_log_text = log_text_arr.join("\n");
	$("#to_log").val(next_log_text);
}

if( typeof jQuery == 'function' ){
	jQuery(function($){
		$('.ui.radio.checkbox').checkbox();
		checked_target_select();
		toggle_target_select_wrap();

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
	});
}
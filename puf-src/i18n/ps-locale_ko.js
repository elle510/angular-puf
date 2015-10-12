;(function($){
/**
 * ps-locale_en.js
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/05/25
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * $ps_locale.validators.passwordErrorMsg
**/
$ps_locale = {};
$.extend($ps_locale,{
	cancel: '취소',
	finish: '마침',
	next: '다음',
	prev: '이전',
	loading: '로딩중...',
	apply: '적용',
	validators: {
		passwordErrorMsg: '영문자, 숫자 혼합으로 8자 이상 입력하세요.',
		ipErrorMsg: 'ip 형식이 올바르지 않습니다.'
	},
	grid: {
		recordtext: 'View {0} - {1} of {2}',
		emptyrecords: '데이터가 존재하지 않습니다.',
		loadtext: '로딩중...',
		pgtext : 'Page {0} of {1}'
	},
	wizard: {
		current: "현재 단계:",
		pagination: "페이지 번호"
	}
});
})(jQuery);

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
	validators : {
		passwordErrorMsg: "영문자, 숫자 혼합으로 8자 이상 입력하세요.",
		ipErrorMsg: "ip 형식이 올바르지 않습니다."
	},
	grid : {
		recordtext: "View {0} - {1} of {2}",
		emptyrecords: "데이터가 존재하지 않습니다.",
		loadtext: "로딩중...",
		pgtext : "Page {0} of {1}"
	}
});
})(jQuery);

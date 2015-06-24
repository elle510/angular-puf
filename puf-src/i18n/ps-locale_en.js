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
		passwordErrorMsg: "Enter at least 8 characters, numbers",
		ipErrorMsg: "No records to view",
		loadtext: "Loading...",
		pgtext : "Page {0} of {1}"
	},
	grid : {
		recordtext: "View {0} - {1} of {2}",
        emptyrecords: "No records to view",
        loadtext: "Loading...",
        pgtext : "Page {0} of {1}"
	}
});
})(jQuery);

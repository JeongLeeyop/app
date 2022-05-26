//쿠키 입력
function setCookie(name, value, exp) {
	var date = new Date();
	date.setTime(date.getTime() + exp*24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}
//쿠키 얻기
function getCookie(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? value[2] : null;
}
//쿠키 삭제
function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

$(document).ready(function() {
	var email = getCookie("email"); ;

	$("input[name=email]").val(email);

	if($("input[name=email]").val() != ""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
		$("#idSaveCheck").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
	}

	$("#idSaveCheck").change(function(){ // 체크박스에 변화가 있다면,
		if($("#idSaveCheck").is(":checked")){ // ID 저장하기 체크했을 때,
			setCookie("email", $("input[name=email]").val(), 30 ); // 30일 동안 쿠키 보관
		}else{ // ID 저장하기 체크 해제 시,
			deleteCookie('email');
		}
	});

	// ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
	$("input[name=email]").keyup(function() {
		if ($("#idSaveCheck").is(":checked")) {
			setCookie("email", $("input[name=email]").val(), 30 ); // 30일 동안 쿠키 보관
		}
	});
});
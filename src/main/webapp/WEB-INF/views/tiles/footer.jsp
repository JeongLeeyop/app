<!-- Jquery JS-->
<script src="vendor/jquery-3.2.1.min.js"></script>
<!-- Bootstrap JS-->
<script src="vendor/bootstrap-4.1/popper.min.js"></script>
<script src="vendor/bootstrap-4.1/bootstrap.min.js"></script>
<!-- Vendor JS -->
<script src="vendor/slick/slick.min.js">
</script>
<script src="vendor/wow/wow.min.js"></script>
<script src="vendor/animsition/animsition.min.js"></script>
<script src="vendor/bootstrap-progressbar/bootstrap-progressbar.min.js">
</script>
<script src="vendor/counter-up/jquery.waypoints.min.js"></script>
<script src="vendor/counter-up/jquery.counterup.min.js">
</script>
<script src="vendor/circle-progress/circle-progress.min.js"></script>
<script src="vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
<script src="vendor/chartjs/Chart.bundle.min.js"></script>
<script src="vendor/select2/select2.min.js">
</script>

<!-- Main JS-->
<script src="js/main.js"></script>
<!-- full calendar requires moment along jquery which is included above -->
<script scr="vendor/fullcalendar-3.10.0/gcal.js"></script>
<script src="vendor/fullcalendar-3.10.0/lib/moment.min.js"></script>
<script src="vendor/fullcalendar-3.10.0/fullcalendar.js"></script>
<!-- blockUI -->
<!-- include jQuery -->
<%--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>--%>
<!-- include BlockUI -->
<script src="vendor/blockui-master/jquery.blockUI.js"></script>

<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- select2 JS -->
<%--<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />--%>
<%--<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>--%>


<script type="text/javascript">
    $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
    /*    $(document).ready(function () {});
        $(window).on('load', function () {});*/


    var toggle = 0;

    //선택된 auth클래스 id를 가지고 class로 넘어가기
    function ClassPage(classId){
        var authClassIdx = $(classId).data('id');

        document.write('<form action="class" id="smb_form" method="post"><input type="hidden" id="authClassIdx" name="authClassIdx" value="'+ authClassIdx +'"></form>');
        document.getElementById("smb_form").submit();
    }

    $(function () {

        ////////////////////////////////////////////////////////////////////
        //                                                                //
        //                         로그인 설정                             //
        //                                                                //
        ////////////////////////////////////////////////////////////////////

        //자동로그인
        /*  $.ajax({
              url : "/test", //서버요청주소
              type : "post",//요청방식 (get,post,patch,delete,put)
              dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
              success : function(result) {

              }, //성공했을때
              error : function(request) {
                  alert(request.responseText);
              }
          });// 실패했을때*/


        //로그인 세션 확인
        var Account = "<%=session.getAttribute("Account")%>";


        if (Account == "null") {
            alert("This service requires login.");
            location.href = "login";
        }

        //로그 아웃
        $("#logout").on("click", function () {
            alert("You are logged out.");
            /*


            <%
                                    response.setHeader("cache-control","no-cache");
                                    response.setHeader("expires","0");
                                    response.setHeader("pragma","no-cache");
                                    %>*/
            sessionStorage.clear();
            location.href = "logout";
        });


        ////////////////////////////////////////////////////////////////////
        //                                                                //
        //                           시즌 메뉴                             //
        //                                                                //
        ////////////////////////////////////////////////////////////////////


        //시즌을 선택했을때 선택된 시즌id를 세션에 저장
        $("#SeasonSelect").on('change',function(){
            sessionStorage.setItem("curSeasonIdx", $(this).find('option:selected').data('id'));
            location.href="attendance";
        });

        //프로필 메뉴에 시즌 목록 출력
        $.ajax({
            url: "/findSeasonList", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                // sessionStorage.clear();
                //기본 폼을 비우고
                $("#SeasonSelect").empty();

                //시즌 목록을 출력
                $.each(result, function (index, item) {
                    $("#SeasonSelect").append("<option data-id=\"" + item.seasonIdx + "\" value=\"" + index + "\">" + item.seasonName + "</option>");
                });

                //시즌 선택을 한번도 하지 않은 경우 제일 최근 시즌의 id를 저장
                if (sessionStorage.getItem("curSeasonIdx") == null) {
                    $.ajax({
                        url: "/SeasonInit", //서버요청주소
                        type: "post",//요청방식 (get,post,patch,delete,put)
                        //왜 여기를 동기방식으로 바꾸면 될까?
                        //이 ajax가 끝난 뒤에 다음 코드가 실행되기 떄문!
                        async: false,
                        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                        success: function (result2) {
                            sessionStorage.setItem("curSeasonIdx",result2);
                        }, //성공했을때
                        error: function (request) {
                            alert(request.responseText);
                        }// 실패했을때
                    });
                    // sessionStorage.setItem('curSeasonIdx',result[0].seasonIdx);

                    //시즌을 선택할 경우 선택된 시즌의 id를 저장
                } else {
                    $("#SeasonSelect").find("option[data-id=\'"+sessionStorage.getItem("curSeasonIdx")+"\']").prop("selected",true);
                    // console.log(sessionStorage.getItem("curSeasonIdx"));
                }

                //현재 선택된 시즌 출력
                // console.log($("#SeasonSelect").find('option:selected').data('id'));

                ////////////////////////////////////////////////////////////////////
                //                                                                //
                //                           클래스 메뉴                           //
                //                                                                //
                ////////////////////////////////////////////////////////////////////

                //좌측 메뉴에 클래스 목록 출력
                $.ajax({
                    url: "/findAuthClassList", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data : "curSeasonIdx="+sessionStorage.getItem("curSeasonIdx"),
                    dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function (result) {
                        $.each(result, function (index, item) {
                            console.log(item);
                            $("#classList").append("<li><a href=\"#\"; onclick=\"ClassPage(this);\" data-id=\""+item.authclass+"\">" + item.classname + "</a></li>");
                            $("#classListMobile").append("<li><a href=\"#\"; onclick=\"ClassPage(this);\" data-id=\""+item.authclass+"\">" + item.classname + "</a></li>");
                        });



                        //클래스가 없으면 없다고 출력
                    }, //성공했을때
                    error: function (request) {
                        // alert(request.responseText);
                    }
                });// 실패했을때
                /*
                        $(document).on('click', '#classList', function () {
                            // alert("We're under inspection.");
                        });

                        $(document).on('click', '#classListMobile', function () {
                            // alert("We're under inspection.");
                        });*/


            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }
        });// 실패했을때


        //메뉴버튼 클릭시 패딩 삭제
        $(".zmdi.zmdi-menu").on("click", function () {
            $(".page-container").toggleClass('hide');
            $(".menu-sidebar.d-none.d-lg-block").toggleClass('hide');
        });

        //클래스 버튼 아이콘 토글
        $(".js-arrow").on("click", function () {
            if (toggle == 0) {
                $(this).removeClass("fa-caret-down");
                $(this).addClass("fa-caret-up");
                toggle = 1;
                console.log("down");
            } else if (toggle == 1) {
                $(this).removeClass("fa-caret-up");
                $(this).addClass("fa-caret-down");
                toggle = 0;
                console.log("up");
            }
        });

    });


</script>

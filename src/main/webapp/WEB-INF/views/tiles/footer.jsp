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
            location.href = "logout";
        });

        ////////////////////////////////////////////////////////////////////
        //                                                                //
        //                           클래스 메뉴                           //
        //                                                                //
        ////////////////////////////////////////////////////////////////////


        //좌측 메뉴에 클래스 목록 출력
        $.ajax({
            url: "/findClassList", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                $.each(result, function (index, item) {
                    /*$("#classList").append("<li><a href=\"class?idx=" + item.classIdx + "\">" + item.className + "</a></li>")
                    $("#classListMobile").append("<li><a href=\"class?idx=" + item.classIdx + "\">" + item.className + "</a></li>")
*/
                    $("#classList").append("<li><a href=\"class?idx="+item.classIdx+"\">" + item.className + "</a></li>");
                    $("#classListMobile").append("<li><a href=\"class?idx="+item.classIdx+"\">" + item.className + "</a></li>");
                });
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }
        });// 실패했을때
/*
        $(document).on('click', '#classList', function () {
            // alert("We're under inspection.");
        });

        $(document).on('click', '#classListMobile', function () {
            // alert("We're under inspection.");
        });*/




    });
</script>

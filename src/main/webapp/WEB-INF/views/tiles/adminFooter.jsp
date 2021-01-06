<!-- Jquery JS-->
<script src="/vendor/jquery-3.2.1.min.js"></script>
<!-- Bootstrap JS-->
<script src="/vendor/bootstrap-4.1/popper.min.js"></script>
<script src="/vendor/bootstrap-4.1/bootstrap.min.js"></script>
<!-- Vendor JS -->
<script src="/vendor/slick/slick.min.js">
</script>
<script src="/vendor/wow/wow.min.js"></script>
<script src="/vendor/animsition/animsition.min.js"></script>
<script src="/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js">
</script>
<script src="/vendor/counter-up/jquery.waypoints.min.js"></script>
<script src="/vendor/counter-up/jquery.counterup.min.js">
</script>
<script src="/vendor/circle-progress/circle-progress.min.js"></script>
<script src="/vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
<script src="/vendor/chartjs/Chart.bundle.min.js"></script>
<script src="/vendor/select2/select2.min.js">
</script>

<!-- Main JS-->
<script src="/js/main.js"></script>
<!-- full calendar requires moment along jquery which is included above -->
<script scr="/vendor/fullcalendar-3.10.0/gcal.js"></script>
<script src="/vendor/fullcalendar-3.10.0/lib/moment.min.js"></script>
<script src="/vendor/fullcalendar-3.10.0/fullcalendar.js"></script>
<!-- blockUI -->
<!-- include jQuery -->
<%--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>--%>
<!-- include BlockUI -->
<script src="/vendor/blockui-master/jquery.blockUI.js"></script>

<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- select2 JS -->
<%--<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />--%>
<%--<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>--%>


<script type="text/javascript">
    $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

    //뒤로가기
    window.onpageshow=function(event){
        if(event.persisted || ( window.performance && window.performance.navigation.type==2)){
            location.reload();
        }
    }

    $(function () {

        //로그인 세션 확인
        var Account = <%=session.getAttribute("Account")!=null%>;
        var Authority = "<%=session.getAttribute("Authority")%>";

        if (Account == false) {
            alert("This service requires login.");
            location.href = "/login";
        } else if (Authority != 1){
            alert("You are not admin account.");
            location.href = "/attendance";
        }

        //로그 아웃
        $("#logout").on("click", function () {
            alert("You are logged out.");
            sessionStorage.clear();
            location.href = "/logout";
        });

        // 뒤로가기 방지
        <%
/*             response.setHeader("cache-control","no-cache");
             response.setHeader("expires","0");
             response.setHeader("pragma","no-cache");
             response.setDateHeader("Expires", 0L);*/
//            session.removeAttribute("Account");
//            session.removeAttribute("Authority");
 %>


        //메뉴버튼 클릭시 패딩 삭제
        $(".zmdi.zmdi-menu").on("click", function () {
            $(".page-container").toggleClass('hide');
            $(".menu-sidebar.d-none.d-lg-block").toggleClass('hide');
        });
    });
</script>

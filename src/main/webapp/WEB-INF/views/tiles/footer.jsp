<!-- Jquery JS-->
<script src="vendor/jquery-3.2.1.min.js"></script>
<!-- Bootstrap JS-->
<script src="vendor/bootstrap-4.1/popper.min.js"></script>
<script src="vendor/bootstrap-4.1/bootstrap.min.js"></script>
<!-- Vendor JS       -->
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
<script src="vendor/fullcalendar-3.10.0/lib/moment.min.js"></script>
<script src="vendor/fullcalendar-3.10.0/fullcalendar.js"></script>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>

<!-- select2 JS -->
<%--<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />--%>
<%--<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>--%>


<script type="text/javascript" >

    $(document).ready(function() {

    });

    $(window).on('load',function(){

    });

    $(function() {

        ////////////////////////////////////////////////////////////////////
        //                                                                //
        //                         로그인 설정                             //
        //                                                                //
        ////////////////////////////////////////////////////////////////////

          //자동로그인
  $.ajax({
      url : "/test", //서버요청주소
      type : "post",//요청방식 (get,post,patch,delete,put)
      dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
      success : function(result) {

      }, //성공했을때
      error : function(request) {
          alert(request.responseText);
      }
  });// 실패했을때


        //로그인 세션 확인
        var Account = "<%=session.getAttribute("Account")%>";

        //"null"이라는 스트링 문제
      /*  if(Account == "null"){
            alert("로그인이 필요한 서비스 입니다.");
            location.href = "login";
        }*/

        //로그 아웃
        $("#logout").on("click",function(){
            alert("로그아웃 되셨습니다.");
            location.href = "logout";
        });


        ////////////////////////////////////////////////////////////////////
        //                                                                //
        //                           클래스                               //
        //                                                                //
        ////////////////////////////////////////////////////////////////////




        //좌측 메뉴에 클래스 목록 출력
        $.ajax({
            url : "/findClassList", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result) {
                $.each(result, function(index,item){
                      $("#classList").append("<li><a href=\"class?idx="+item.classIdx+"\">"+item.className+"</a></li>")
                });
            }, //성공했을때
            error : function(request) {
                alert(request.responseText);
            }
        });// 실패했을때

        /////////////////////////// /////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////



        // for now, there is something adding a click handler to 'a'
        var tues = moment().day(2).hour(19);

        // build trival night events for example data
        var events = [
            {
                title: "Special Conference",
                start: moment().format('YYYY-MM-DD'),
                url: '#'
            },
            {
                title: "Doctor Appt",
                start: moment().hour(9).add(2, 'days').toISOString(),
                url: '#'
            }

        ];

        var trivia_nights = []

        for(var i = 1; i <= 4; i++) {
            var n = tues.clone().add(i, 'weeks');
            console.log("isoString: " + n.toISOString());
            trivia_nights.push({
                title: 'Trival Night @ Pub XYZ',
                start: n.toISOString(),
                allDay: false,
                url: '#'
            });
        }


        var studentSize;
        var curDate ;

        // setup a few events
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right:""
            },
            editable : true,
            events: events.concat(trivia_nights),
            dayClick: function(date, jsEvent, view) {
                var strDate=date.format();
                $("#curDate").text(strDate);

                //전역변수에 현재날짜 저장
                curDate = strDate;

                //해당날짜 출결여부 조회 Ajax
                $.ajax({
                    url : "/findAtByDate", //서버요청주소
                    type : "post",//요청방식 (get,post,patch,delete,put)
                    data : "strDate="+date.format(),
                    dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success : function(result) {
                        console.log(result);

                        //데이터가 없으면
                        if (result == "") {

                            $("#studentList").empty();
                            //출석 학생 목록 출력
                            $.ajax({
                                url : "/findStudent", //서버요청주소
                                type : "post",//요청방식 (get,post,patch,delete,put)
                                dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                                success : function(result){
                                    $.each(result, function(index, item) {
                                        studentSize = result.length;
                                        var studentName = item.studentName;
                                        var studentIdx = item.studentIdx;

                                        var str = "<tr class=\"studentDetail\"><td style=\"vertical-align: middle;\">"+item.studentName+"<div hidden>"+item.studentIdx+"</div></td><td>" +
                                            "<div class=\"noselect\" style=\"width: 130px;\">\n" +
                                            "                    <select style=\"position: relative;left: 32px;\"class=\"js-select2\" name=\"time\">\n" +
                                            "                    <option data-id=\"0\" value=\"\">Present</option>\n" +
                                            "                    <option data-id=\"1\" value=\"\">Ex. Tardy</option>\n" +
                                            "                    <option data-id=\"2\" value=\"\">Tardy </option>\n" +
                                            "                    <option data-id=\"3\" value=\"\">Family Leave</option>\n" +
                                            "                    <option data-id=\"4\" value=\"\">Ex. Absent</option>\n" +
                                            "                    <option data-id=\"5\" value=\"\">Absent</option>\n" +
                                            "                    <option data-id=\"6\" value=\"\">Early Leave</option>\n" +
                                            "                </select>\n" +
                                            "                <div class=\"dropDownSelect2\"></div>\n" +
                                            "                    </div></td></tr>";

                                        $("#studentList").append(str);
                                    });
                                    $(".table-top-countries tbody tr td:odd").css("color","#666");

                                } , //성공했을때
                                error : function(request){
                                    alert(request.responseText);
                                }// 실패했을때
                            });

                        } else {    //값이 이미 존재하면

                            //가져온 목록 출력하기
                            $.each(result, function (index, item) {
                                //일치 학생 검색
                                var select = $(".studentDetail td div:contains(\"" + item.student.studentIdx + "\")").parent().parent().children().last().children().children();
                                // var selectedOption = select.children("option[data-id=\"3\"]").attr('selected', true);
                                //항목을 selected로 변경
                                var selectedOption = select.children("option[data-id=\"" + item.atState + "\"]").attr('selected', true);
                                //출력화면에 텍스트를 채움
                                var str = selectedOption.text()
                                select.find(".select2-selection__rendered").text(str);
                                //출석idx를 기록 (영속성)
                                select.parent().attr('id',item.atIdx);
                            });
                        }

                    }, //성공했을때
                    error : function(request) {
                        alert(request.responseText);
                    }
                });// 실패했을때


                //이미 있는지 확인

                //있으면 영속성 유지

                //업데이트 ㄱ

                // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                // alert('Current view: ' + view.name);
                // change the day's background color just for fun
                // $(this).css('background-color', 'red');

            },
            eventClick:function(event) {
                if(event.url) {
                    // alert(event.title + "\n" + event.url, "wicked", "width=700,height=600");
                    // window.open(event.url);
                    return false;
                }
            }

        });
    });


    ////////////////////////////////////////////////////////////////////
    //                                                                //
    //                            출석                                //
    //                                                                //
    ////////////////////////////////////////////////////////////////////


    $("#addAt").on('click',function(){

        //날짜
        // 학생idx,
        // 출석여부
        // 출석idx


        var curDate = $("#curDate").text();
        alert(curDate);

        var length = $(".studentDetail").length
        var dataArray = new Array();

        for(var i=0;i<length;i++){
            var stIdx = $(".studentDetail:eq(\""+i+"\")").children().first().children().text();
            var state = $(".studentDetail:eq(\""+i+"\")").find(".select2-selection__rendered").text();
            var atIdx = $(".studentDetail:eq(\""+i+"\")").children().last().children().attr('id');


            var data = new Object();
            data.stIdx = stIdx;
            data.state = state;
            data.atIdx = atIdx;
            dataArray.push(data);
        }

        if(curDate==""){
            alert("날짜를 선택하세요");
            return false;
        }

        $.ajax({
            url : "/updateAt", //서버요청주소
            type : "json",//요청방식 (get,post,patch,delete,put)
             data : "curDate="+curDate+"&dataArray="+JSON.stringify(dataArray),
            dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result) {


            }, //성공했을때
            error : function(request) {
                alert(request.responseText);
            }
        });// 실패했을때



    })


</script>

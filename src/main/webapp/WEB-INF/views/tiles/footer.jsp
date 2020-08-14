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
<script scr="vendor/fullcalendar-3.10.0/gcal.js"></script>
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


        ////////////////////////////////////////////////////////////////////
        //                                                                //
        //                             출석                               //
        //                                                                //
        ////////////////////////////////////////////////////////////////////


        //Css 동적 추가
        $('head').append('<link rel="stylesheet" href="css/fullcalendar.css" type="text/css" />');

        printAtAjax();

        //출석 학생 목록 출력 Ajax
        function printAtAjax(){
        $.ajax({
            url : "/findStudent", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result){
                $.each(result, function(index, item) {
                    // studentSize = result.length;
                    var str = "<tr class=\"studentDetail\"><td id=\""+item.studentIdx+"\"style=\"vertical-align: middle;\">"+item.studentName+"</td><td>" +
                        "<div class=\"noselect\" style=\"width: 130px;\">\n" +
                        "                    <select style=\"position: relative;left: 32px;\"class=\"js-select\" name=\"time\">\n" +
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
        };

        //FullCalendar 설정
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

        // var studentSize;
        // var curDate ;


        // setup a few events
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right:'month,list'
            },
            editable : true,
            // googleCalendarApiKey : "c4fc2c7cf094c0f00e0afa812ec4705aecfea0cc",
            // eventLimit : true,
            events: events.concat(trivia_nights),
        /*    eventSources : [
                // 대한민국의 공휴일
                {
                    googleCalendarId : "ko.south_korea#holiday@group.v.calendar.google.com"
                    , className : "koHolidays"
                    , color : "#FF0000"
                    , textColor : "#FFFFFF"
                }],*/


            dayClick: function(date, jsEvent, view) {
                $(".fc-day.fc-widget-content").not('.fc-day.fc-widget-content.fc-today').css('background','#fff');
                $(".fc-day.fc-widget-content.fc-today").css('background','#fcf8e3');
                $(".fc-day.fc-widget-content[data-date=\""+date.format()+"\"]").css('background','#d6d6d6');

                // jsEvent.


                //선택된 날짜 알림
                // alert(date.format());

                var strDate=date.format();

                //전역변수에 현재날짜 저장
                //전역변수 사용. 왜 안되지???
                curDate = strDate;

                //대안법으로 데이터값을 엘리먼트에 저장..
                $("#curDate").text(strDate);



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
                            //우측 항목 날짜 표시
                            $(".au-card.au-card--bg-blue.au-card-top-countries.m-b-30:first h3").remove();
                            var str = "<h3 style=\"color:#ffffff;\">"+strDate+"</h3>"
                            $(".au-card.au-card--bg-blue.au-card-top-countries.m-b-30:first").prepend(str);

                            $("#studentList").empty();

                            //출석 학생 목록 출력
                            printAtAjax()

                        } else {    //데이터가 존재하면
                            //선택된 날짜 출력
                            $(".au-card.au-card--bg-blue.au-card-top-countries.m-b-30:first h3").remove();
                            var str = "<h3 style=\"color:#ffffff;\">"+strDate+"</h3>"
                            $(".au-card.au-card--bg-blue.au-card-top-countries.m-b-30:first").prepend(str);

                            //가져온 목록 출력하기
                            $.each(result, function (index, item) {
                                //일치 학생 검색

                                var select = $(".studentDetail #"+item.student.studentIdx+"").parent().children().last().children().children().first();
                                    // var select = $(".studentDetail td div:contains(\"" + item.student.studentIdx + "\"").parent().parent().children().last().children().children();

                                    select.children("option:selected").attr('selected', false);

                                    select.children("option[data-id=\"" + item.atState + "\"]").attr('selected', true);

                                    select.children("option[data-id=\"none\"]").remove();

                                    select.parent().attr('id',item.atIdx);

                            });

                            //가져온 값 외에 새로 추가된 학생들에 대한 처리

                            if(result.length < $(".studentDetail").length){
                                for(i = result.length ; i < $(".studentDetail").length; i++){
                                    var select = $(".studentDetail:eq("+i+")").children().last().children().children().first();
                                    select.children("option:selected").attr('selected', false);


                                    //plaseChoose 작업
                                    select.children("option[data-id=\"none\"]").remove();
                                    select.prepend("<option data-id=\"none\" value=\"\">Please Choose</option>");


                                    select.children('option:eq(0)').attr('selected', true);
                                    // alert(select.children("option:selected").text());

                                }
                            }
                        }



                    }, //성공했을때
                    error : function(request) {
                        alert(request.responseText);
                    }
                });// 실패했을때

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

        //데이터 저장
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
            var stIdx = $(".studentDetail:eq(\""+i+"\")").children().first().attr('id');

            var state = $(".studentDetail:eq(\""+i+"\") option:selected").attr('data-id');
            // var state = $(".studentDetail:eq(\""+i+"\")").find(".select2-selection__rendered").text();

            var atIdx = $(".studentDetail:eq(\""+i+"\")").children().last().children().attr('id');

            console.log("stIdx : " + stIdx + " | atIdx : "+atIdx+" | state : " + state);

            if(state=="none"){
                alert("항목을 선택하세요");
                return false;
            }

            var data = new Object();
            data.stIdx = stIdx;
            data.state = state;
            //if(atIdx!=null) {
                data.atIdx = atIdx;
            //}
            dataArray.push(data);
        }

        if(curDate==""){
            alert("날짜를 선택하세요");
            return false;
        }


        $.ajax({
            url : "/updateAt", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            data : "dataArray="+JSON.stringify(dataArray)+"&curDate="+curDate,
            dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result) {


            }, //성공했을때
            error : function(request) {
                alert(request.responseText);
            }
        });// 실패했을때



    })


        //list클릭
        $(document).on('click','.fc-right .fc-button-group button:last',function(){
            $('.fc-view-container').empty();
            $('.fc-center h2').text('전체 학생 출석 현황');
            $('.col').css('width','100%');
            $('.col-lg-3').css('display','none');
            StudentAjax();

        });

        //month클릭
        $(document).on('click','.fc-right .fc-button-group button:first',function() {
            $('.col-md-12.At').empty();
            $('.col').css('width','70%');
            $('.col-lg-3').css('display','block');
      });

        //전체 출석 결과 Ajax
    function StudentAjax() {

        $.ajax({
            url: "/findTotalAt", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                    console.log(result);


                var str = "<div class=\"col-md-12 At\">\n" +
                    "                                <!-- DATA TABLE -->\n" +
                    "                                <h3 class=\"title-5 m-b-25\">data table\n" +
                    "                                </h3>\n" +
                    "\n" +
                    "                                <div class=\"table-responsive table-responsive-data2\">\n" +
                    "                                    <table class=\"table table-data2\">\n" +
                    "                                        <thead>\n" +
                    "                                        <tr>\n" +
                    "                                            <th>name</th>\n" +
                    "                                            <th>Present</th>\n" +
                    "                                            <th>Ex. Tardy</th>\n" +
                    "                                            <th>Tardy</th>\n" +
                    "                                            <th>Family Leave</th>\n" +
                    "                                            <th>Ex. Absent</th>\n" +
                    "                                            <th>Absent</th>\n" +
                    "                                            <th>Early Leave</th>\n" +
                    "                                            <th>Perfect Attendance</th>\n" +
                    "                                        </tr>\n" +
                    "                                        </thead>\n" +
                    "                                        <tbody>";

                $.each(result,function(index,item){

                    var str2=    "                                        <tr class=\"tr-shadow\">\n" +
                        "                                            <td>"+item.studentName+"<div hidden>"+item.studentIdx+"</div></td>\n" +
                        "                                            <td>"+item.presentCnt+"</td>\n" +
                        "                                            <td>"+item.exTardyCnt+"</td>\n" +
                        "                                            <td>"+item.tardyCnt+"</td>\n" +
                        "                                            <td>"+item.familyLeaveCnt+"</td>\n" +
                        "                                            <td>"+item.exAbsentCnt+"</td>\n" +
                        "                                            <td>"+item.absentCnt+"</td>\n" +
                        "                                            <td>"+item.earlyLeaveCnt+"</td>\n" +
                        "                                            <td>"+item.perfectAt+"</td>\n" +
                        "                                        </tr>\n" +
                        "                                        <tr class=\"spacer\"></tr>";
                    str = str + str2;
                })

                str = str + "                                        </tbody>\n" +
                    "                                    </table>\n" +
                    "                                </div>\n" +
                    "                                <!-- END DATA TABLE -->\n" +
                    "                            </div>";


                $('.fc-view-container').append(str);

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }
        });// 실패했을때
    }

</script>

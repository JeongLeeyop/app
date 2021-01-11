////////////////////////////////////////////////////////////////////
//                                                                //
//                             출석                               //
//                                                                //
////////////////////////////////////////////////////////////////////
$(function () {

    //중복실행 방지코드
    var isRun = false;
    var curSeasonIdx =  sessionStorage.getItem("curSeasonIdx");

    //최초 Season 설정
    if(curSeasonIdx==null) {
        $.ajax({
            url: "/SeasonInit", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            async: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                curSeasonIdx=result;
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    }

    //FullCalendar 설정

    //Css 동적 추가
    $('head').append('<link rel="stylesheet" href="css/fullcalendar.css" type="text/css" />');

    printAtAjax();

    $('head').append('<link rel="stylesheet" href="css/attendance.css" type="text/css" />');
    //출석 학생 목록 출력 Ajax
    function printAtAjax() {
        $("#studentList").empty();

        //흠.. 여기가 문제군 ㅠㅜ footer.jsp에서 ajax의 결과값이 저장된 이후에만 curSeasonIdx를 받아올 수 있다.
        // alert(sessionStorage.getItem("curSeasonIdx"));

        $.ajax({
            url: "/findAuthStudent", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "curSeasonIdx=" + curSeasonIdx,
            async: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                $.each(result, function (index, item) {
                    var str = "<tr class=\"studentDetail\"><td id=\"" + item.authStudentIdx + "\"style=\"vertical-align: middle;\">" + item.student.studentName + "</td><td>" +
                        "<div data-id=\"none\" class=\"noselect\">\n" +
                        "                    <select style=\"position: relative;\"class=\"js-select\" name=\"time\">\n" +
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
                $(".table-top-countries tbody tr td:odd").css("color", "#666");

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때

        });

    };


//모든 날짜 요약
// 이벤트 추가

    function date_to_str(format) {
        var year = format.getFullYear();
        var month = format.getMonth() + 1;
        if (month < 10) month = '0' + month;
        var date = format.getDate();
        if (date < 10) date = '0' + date;
        return year + "-" + month + "-" + date;
    }

    /* function AtSummary() {


         var strDate = jQuery("#calendar").fullCalendar('getDate');
         console.log("현재 날짜는 " + strDate.format());

         $.ajax({
             url: "/findTotalAtSummary", //서버요청주소
             type: "post",//요청방식 (get,post,patch,delete,put)
             data: "strDate=" + strDate.format(),
             dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
             success: function (result) {
                 var trivia_nights = []

                 var dateCnt = result.useDateCnt;
                 var list = result.list;
                 console.log("이달에 입력된 츨석의 개수는 " + dateCnt.length + "개입니다.");

                 $.each(dateCnt, function (index, item) {


                     var title = "";
                     var present = 0;
                     var tardy = 0;
                     var absent = 0;
                     var leave = 0;

                     var date = date_to_str(new Date(item));

                     $.each(list, function (index2, item2) {
                         var date2 = date_to_str(new Date(item2.atDate));

                         if (date == date2) {
                             console.log(date + " == " + date2);

                             //present
                             if (item2.atState == 0) {
                                 present += item2.count;

                                 //ex.tardy
                             } else if (item2.atState == 1) {
                                 tardy += item2.count;

                                 //tardy
                             } else if (item2.atState == 2) {
                                 tardy += item2.count;

                                 //family leave
                             } else if (item2.atState == 3) {
                                 leave += item2.count;

                                 //ex.absent
                             } else if (item2.atState == 4) {
                                 absent += item2.count;

                                 //absent
                             } else if (item2.atState == 5) {
                                 absent += item2.count;

                                 //early leave
                             } else if (item2.atState == 6) {
                                 leave += item2.count;

                             }
                         }

                     });

                     title = present + " | " + tardy + " | " + absent + " | " + leave;
                     console.log("title은 : " + title);

                     var event = {title: title, start: moment().format(date)};
                     $('#calendar').fullCalendar('renderEvent', event, true);


                 });


                 // events: events.concat(trivia_nights),

             }, //성공했을때
             error: function (request) {
                 alert(request.responseText);
             }
         });// 실패했을때
     }*/
    function AtSummary2() {
        $.ajax({
            url: "/findTotalAtSummary2", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            async: false,
            data: "curSeasonIdx="+curSeasonIdx,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                // console.log(result);

                var atList = [];
                var at = [];

                //present
                $.each(result.present, function (index, item) {
                    at = [date_to_str(new Date(item.atDate)), item.present];
                    atList.push(at);
                });

                inputAtList(atList, result.tardy, "tardy");

                inputAtList(atList, result.absent, "absent");

                inputAtList(atList, result.leave, "leave");

                // console.log(atList);

                $.each(atList, function(index, item){
                    var event = {title: item[1], start: moment().format(item[0])};
                    $('#calendar').fullCalendar('renderEvent', event, true);
                })
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }
        });// 실패했을때
    }

    //캘린더에 일일 출결현황 출력
    function inputAtList(atList, atType, str) {

        var at = [];
        var ckTarget = false;
        var skipIndex = [];
        var array = [];
        var lastIndex = 0;
        var countStr = "";

        //전체 리스트의 마지막 인덱스를 저장
        lastIndex = Number(atList.length - 1);

        //입력 출결리스트와 같은 크기의 배열 생성, 모든 값 false로
        $.each(atType, function (index, item) {
            array.push(false);
        });

        $.each(atList, function (index2, item2) {

            // 0을 대입할지 값을 대입할지 여부를 확인하는 변수
            ckTarget = false;

            //전체 리스트 만큼 반복
            $.each(atType, function (index, item) {

                //Date -> String 형으로 변환
                var date1 = date_to_str(new Date(item.atDate));
                var date2 = item2[0];

                // 로그 : 날짜 비교
                // console.log(date1 +" | "+ date2);

                // 같은 날짜를 찾으면
                if (date1 == item2[0]) {
                    //가져온 Count값을 대입
                    atList[index2][1] = atList[index2][1] + " | " + item[str];

                    //0을 중복해서 넣지 않도록 변수 값 수정
                    ckTarget = true;

                    //입력될 출결리스트의 현재 인덱스는 전체리스트에 포함된 날짜라는 것을 알림
                    array[index] = true;

                    //로그 : 입력된 데이터 출력
                    // console.log("tardy : " + atList[index2][0] +" : "+ atList[index2][1]);
                }
            }); // 입력 리스트 for문 종료

            //전체 리스트에 입력된 값이 없다면 0으로 치환하여 삽입
            if (ckTarget == false) atList[index2][1] = atList[index2][1] + " | 0";

            //출석리스트의 마지막이 되면 스킵된 비출결 항목의 인덱스번호를 배열에 답는다.
            if (index2 == lastIndex) {
                $.each(array, function (index, item) {
                    if (item == false) {
                        skipIndex.push(index);
                    }
                });
            }
        }); // 전체 리스트 for문 종료

        //스킵된 입력값을 전체리스트 마지막에 삽입
        $.each(skipIndex, function (index, item) {
            // 입력데이터의 타입별로 누락된 값을 채워넣음
            if (str == "tardy") countStr = "0 | " + atType[item][str];
            else if (str == "absent") countStr = "0 | 0 | " + atType[item][str];
            else if (str == "leave") countStr = "0 | 0 | 0 | " + atType[item][str];
            at = [date_to_str(new Date(atType[item].atDate)), countStr];
            atList.push(at);
        });
        return atList;
    }

// for now, there is something adding a click handler to 'a'
//  var tues = moment().day(2).hour(19);
// build trival night events for example data
    var events = [];

// setup a few events
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,list'
        },
        editable: true,
        eventLimit: true,
        // googleCalendarApiKey : "c4fc2c7cf094c0f00e0afa812ec4705aecfea0cc",
        /*    eventSources : [
                // 대한민국의 공휴일
                {
                    googleCalendarId : "ko.south_korea#holiday@group.v.calendar.google.com"
                    , className : "koHolidays"
                    , color : "#FF0000"
                    , textColor : "#FFFFFF"
                }],*/


        //날짜 클릭시
        dayClick: function (date, jsEvent, view) {
            $(".fc-day.fc-widget-content").not('.fc-day.fc-widget-content.fc-today').css('background', '#fff');
            $(".fc-day.fc-widget-content.fc-today").css('background', '#fcf8e3');
            $(".fc-day.fc-widget-content[data-date=\"" + date.format() + "\"]").css('background', '#d6d6d6');

            var strDate = date.format();

            //전역변수에 현재날짜 저장
            //전역변수 사용. 왜 안되지???
            curDate = strDate;

            //대안법으로 데이터값을 엘리먼트에 저장..
            $("#curDate").text(strDate);

            //해당날짜 출결여부 조회 Ajax
            $.ajax({
                url: "/findAtByDate", //서버요청주소
                type: "post",//요청방식 (get,post,patch,delete,put)
                data: "strDate=" + date.format()+"&curSeasonIdx="+curSeasonIdx,
                dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success: function (result) {
                    console.log("findAtByDate : ",result);


                    //우측 항목 날짜 표시
                    $(".au-card.au-card--bg-blue.au-card-top-countries.m-b-30:first h3").remove();
                    var str = "<h3 style=\"color:#ffffff;\">" + strDate + "</h3>"
                    $(".au-card.au-card--bg-blue.au-card-top-countries.m-b-30:first").prepend(str);

                    //데이터가 없으면
                    if (result == "" || result == null) {

                        //출석 학생 목록 출력
                        printAtAjax()

                    } else {    //데이터가 존재하면
                        $(".studentDetail .noselect").attr("data-id", "none");

                        //가져온 목록 출력하기
                        $.each(result, function (index, item) {
                            //일치 학생 검색

                            var select = $(".studentDetail #" + item.authStudent.authStudentIdx + "").parent().children().last().children().children().first();
                            // var select = $(".studentDetail td div:contains(\"" + item.student.studentIdx + "\"").parent().parent().children().last().children().children();

                            select.children("option[data-id=\"none\"]").remove();

                            select.children("option:selected").attr('selected', false);

                            select.children("option[data-id=\"" + item.atState + "\"]").attr('selected', true);

                            select.parent().attr('data-id', item.atIdx);

                        });

                        //가져온 값 외에 새로 추가된 학생들에 대한 처리

                        if (result.length < $(".studentDetail").length) {
                            var select = $(".noselect[data-id=none] select");
                            select.each(function (index, item) {
                                $(item).children("option:selected").attr('selected', false);

                                //pleaseChoose 작업
                                $(item).children("option[data-id=\"none\"]").remove();
                                $(item).prepend("<option data-id=\"none\" value=\"\">Please Choose</option>");
                                $(item).children('option:eq(0)').attr('selected', true);
                            });


                            /*   for (i = result.length; i < $(".studentDetail").length; i++) {
                                   var select = $(".studentDetail:eq(" + i + ")").children().last().children().children().first();
                                   select.children("option:selected").attr('selected', false);

                                   //plaseChoose 작업
                                   select.children("option[data-id=\"none\"]").remove();
                                   select.prepend("<option data-id=\"none\" value=\"\">Please Choose</option>");

                                   select.children('option:eq(0)').attr('selected', true);
                                   // alert(select.children("option:selected").text());

                                   select.parent().removeAttr('id');

                           }*/
                        }
                    }


                }, //성공했을때
                error: function (request) {
                    alert(request.responseText);
                }
            });// 실패했을때

        },
        eventClick: function (event) {
            if (event.url) {
                // alert(event.title + "\n" + event.url, "wicked", "width=700,height=600");
                // window.open(event.url);
                return false;
            }
        }

    });
    AtSummary2();


    //현재 선택된 시즌이 가장 최근 시즌인지 확인
    $.ajax({
        url: "/findLatelySeason", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            console.log(result);
            //현재 선택된 season이 가장 최근 season이면 출력
            if(curSeasonIdx==result.seasonIdx){
                //AutoSave 버튼생성
                var str = "                    <label title=\"Auto Save\" class=\"switch switch-text switch-primary switch-pill\" style=\"top: 5px;\">\n" +
                    "                      <input type=\"checkbox\" class=\"switch-input\" checked=\"true\">\n" +
                    "                      <span data-on=\"On\" data-off=\"Off\" class=\"switch-label\"></span>\n" +
                    "                      <span class=\"switch-handle\"></span>\n" +
                    "                    </label>\n";
                $(".fc-right").prepend(str);

                //autoSave
                $.ajax({
                    url: "/findAutoSave", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "curSeasonIdx=" + curSeasonIdx,
                    async: false,
                    dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function (autoSave) {
                        if(autoSave==1)  $(".switch-input").prop('checked', true);
                        else $(".switch-input").prop('checked',false)
                        //툴팁
                        $(".fc-right").find("label").tooltip();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }// 실패했을때
                });
            }
        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }
    });// 실패했을때

    //autoSave 클릭
    $(document).on('click', '.switch-input', function () {
        var autoSave;
        if($(".switch-input").prop('checked')==1) autoSave=1;
        else autoSave=0;

        $.ajax({
            url: "/updateAutoSave", //서버요청주소
            data: "autoSave="+autoSave,
            type: "post",//요청방식 (get,post,patch,delete,put)
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function () {
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }
        });// 실패했을때

    })

    //데이터 저장
    $("#addAt").on('click', function () {

        //이미 수행중이면 종료
        if(isRun == true) { return; }

        //날짜
        // 학생idx,
        // 출석여부
        // 출석idx


        var curDate = $("#curDate").text();
        var length = $(".studentDetail").length
        var dataArray = new Array();

        for (var i = 0; i < length; i++) {
            var stIdx = $(".studentDetail:eq(\"" + i + "\")").children().first().attr('id');

            var state = $(".studentDetail:eq(\"" + i + "\") option:selected").attr('data-id');
            // var state = $(".studentDetail:eq(\""+i+"\")").find(".select2-selection__rendered").text();

            var atIdx = $(".studentDetail:eq(\"" + i + "\")").children().last().children().attr('data-id');

            console.log("stIdx : " + stIdx + " | atIdx : " + atIdx + " | state : " + state);

            if (state == "none") {
                alert("Please select an item");
                return false;
            }

            var data = new Object();
            data.stIdx = stIdx;
            data.state = state;
            if (atIdx != "none") {
                data.atIdx = atIdx;
            }
            dataArray.push(data);
        }

        if (curDate == "") {
            alert("Please select a date");
            return false;
        }

        //상태를 수행중으로 표시
        isRun = true;

        $.ajax({
            url: "/updateAt", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "dataArray=" + JSON.stringify(dataArray) + "&curDate=" + curDate,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            async: false,
            success: function (result) {
                alert("Saved successfully.");
                isRun  = false;
                location.reload();

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }
        });// 실패했을때


    });

    //list클릭
    $(document).on('click', '.fc-right .fc-button-group button:last', function () {
        $('.fc-view-container').empty();
        $('.fc-center h2').text('Overall Student Attendance');
        $('.col').css('width', '100%');
        $('.col-lg-3').css('display', 'none');
        StudentAjax();

    });

    //month클릭
    $(document).on('click', '.fc-right .fc-button-group button:first', function () {
        $('.col-md-12.At').empty();
        $('.col').css('width', '70%');
        $('.col-lg-3').css('display', 'block');
    });

    //전체 출석 결과 Ajax
    function StudentAjax() {

        $.ajax({
            url: "/findTotalAt", //서버요청주소
            data: "curSeasonIdx="+curSeasonIdx,
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


                $.each(result, function (index, item) {

                    var perfectAt = item.perfectAt;
                    var str3;
                    if (perfectAt == "True") {
                        str3 = "<td style=\"color:#00ad5f;\">True</td>"
                    } else if (perfectAt == "False") {
                        str3 = "<td style=\"color:#fa4251;\">False</td>"
                    }


                    var str2 = "                                        <tr class=\"tr-shadow\">\n" +
                        "                                            <td>" + item.studentName + "<div hidden>" + item.studentIdx + "</div></td>\n" +
                        "                                            <td>" + item.presentCnt + "</td>\n" +
                        "                                            <td>" + item.exTardyCnt + "</td>\n" +
                        "                                            <td>" + item.tardyCnt + "</td>\n" +
                        "                                            <td>" + item.familyLeaveCnt + "</td>\n" +
                        "                                            <td>" + item.exAbsentCnt + "</td>\n" +
                        "                                            <td>" + item.absentCnt + "</td>\n" +
                        "                                            <td>" + item.earlyLeaveCnt + "</td>\n" + str3 +
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

    //delete 클릭시
    $(document).on('click', '#delAt', function () {

        if (confirm("Are you sure you want to delete it?")) {

            var curDate = $(".col-lg-3 h3").text();
            if (curDate == "") {
                alert("Please select a date.");
                return false;
            }

            $.ajax({
                url: "/deleteAt", //서버요청주소
                type: "post",//요청방식 (get,post,patch,delete,put)
                data: "curDate=" + curDate + "&curSeasonIdx="+curSeasonIdx,
                dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success: function (result) {
                    alert(result + " : data has been successfully deleted..");
                    printAtAjax();
                    location.reload();

                }, //성공했을때
                error: function (request) {
                    alert(request.responseText);
                }
            });// 실패했을때

        }
    });
});
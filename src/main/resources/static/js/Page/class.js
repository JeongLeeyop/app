////////////////////////////////////////////////////////////////////
//                                                                //
//                             클래스                             //
//                                                                //
////////////////////////////////////////////////////////////////////

//현재 클래스 Idx : 주소창에서 가져오기
// var curClassIdx = getParameterByName("idx");

//curClassIdx 가져오기
var curClassIdx = $(".title-3").data('id');

//테이블 크기를 측정하기 위한 변수
var studentSize;
var usedTaskSize;

//학생 리스트를 저장하기 위한 변수
var stList;
//과제 리스트를 저장하기 위한 변수
var tkList;

//중복실행 방지코드
var isRun = false;

//섹션 추가
function SectionAdd() {
    var sectionName = $("#sectionName").val();
    if (sectionName == "") {
        alert("Please enter section name");
        return;
    }

    var curSectionIdx = $("#modalSectionIdx").text();
    $.ajax({
        url: "/addSection", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "sectionName=" + sectionName + "&curClassIdx=" + curClassIdx + "&curSectionIdx=" + curSectionIdx,
        dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            SectionAjax();
            $("#smallmodal2").modal("hide");
        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
}

//섹션 목록 출력
//Type 0은
function SectionAjax() {
//    $("#multiple-select").empty();
    $("#a").empty();
    $("#sectionName").val("");

    $.ajax({
        url: "/findSectionList", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curClassIdx=" + curClassIdx,
        async: false,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            // console.log("섹션 정보 : " , result);
            //섹션 생성
            var lastIndex = Number(result.length - 1);
            var curSectionIdx = "";

            $.each(result, function (index, item) {
                var sectionName = item.sectionName;
                var sectionIdx = item.sectionIdx;
//                var str = "<option value=\"" + sectionIdx + "\">" + sectionName + "</option>";
                var str2 = "<li><a href=\"#\" data-id=\""+sectionIdx+"\">"+sectionName+"</a></li>";
//                $("#multiple-select").append(str);
                $("#a").append(str2);

                //출력을 위해 제일 마지막 섹션 idx를 구함
                if (lastIndex == index) {
                    curSectionIdx = item.sectionIdx;
                }
            });
            // alert("StudentAjax 성공");

            //마지막 섹션 클릭처리
            if (curSectionIdx != "") {
                printTaskChart(curSectionIdx);
//                $("#multiple-select option:last").prop("selected", true);
                $("#a li a:last").addClass("active");
            }

        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
}

//과제 차트 - 점수 출력
function printTaskChart(curSectionIdx) {

    $.ajax({
        url: "/findTaskChart", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curSectionIdx=" + curSectionIdx + "&curClassIdx=" + curClassIdx+"&curSeasonIdx="+sessionStorage.getItem("curSeasonIdx"),
        async: false,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result)
        {
//             console.log(result);

            //classChart = Score
            //studentList = authStudent
            //taskList = Task
            //usedList = SectionTasks

            //학생목록 전역변수에 저장 : 최종성적 출력에 사용
            stList = result.classMembers;
            //과제목록 전역변수에 저장 : 최종성적 출력에 사용
            tkList = result.taskList;

            //결과값 확인
            // console.log(result);

            $("#taskChart").empty();
            $("#taskList").empty();

            //현 섹션에 사용중인 과제로 열 구성하기
            //모든 과제 목록 가져오기

            // Head - Tr 생성
            var str = "<tr id=\"taskListTr\" style=\"height: 108px;\"><th style=\"height:109px;border-top: none;font-size: 0.38cm;padding-top: 12px;padding-right: 12px;\"><div>Name</div><div style=\"white-space: nowrap;font-size: 9px;padding-top:15px\">Total Point</div><div style=\"white-space: nowrap;font-size: 9px;padding-top:11px\">Memo</div></th><th style=\"min-width: 100px;\"></th></tr>";
            $("#taskList").append(str).trigger("create");

            $.each(result.usedList, function (index, item) {
                var str2 = "";
                var str3 = "";

                str2 = str2 + "<th><div class=\"col-12 col-md-9\">\n" +
                    "<select data-id=\"" + item.sectionTasksIdx + "\" name=\"select\" class=\"form-control\">\n" +
                    "\n" +
                    "</select>\n" +
                    "</div></td>\n";

                //Head - Tr 추가하기
                $("#taskListTr").append(str2).trigger("create");

                if (item.task == null) {
                    $("#taskListTr th:last div select").append("<option class=\"option\" value=\"select\">Please Select</option>").trigger("create");
                }

                //Head - Td 추가하기
                $.each(result.taskList, function (index2, item2) {

                    //과제가 없는데 과제를 출력?? : 아무것도 selected 안된채 출력
                    if (item.task == null) {
                        str3 = str3 + "<option class=\"option\" value=\"" + item2.taskIdx + "\">" + item2.taskItemName + "</option>";
                        return true;
                    }

                    //만약 지금 출력하는 과제가 사용중인 과제라면 selected로 선택
                    if (item2.taskIdx == item.task.taskIdx) {
                        str3 = str3 + "<option class=\"option\" selected=\"selected\" value=\"" + item2.taskIdx + "\">" + item2.taskItemName + "</option>";

                    } else {
                        str3 = str3 + "<option class=\"option\" value=\"" + item2.taskIdx + "\">" + item2.taskItemName + "</option>";
                    }
                });
                str3 = str3 + "<option class=\"option\" value=\"del\">Delete</option>";
                $("#taskListTr th:last div select").append(str3).trigger("create");
                $("#taskListTr th:last").append("<input tabindex=\"1\" type=\"text\" placeholder=\"\" class=\"form-control maxScore\">").trigger("create");
                $("#taskListTr th:last").append("<input tabindex=\"1\" type=\"text\" placeholder=\"\" class=\"form-control memo\">").trigger("create");
                $("#taskListTr th:last .maxScore").val(item.maxScore);
                $("#taskListTr th:last .memo").val(item.memo);
            });

            //css 적용
            // $('head').append('<link rel="stylesheet" href="css/class.css" type="text/css" />');

            //select css 수정
            $(".js-select2").each(function () {
                $(this).select2({
                    minimumResultsForSearch: Infinity,
                    dropdownParent: $(this).next('.dropDownSelect2')
                });
            });

            //select2 로그확인?
            $('.js-select2').on('select2:select', function (e) {
                var data = e.params.data;
                // console.log(data);
            });
            $(".select2-selection--single").css("box-shadow", "none");


            //학생 목록 출력
            var str = "<tr style=\"height: 63px;\">";
            var tabindex = 1;
            $.each(result.classMembers, function (index, item) {

                //과제 점수 입력 창
                str = str + "<td>" + item.authStudent.student.studentName + "</td><td style=\"min-width: 100px;\" class=\"studentIdx\" data-id=\"" + item.classMembersIdx + "\">" + item.classMembersIdx + "</td>"
                $.each(result.usedList, function (index2, item2) {
                    str = str + "<td><input tabindex=\" "+tabindex+"\" type=\"text\" placeholder=\"\" class=\"form-control\"></td>";
                    tabindex += result.classMembers.length;
                });
                str = str + "</tr>";
                $("#taskChart").append(str).trigger("create");
                str = "<tr style=\"height: 63px;\">";
                tabindex = tabindex - (result.classMembers.length * result.usedList.length) + 1;
            });

            //빈칸에 과제idx 넣기???

            var roundIndex = result.usedList.length;
            var curTaskIdx;

            //값 입력
            $.each(result.classChart, function (index, item) {
                //일치 학생 idx 찾기 : tr
                var curStudentTd = $(".studentIdx[data-id=\"" + item.classMembersClassMembersIdx + "\"]");
                //일치 과제 idx 찾고 점수 삽입 : td
                for (var i = 0; i < roundIndex; i++) {
                    // alert($("#taskList tr th:eq("+i+") div select option").attr('selected','selected').val());

                    //select에 selected되어있는 option의 value값을 가지고 온다.


                    /*curTaskIdx = $("select[name=select]:eq(" + i + ")").val();
                    if (item.taskTaskIdx == curTaskIdx) {
                        curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().val(item.score);
                        curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().attr('data-id', item.scoreIdx);
                    }*/


                    curSectionTasksIdx = $("select[name=select]:eq(" + i + ")").data("id");
                    if (item.sectionTasksSectionTasksIdx == curSectionTasksIdx) {
                        curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().val(item.score);
                        curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().attr('data-id', item.scoreIdx);
                    }

                }
            });
            //전역변수에 테이블의 크기를 입력
            studentSize = result.classMembers.length;
            usedTaskSize = result.usedList.length;

            //섹션명 출력
            if(result.usedList[0]!=null){
                $(".sectionName").text(result.usedList[0].section.sectionName)
            }
        }, //성공했을때

        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
}

//주소창의 파라메터를 가져오는 함수
// function getParameterByName(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//         results = regex.exec(location.search);
//     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

//성적 비율 출력
function printGradeChart() {

    $.ajax({
        url: "/findTaskList", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curClassIdx=" + curClassIdx,
        async: false,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            //결과값 확인
            // console.log(result);

            //과제등급표
            $.each(result, function (index, item) {
                var str = "<tr>\n" +
                    "                            <td>" + item.taskItemName + "</td>\n" +
                    "                            <td data-id=\""+item.taskIdx+"\">" + item.taskGradeRatio + "%</td>\n" +
                    "                        </tr>";

                $("#gradeChart tbody").append(str);
            });

            //학생 종합 성적 타이틀 출력
            $.each(result, function (index, item) {
                $("#GradeList tr").append("<th><div hidden data-id="+item.taskIdx+"></div>" + item.taskItemName + "</th>")
            });
            $("#GradeList tr").append("<th>Final Grade</th>");

        }, //성공했을때

        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
}

//학생 종합 성적 출력
function printTotalGrade() {
    $("#TotalGradeChart").empty();

    //학생 목록 출력
    var str = "";
    $.each(stList, function (index, item) {
        //최종 성적 표시 창
        str = str + "<tr><td><div hidden data-id=\"" + item.classMembersIdx + "\"></div>" + item.authStudent.student.studentName + "</td></tr><tr class=\"spacer\"></tr>";
        $("#TotalGradeChart").append(str).trigger("create");
        str = "";

        $.each(tkList, function (index2, item2) {
            //과제 점수에는 클래스명 :taskScore 붙혀주기
            if(tkList.length==index2) $("#TotalGradeChart tr").last().prev().append("<td></td>");
            else $("#TotalGradeChart tr").last().prev().append("<td class=\"taskScore\"></td>");
        });
    });


    $.ajax({
        url: "/findTotalGrade", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curClassIdx=" + curClassIdx,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
//             console.log("TotalGrad ==> " , result);

            // public class totalGradeResponse
            //     private Long studentIdx; == authStudent
            //     private Long taskIdx;
            //     private Double grade;
            //     private Double finalGrade;
            //     private Long classIdx;

            //학생 수만큼 반복
            $.each($("#TotalGradeChart tr td div"), function (index2, item2) {

                var FinalGrade = 0;

                //과제 수만큼 반복
                $.each($("#GradeList tr th"), function (index3, item3) {

                    //매칭을 위한 변수 선언
                    var stIdx = $(item2).data("id");
                    var taskIdx = $(item3).children().data("id");

                    //과제idx 순서대로 점수를 담을 리스트 선언
                    var list = new Array();

                    //모든 값 가져오기
                    $.each(result, function (index, item) {

                        //학생idx와 매칭
                        if (stIdx == item.studentIdx) {
                            //과제idx와 매칭
                            if (index3 != 0 && index3 != $("#GradeList tr th").length - 1) {
                                if (taskIdx == item.taskIdx) {
                                    //null값 치환
                                    if (item.grade == null) {
                                        // list[Number(index3) - 1] = "<td> </td>";
                                    } else {
                                        //소숫점 버림
                                        //Math.floor(item.grade * 100) / 100
                                        $(item2).parent().parent().find('td').eq(index3).append(Math.floor(item.grade * 100) / 100);
                                        // list[Number(index3) - 1] = "<td>" + Math.floor(item.grade * 100) / 100 + "</td>";
                                        FinalGrade = FinalGrade + item.finalGrade;
                                    }
                                }
                            }
                        }
                    });
                    // console.log(list);
                    /*$.each(list, function (index4, item4) {
                        console.log(index4 + " : " + item4);
                        $(item2).parent().append(item4);
                    });*/
                });
                //소수점 자리 맞추기
                FinalGrade = Math.floor(FinalGrade * 100) / 100;
                $(item2).parent().parent().append("<td>" + FinalGrade + "%</td>");

                // console.log(list);
                // console.log(result[stIdx]);
            });

        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
}

//sectionAjax -> printTaskChart

$(function () {


//    setInterval(function() { console.log($("#multiple-select option:checked").val())}, 1000);
//        setInterval(function() { console.log($("#a li .active").data('id'))}, 1000);

    $('head').append('<link rel="stylesheet" href="css/class.css" type="text/css" />');

    //select css 수정
    SectionAjax();
    printGradeChart();
    printTotalGrade();

    //enter누르면 save
    $("#taskChart tr td input").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#saveTask").click();
        }
    });

    $("#smallmodal2").on("shown.bs.modal", function () {
        $("#sectionName").focus();
    });

    //섹션 추가 폼 초기화
    $(document).on("click", "#addSection", function () {
        $("#sectionName").val("");
        $("#modalSectionIdx").text("");
    });

    //섹션 추가
    $(document).on("click", "#addSectionOk", function () {
        SectionAdd();
    });

    //섹션 편집창 열기
    $(document).on("click", "#editSection", function () {

//        var curSectionIdx = $("#multiple-select option:checked").val();
//        var curSectionName = $("#multiple-select option:checked").text();
        var curSectionIdx = $("#a li .active").data('id');
        var curSectionName = $("#a li .active").text();

        if (curSectionIdx == undefined) {
            alert("Please select a section");
            return false;
        }

        $("#smallmodal2").modal("show");
        $("#sectionName").val(curSectionName);
        $("#modalSectionIdx").text(curSectionIdx);
    });

    //섹션 삭제
    $(document).on("click", "#delSection", function () {
//        var curSectionIdx = $("#multiple-select option:checked").val();
        var curSectionIdx = $("#a li .active").data('id');

        //선택된 섹션이 있는지 확인
        if (curSectionIdx == undefined) {
            alert("Please select a section");
            return false;
        }
        if (confirm("Are you sure you want to delete the current section?") == true) {
            $.ajax({
                url: "/delSection", //서버요청주소
                type: "post",//요청방식 (get,post,patch,delete,put)
                data: "curSectionIdx=" + curSectionIdx,
                dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success: function () {
                    alert("The section has been deleted.");
                    SectionAjax();
                    printTotalGrade();
                }, //성공했을때
                error: function (request) {
                    alert(request.responseText);
                }// 실패했을때
            });
        }
    });

    //과제 항목 선택 : 삭제, Please Select, 다른 과제

    //이전 값 저장하기 위한 변수
    var prev_val;
    $(document).on("click", "select[name=select]", function () {
        //클릭 이전의 과제 저장
        prev_val = $(this).val();
//        console.log(prev_val);
    }).on("change", "select[name=select]", function () {
        //삭제하기를 선택
        if ($(this).val() == "del") {
            if (confirm("Are you sure you want to delete the task item?")) {

                var curIndex = $(this).parent().parent().parent().find("th").index($(this).parent().parent());

                var sectionTasksIdx = $(this).attr('data-id');
                $.ajax({
                    url: "/class_delTask", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "sectionTasksIdx=" + sectionTasksIdx,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function (result) {
                        alert("Delete completed");
//                        SectionAjax();
                        var curSectionIdx = $("#a li .active").data('id');
//                        printTaskChart(curSectionIdx);
//                        alert(curIndex);
                        $("#taskListTr th:eq("+curIndex+")").remove();
                        $("#taskChart tr").each(function(){
                            $(this).find("td:eq("+curIndex+")").remove();
                        });
                        usedTaskSize-=1;
                        printTotalGrade();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }
                });// 실패했을때
            } else {
                //이전 선택으로 돌아가기
                $(this).val(prev_val);
            }
            //Please Select를 선택
        } else if ($(this).val() == "select") {
            alert("This item cannot be selected.");
            $(this).val(prev_val);
            //과제 항목을 선택
        } else {
            var checked = 0;

            var length = $("select[name=select]").length;
            //이미 동일한 과제 항목이 있을 경우
            $("select[name=select]").each(function (index, item) {
                for (var i = 0; i <= length - 1; i++) {
                    // alert(index + " | " + i);
                    // alert($(item).val() +" | "+ $("select[name=select]").eq(i).val());
/*                    if (index != i && $(item).val() != "select") {
                        if ($(item).val() == $("select[name=select]").eq(i).val()) {
                            alert("You cannot select the same task item.");
                            checked = 1;
                            return false;
                        }
                    }*/
                }
            });

            if (checked == 0) {

                var sectionTasksIdx = $(this).attr('data-id');
                var targetTaskIdx = $(this).val();
                // alert(targetTaskIdx);
                $.ajax({
                    url: "/class_changeTask", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "sectionTasksIdx=" + sectionTasksIdx + "&targetTaskIdx=" + targetTaskIdx,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function () {
                        printTotalGrade();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }
                });// 실패했을때

            } else {
                $(this).val(prev_val);
            }
        };

    });

    //과제 항목 추가
    $(document).on("click", "#addTaskBtn", function () {
        // 열 제목 추가
//        var curSectionIdx = $("#multiple-select option:checked").val();
        var curSectionIdx = $("#a li .active").data('id');

        if (curSectionIdx == undefined) {
            alert("Please select a section");
            return false;
        }

        $.ajax({
            url: "/addTask", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "curSectionIdx=" + curSectionIdx + "&curClassIdx=" + curClassIdx,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
//                 console.log(result);
//                printTaskChart(curSectionIdx);
                var str2 = "";
                var str3 = "";

                str2 = str2 + "<th><div class=\"col-12 col-md-9\">\n" +
                    "<select data-id=\"" + result.sectionTasks.sectionTasksIdx + "\" name=\"select\" class=\"form-control\">\n" +
                    "\n" +
                    "</select>\n" +
                    "</div></td>\n";

                //Head - Tr 추가하기
                $("#taskListTr").append(str2).trigger("create");
                $("#taskListTr th:last div select").append("<option class=\"option\" value=\"select\">Please Select</option>").trigger("create");

                //Head - Td 추가하기
                $.each(result.task, function (index2, item2) {
                     str3 = str3 + "<option class=\"option\" value=\"" + item2.taskIdx + "\">" + item2.taskItemName + "</option>";
                });
                    str3 = str3 + "<option class=\"option\" value=\"del\">Delete</option>";
                $("#taskListTr th:last div select").append(str3).trigger("create");
                $("#taskListTr th:last").append("<input tabindex=\"1\" type=\"text\" placeholder=\"\" class=\"form-control maxScore\">").trigger("create");
                $("#taskListTr th:last").append("<input tabindex=\"1\" type=\"text\" placeholder=\"\" class=\"form-control memo\">").trigger("create");

                //select css 수정
                $("#taskListTr th:last .js-select2").each(function () {
                    $(this).select2({
                        minimumResultsForSearch: Infinity,
                        dropdownParent: $(this).next('.dropDownSelect2')
                    });
                });

                $(".select2-selection--single").css("box-shadow", "none");

                //학생 목록 출력
                var tabindex = $("#taskChart tr:last td:last input").attr('tabindex');
                if(tabindex==null) tabindex=1;

               $("#taskChart tr").each(function(){
                    tabindex = Number(tabindex)+1;
                    $(this).append("<td><input tabindex=\""+tabindex+"\" type=\"text\" placeholder=\"\" class=\"form-control\"></td>");
               });

               usedTaskSize = usedTaskSize + 1;
                $("#taskListTr th:last div select").focus();
            }, //성공했을때
            error: function (request) {
                alert("Failed to Create.");
                console.log(request.responseText);
            }// 실패했을때
        });
    });

    //섹션 클릭시 과제 항목 출력 & 입력
/*    $(document).on("click", "#multiple-select option", function () {
        var curSectionIdx = $("#multiple-select option:checked").val();
        printTaskChart(curSectionIdx);
    });*/

    $(document).on("click", "#a li a", function () {
        var sBtn = $("#a > li a");
        sBtn.removeClass("active");     // sBtn 속에 (active) 클래스를 삭제 한다.
        $(this).addClass("active"); // 클릭한 a에 (active)클래스를 넣는다.

        var curSectionIdx = $(this).data("id");
        printTaskChart(curSectionIdx);
    });

    //과제 점수 등록
    $("#saveTask").on('click', function () {
        //이미 수행중이면 종료
        if(isRun == true) { return; }

            var check = 0;
        //선택된 섹션이 없으면 오류
//        var curSectionIdx = $("#multiple-select option:checked").val();
        var curSectionIdx = $("#a li .active").data('id');
        if (curSectionIdx == undefined) {
            alert("Please select a section");
            check = 1;
            return false;
        }

            if (check == 1) {
            return false;
            }

        //선택안된 과제항목 체크
        $("#taskList tr th div select").each(function (index, item) {
            if ($(item).val() == "select") {
                alert("Please select an Task item.");
                check = 1;
                $(item).focus();
                return false;
            }
        });

        if (check == 1) {
            return false;
        }

        //maxScore 체크
        $.each($(".maxScore"),function(index, item){
           if($(item).val() <= 0 && $(item).val() != "" /*|| $(item).val() == "" */){
               alert(" Please check the Total Point.");
               check = 1;
               $(item).focus();
               return false;
           }
        });

        if (check == 1) {
            return false;
        }


        //데이터 전송을 위한 배열 만들기
        var taskChart = new Array();
        // 섹션id
//        var curSectionIdx = $("#multiple-select option:checked").val();
        var curSectionIdx = $("#a li .active").data('id');
        // console.log("현재 섹션 Idx : " + curSectionIdx);

        //테이블 점수 가져오기
        for (var i = 0; i < studentSize; i++) {

            var curRow = $("#taskChart tr:eq(" + i + ")");

            for (var j = 0; j < usedTaskSize; j++) {

                //학생id
                //text를 가져올 경우 조작이 가능하다!
                var studentIdx = $(".studentIdx").eq(i).text();


                //과제항목id
                var taskIdx = $("select[name=select]:eq(" + j + ")").val();
                //점수
                var score = curRow.find("td:eq(" + Number(j + 2) + ")").children().val();
                //sectionTasksIdx
                var sectionTasksIdx = $("select[name=select]:eq(" + j + ")").data("id");
                //maxScore
                var maxScore = $(".maxScore:eq(" + j + ")").val();

                //점수 체크
                //maxScore이상인지 체크
                if (Number(score) > Number(maxScore)) {
                   /* alert("Scores cannot exceed " +Number(maxScore));
                    curRow.find("td:eq(" + Number(j + 2) + ")").children().focus();
                    return false;*/
//                    maxScore체크
                        if(maxScore==""&&score>=0){
                       alert("Please input Total Point");
                       $(".maxScore:eq(" + j + ")").focus();
                       return false;
                    }
                } else if (score < 0) {
                    //0이하인지 체크
                    alert("Scores cannot be less than 0");
                    curRow.find("td:eq(" + Number(j + 2) + ")").children().focus();
                    return false;
                    //소수점 자리수가 2자리 이상인지 체크
                } else if (score.indexOf('.') != -1) {
                    var score_length = score.substring(score.indexOf('.') + 1).length;
                    if (score_length > 2) {
                        alert("You can enter only the 2nd decimal place.");
                        curRow.find("td:eq(" + Number(j + 2) + ")").children().focus();
                        return false;
                    }
                } else if(isNaN(score)){
                    alert("Failed to save. Please check the input value.");
                    curRow.find("td:eq(" + Number(j + 2) + ")").children().focus();
                    return false;
                }

                //과제id (있을경우)
                var scoreIdx = curRow.find("td:eq(" + Number(j + 2) + ")").children().attr("data-id");

                // console.log("idx : " + scoreIdx + "현재 학생 Idx : " + studentIdx + " || 현재 과제 Idx : " + taskIdx);
                var data = new Object();
                if (score != "") {
                    data.score = score;
                    // console.log("현재 점수:" + score);
                }

                data.scoreIdx = scoreIdx;
                data.studentIdx = studentIdx;
                data.taskIdx = taskIdx;
                data.sectionTasks = sectionTasksIdx;

                taskChart.push(data);
            }
        }

         
        //sectionItem : maxScore 저장
        var sectionTasksList = new Array();
        $.each($(".maxScore"),function(index, item){
            var sectionTasks = new Object();
            var maxScore = $(item).val();
//            console.log(maxScore);
            var memo = $(item).parent().find(".memo").val();
            var sectionTasksIdx = $(item).parent().find("div").children().data('id');
            sectionTasks.sectionTasksIdx = sectionTasksIdx;
            sectionTasks.maxScore = maxScore;
            sectionTasks.memo = memo;
            sectionTasksList.push(sectionTasks);
        });

        //상태를 수행중으로 표시
        isRun = true;

        //저장 Ajax
        $.ajax({
            url: "/saveTaskScore", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            async : false, //중복처리 방지
            data: "taskChart=" + JSON.stringify(taskChart) + "&curSectionIdx=" + curSectionIdx+"&sectionTasksList="+JSON.stringify(sectionTasksList),
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function () {
                alert("Saved successfully.");
                printTaskChart(curSectionIdx);
                printTotalGrade();
                // location.reload();
//                $("#multiple-select").focus();
                $("#a").focus();
                isRun  = false;
            }, //성공했을때
            error: function (request) {
                alert("Failed to save. Please check the input value.");
                isRun  = false;
                console.log(request.responseText);
            }// 실패했을때
        });

        //수정 하기
    });

    //과제 Clear
    $("#clear").on('click', function () {
        var input = $("#taskChart tr td input");
        $.each(input, function (index, item) {
            $(item).val("");
        });
    });

    //과제 Cancel
    $("#cancel").on('click', function () {
        if (confirm("Are you sure you want to go back?")) {
            location.href = '/class_list';
        }
    });

    //최종성적 과제점수 선택시
    $(document).on("click", ".taskScore", function () {

        //기존 차트 삭제
        $("#largeModal .modal-body .au-card-inner").empty();
        var str= "<h3 class=\"title-2 m-b-20\">Task Scores</h3>\n" +
                "<canvas id=\"myChart\"></canvas>"
        //새로운 차트
        $("#largeModal .modal-body .au-card-inner").append(str);

        //모달 열기
        $("#largeModal").modal('show');

        //선택한 점수의 과제idx와 학생idx 구하기
        var authStudentIdx = $(this).parent().find("td:first div").data("id");
        var thisIndex = $(this).parent().find("td").index(this);
        var taskIdx = $("#GradeList tr th:eq("+(thisIndex)+") div").data("id");

        var studentName = $(this).parent().find("td:first").text();
        var taskName = $("#GradeList tr th:eq("+(thisIndex)+")").text();

        $.ajax({
            url: "/findAuthStudentTaskChart", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "taskIdx=" + taskIdx+"&authStudentIdx=" + authStudentIdx+"&curClassIdx="+curClassIdx,
            async: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                //결과값 확인
                // console.log(result);

                var sectionName = [];
                var score = [];
                var maxScore = [];
                var avg = [];

                //짤림 방지
                var maxNumber = 0;

                for(var i in result){
                    sectionName.push(result[i].sectionName);
                    score.push(Math.floor(result[i].score * 100) / 100);
                    maxScore.push(result[i].maxScore);
                    //소수점 자리 맞추기, avg가 없으면 null로 유지
                    if(result[i].avg!=null) avg.push(Math.floor(result[i].avg * 100) / 100);
                    else avg.push(result[i].avg);

                    //가장 높은 점수 저장
                    if(maxNumber<=result[i].maxScore) maxNumber = result[i].maxScore;
                    if(maxNumber<=result[i].avg) maxNumber = result[i].avg;
                }



                var ctx = document.getElementById("myChart");
                if (ctx) {
                    ctx.height = 150;
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            //섹션명
                            labels: sectionName,
                            // type: 'line',
                            defaultFontFamily: 'Poppins',
                            datasets: [{
                                label: "AVG",
                                //평균 점수
                                data: avg,
                                backgroundColor: 'transparent',
                                borderColor: 'rgba(220,53,69,0.75)',
                                borderWidth: 3,
                                pointStyle: 'circle',
                                pointRadius: 5,
                                pointBorderColor: 'transparent',
                                pointBackgroundColor: 'rgba(220,53,69,0.75)',
                                type: 'line',
                            }, {
                                label: "Score",
                                //점수
                                data: score,
                                backgroundColor:'#4BC0C0'
                            }, {
                                label: "Total Point",
                                //총 점수
                                data: maxScore,
                                backgroundColor: '#E5E5E5',
                            }]
                        },
                        options: {
                            responsive: true,
                            tooltips: {
                                mode: 'index',
                                titleFontSize: 12,
                                titleFontColor: '#000',
                                bodyFontColor: '#000',
                                backgroundColor: '#fff',
                                titleFontFamily: 'Poppins',
                                bodyFontFamily: 'Poppins',
                                cornerRadius: 3,
                                intersect: false,
                            },
                            hover: {
                                animationDuration: 0,
                            },
                            animation: {
                                onComplete: function () {
                                    var chartInstance = this.chart,
                                        ctx = chartInstance.ctx;
                                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                                    ctx.fillStyle = 'Black';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'bottom';

                                    this.data.datasets.forEach(function (dataset, i) {

                                        if(i==0){
                                            var meta = chartInstance.controller.getDatasetMeta(i);
                                            meta.data.forEach(function (bar, index) {
                                                var data = dataset.data[index];
                                                ctx.fillText(data, bar._model.x, bar._model.y -5);
                                            });
                                        }
                                    });
                                }
                            },
                            legend: {
                                display: false,
                                labels: {
                                    usePointStyle: true,
                                    fontFamily: 'Poppins',
                                    // padding:50
                                },
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    gridLines: {
                                        display: false,
                                        drawBorder: false
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Section',
                                        fontFamily: "Poppins"
                                    },
                                    ticks: {
                                        fontFamily: "Poppins",
                                        fontSize : 10,
                                        //글자 기울임 없애기
                                        // minRotation: 0,
                                        // maxRotation: 0,
                                    }
                                }],
                                yAxes: [{
                                    display: true,
                                    gridLines: {
                                        display: true,
                                        drawBorder: false
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Score',
                                        fontFamily: "Poppins"
                                    },
                                    ticks: {
                                        fontFamily: "Poppins",
                                        max : maxNumber+5,
                                        min : 0,
                                        fontSize : 10
                                        // beginAtZero: true
                                        // max:10
                                        //여기 max totalpoint의 +5를 저장
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: studentName + " : " + taskName,
                                fontSize : 16,
                                fontFamily: "Poppins",
                                fontStyle : 'bold'
                            }
                        }
                    });
                }




            }, //성공했을때

            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });




    });

    //최종성적 모달창 Enter입력시 취소버튼 클릭
    $("#largeModal").keyup(function(event) {
        if (event.keyCode === 13 || event.keyCode === 32 ) {
            $("#largeModal button").click();
        }
    });

    //삭제된 기능
    //초기 과제 항목 테이블 출력 : 학생과 과제 정보만 볼수 있는.
    // TaskTemplate();
    /*function TaskTemplate() {
        $.ajax({
            url : "/findTaskTemplate", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            data : "curClassIdx="+curClassIdx,
            dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result){
                console.log(result);



                // 섹션 생성
                $("#taskChart").empty();
                $("#taskList").empty();

                //현 섹션에 사용중인 과제로 열 구성하기
                //모든 과제 목록 가져오기

                // Head - Tr 생성
                var str = "<tr id=\"taskListTr\"><th style=\"width: 10%;border-top: none;font-size: 0.38cm;padding-bottom: 21.5px;padding-right: 40px;\">Name</th></tr>";
                $("#taskList").append(str).trigger("create");

                $.each(result.sectionItemList,function(index,item){
                    var str2 = "";
                    var str3 = "";

                    str2 = str2+ "<th><div class=\"col-12 col-md-9\">\n" +
                        "<select name=\"select\" class=\"form-control\">\n" +
                        "\n" +
                        "</select>\n" +
                        "</div></td>\n";

                    //Head - Tr 추가하기
                    $("#taskListTr").append(str2).trigger("create");
                    //css 적용
                    $('head').append('<link rel="stylesheet" href="css/class.css" type="text/css" />');

                    //Head - Td 추가하기
                    $.each(result.taskList,function(index2,item2) {
                        // console.log(item2.taskItemInfo + " | " + item.taskItemInfo.taskItemInfoIdx)
                        if(item2.taskItemInfoIdx==item.taskItemInfo.taskItemInfoIdx){
                            str3 = str3 + "<option class=\"option\" selected=\"selected\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>"

                        } else {
                            // alert("수행됨");
                            str3 = str3 + "<option class=\"option\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>"
                        }
                    });
                    str3= str3 +  "<option class=\"option\" value=\"del\">Delete</option>";
                    $("#taskListTr th:last div select").append(str3).trigger("create");
                });

                //과제 추가 버튼
                str = "<th style=\"border-top: none;border-bottom: none\"><button id = \"addTaskBtn\" class=\"au-btn au-btn-icon au-btn--green au-btn--small\" style=\"height: 35px;width: 47px;\">\n" +
                    "                                                        <i class=\"zmdi zmdi-plus\"></i></button></th>"
                $("#taskListTr").append(str).trigger("create");

                //select css 수정
                $(".js-select2").each(function () {
                    $(this).select2({
                        minimumResultsForSearch: Infinity,
                        dropdownParent: $(this).next('.dropDownSelect2')
                    });
                });
                $('.js-select2').on('select2:select', function (e) {
                    var data = e.params.data;
                    console.log(data);
                });
                $(".select2-selection--single").css("box-shadow","none");


                //학생 목록 출력
                var str = "<tr>";
                $.each(result.studentList,function(index,item){
                    str = str + "<td>"+item.studentName+"</td><td hidden class=\"studentIdx\">"+item.studentIdx+"</td>"
                    $.each(result.sectionItemList,function(index2,item2){
                        str = str+"<td><input type=\"text\" placeholder=\"\" class=\"form-control\"></td>";
                    });
                    str = str+"</tr>";
                    $("#taskChart").append(str).trigger("create");
                    str = "<tr>";

                });


            } , //성공했을때

            error : function(request){
                alert(request.responseText);
            }// 실패했을때
        });
    }*/

    //밖으로 빠져나간 메소드
    /* function SectionAjax(){
        $("#multiple-select").empty();
        $("#sectionName").val("");

        $.ajax({
            url : "/findSectionList", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            data : "curClassIdx="+curClassIdx,
            dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result){
                //섹션 생성
                $("#multiple-select").empty();

                var lastIndex = Number(result.length-1);
                var curSectionIdx = "";

                $.each(result, function(index, item) {
                    var sectionName = item.sectionName;
                    var sectionIdx = item.sectionIdx;
                    var str = "<option value=\""+sectionIdx+"\">"+sectionName+"</option>";
                    $("#multiple-select").append(str);

                    //출력을 위해 제일 마지막 섹션 idx를 구함
                    if(lastIndex == index){
                        curSectionIdx = item.sectionIdx;
                    }
                });
                // alert("StudentAjax 성공");

                //마지막 섹션 클릭처리
                if(curSectionIdx!=""){
                    printTaskChart(curSectionIdx);
                    $("#multiple-select option:last").prop("selected",true);
                }

            } , //성공했을때
            error : function(request){
                alert(request.responseText);
            }// 실패했을때
        });
    }*/
    /* function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }*/
    /* function printTaskChart(curSectionIdx){

        $.ajax({
            url : "/findTaskChart", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            data : "curSectionIdx="+curSectionIdx+"&curClassIdx="+curClassIdx,
            dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result){
                console.log(result);
                // 섹션 생성
                $("#taskChart").empty();
                $("#taskList").empty();

                //현 섹션에 사용중인 과제로 열 구성하기
                //모든 과제 목록 가져오기

                // Head - Tr 생성
                var str = "<tr id=\"taskListTr\"><th style=\"border-top: none;font-size: 0.38cm;padding-bottom: 21.5px;padding-right: 40px;\">Name</th></tr>";
                $("#taskList").append(str).trigger("create");


                $.each(result.usedList,function(index,item){
                    var str2 = "";
                    var str3 = "";

                    str2 = str2+ "<th><div class=\"col-12 col-md-9\">\n" +
                        "<select data-id=\""+item.sectionItemIdx+"\" name=\"select\" class=\"form-control\">\n" +
                        "\n" +
                        "</select>\n" +
                        "</div></td>\n";

                    //Head - Tr 추가하기
                    $("#taskListTr").append(str2).trigger("create");

                    if(item.taskItemInfo==null) {
                        $("#taskListTr th:last div select").append("<option class=\"option\" value=\"select\">Please Select</option>").trigger("create");
                    }

                    //Head - Td 추가하기
                    $.each(result.taskList,function(index2,item2) {

                        if(item.taskItemInfo==null){
                            str3 = str3 + "<option class=\"option\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>";
                            return true;
                        }

                        if(item2.taskItemInfoIdx==item.taskItemInfo.taskItemInfoIdx){
                            str3 = str3 + "<option class=\"option\" selected=\"selected\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>";

                        } else {
                            str3 = str3 + "<option class=\"option\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>";
                        }
                    });
                    str3= str3 +  "<option class=\"option\" value=\"del\">Delete</option>";
                    $("#taskListTr th:last div select").append(str3).trigger("create");
                });

                //css 적용
                $('head').append('<link rel="stylesheet" href="css/class.css" type="text/css" />');

                //과제 추가 버튼
                /!*str = "<th style=\"border-top: none;border-bottom: none\"><button id = \"addTaskBtn\" class=\"au-btn au-btn-icon au-btn--green au-btn--small\" style=\"height: 35px;width: 47px;\">\n" +
                    "                                                        <i class=\"zmdi zmdi-plus\"></i></button></th>"
                $("#taskListTr").append(str).trigger("create");*!/

                //select css 수정
                $(".js-select2").each(function () {
                    $(this).select2({
                        minimumResultsForSearch: Infinity,
                        dropdownParent: $(this).next('.dropDownSelect2')
                    });
                });
                $('.js-select2').on('select2:select', function (e) {
                    var data = e.params.data;
                    console.log(data);
                });

                $(".select2-selection--single").css("box-shadow","none");


                //학생 목록 출력
                var str = "<tr>";
                $.each(result.studentList,function(index,item){
                    str = str + "<td>"+item.studentName+"</td><td hidden class=\"studentIdx\" data-id=\""+item.studentIdx+"\">"+item.studentIdx+"</td>"
                    $.each(result.usedList,function(index2,item2){
                        str = str+"<td><input type=\"text\" placeholder=\"\" class=\"form-control\"></td>";
                    });
                    str = str+"</tr>";
                    $("#taskChart").append(str).trigger("create");
                    str = "<tr>";
                });


                //빈칸에 과제idx 넣기???

                var roundIndex = result.usedList.length;
                var curTaskIdx;

                //값 입력
                $.each(result.classChart,function(index,item) {
                    //일치 학생 idx 찾기 : tr
                    var curStudentTd = $(".studentIdx[data-id=\""+item.studentStudentIdx+"\"]");
                    //일치 과제 idx 찾고 점수 삽입 : td
                    for (var i = 0; i < roundIndex; i++) {
                        // alert($("#taskList tr th:eq("+i+") div select option").attr('selected','selected').val());

                        //select에 selected되어있는 option의 value값을 가지고 온다.
                        curTaskIdx = $("select[name=select]:eq(" + i + ")").val();
                        if (item.taskItemInfoTaskItemInfoIdx == curTaskIdx) {
                            curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().val(item.taskScore);
                            curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().attr('data-id',item.taskItemIdx);
                        }
                    }
                });

                //전역변수에 테이블의 크기를 입력
                studentSize = result.studentList.length;
                usedTaskSize = result.usedList.length;

            } , //성공했을때

            error : function(request){
                alert(request.responseText);
            }// 실패했을때
        });
    }*/


});

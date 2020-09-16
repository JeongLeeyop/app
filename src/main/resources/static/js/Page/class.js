////////////////////////////////////////////////////////////////////
//                                                                //
//                             클래스                             //
//                                                                //
////////////////////////////////////////////////////////////////////

//현재 클래스 Idx
var curClassIdx = getParameterByName("idx");

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
            SectionAjax()
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
    $("#multiple-select").empty();
    $("#sectionName").val("");

    $.ajax({
        url: "/findSectionList", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curClassIdx=" + curClassIdx,
        async: false,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {

            //섹션 생성
            var lastIndex = Number(result.length - 1);
            var curSectionIdx = "";

            $.each(result, function (index, item) {
                var sectionName = item.sectionName;
                var sectionIdx = item.sectionIdx;
                var str = "<option value=\"" + sectionIdx + "\">" + sectionName + "</option>";
                $("#multiple-select").append(str);

                //출력을 위해 제일 마지막 섹션 idx를 구함
                if (lastIndex == index) {
                    curSectionIdx = item.sectionIdx;
                }
            });
            // alert("StudentAjax 성공");

            //마지막 섹션 클릭처리
            if (curSectionIdx != "") {
                printTaskChart(curSectionIdx);
                $("#multiple-select option:last").prop("selected", true);
            }

        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
}

//과제 차트 출력
function printTaskChart(curSectionIdx) {

    $.ajax({
        url: "/findTaskChart", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curSectionIdx=" + curSectionIdx + "&curClassIdx=" + curClassIdx,
        async: false,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {

            //학생목록 전역변수에 저장 : 최종성적 출력에 사용
            stList = result.studentList;
            //과제목록 전역변수에 저장 : 최종성적 출력에 사용
            tkList = result.taskList;

            console.log(result);

            $("#taskChart").empty();
            $("#taskList").empty();

            //현 섹션에 사용중인 과제로 열 구성하기
            //모든 과제 목록 가져오기

            // Head - Tr 생성
            var str = "<tr id=\"taskListTr\"><th style=\"border-top: none;font-size: 0.38cm;padding-bottom: 30.5px;padding-right: 40px;\">Name</th></tr>";
            $("#taskList").append(str).trigger("create");

            $.each(result.usedList, function (index, item) {
                var str2 = "";
                var str3 = "";

                str2 = str2 + "<th><div class=\"col-12 col-md-9\">\n" +
                    "<select data-id=\"" + item.sectionItemIdx + "\" name=\"select\" class=\"form-control\">\n" +
                    "\n" +
                    "</select>\n" +
                    "</div></td>\n";

                //Head - Tr 추가하기
                $("#taskListTr").append(str2).trigger("create");

                if (item.taskItemInfo == null) {
                    $("#taskListTr th:last div select").append("<option class=\"option\" value=\"select\">Please Select</option>").trigger("create");
                }

                //Head - Td 추가하기
                $.each(result.taskList, function (index2, item2) {

                    if (item.taskItemInfo == null) {
                        str3 = str3 + "<option class=\"option\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>";
                        return true;
                    }

                    if (item2.taskItemInfoIdx == item.taskItemInfo.taskItemInfoIdx) {
                        str3 = str3 + "<option class=\"option\" selected=\"selected\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>";

                    } else {
                        str3 = str3 + "<option class=\"option\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>";
                    }
                });
                str3 = str3 + "<option class=\"option\" value=\"del\">Delete</option>";
                $("#taskListTr th:last div select").append(str3).trigger("create");
                $("#taskListTr th:last").append("<input type=\"text\" placeholder=\"\" class=\"form-control maxScore\">").trigger("create");
                $("#taskListTr th:last input").val(item.maxScore);
            });

            //css 적용
            $('head').append('<link rel="stylesheet" href="css/class.css" type="text/css" />');

            //과제 추가 버튼
            /*str = "<th style=\"border-top: none;border-bottom: none\"><button id = \"addTaskBtn\" class=\"au-btn au-btn-icon au-btn--green au-btn--small\" style=\"height: 35px;width: 47px;\">\n" +
                "                                                        <i class=\"zmdi zmdi-plus\"></i></button></th>"
            $("#taskListTr").append(str).trigger("create");*/

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

            $(".select2-selection--single").css("box-shadow", "none");


            //학생 목록 출력
            var str = "<tr>";
            $.each(result.studentList, function (index, item) {

                //과제 점수 입력 창
                str = str + "<td>" + item.studentName + "</td><td hidden class=\"studentIdx\" data-id=\"" + item.studentIdx + "\">" + item.studentIdx + "</td>"
                $.each(result.usedList, function (index2, item2) {
                    str = str + "<td><input type=\"text\" placeholder=\"\" class=\"form-control\"></td>";
                });
                str = str + "</tr>";
                $("#taskChart").append(str).trigger("create");
                str = "<tr>";


            });

            //빈칸에 과제idx 넣기???

            var roundIndex = result.usedList.length;
            var curTaskIdx;

            //값 입력
            $.each(result.classChart, function (index, item) {
                //일치 학생 idx 찾기 : tr
                var curStudentTd = $(".studentIdx[data-id=\"" + item.studentStudentIdx + "\"]");
                //일치 과제 idx 찾고 점수 삽입 : td
                for (var i = 0; i < roundIndex; i++) {
                    // alert($("#taskList tr th:eq("+i+") div select option").attr('selected','selected').val());

                    //select에 selected되어있는 option의 value값을 가지고 온다.
                    curTaskIdx = $("select[name=select]:eq(" + i + ")").val();
                    if (item.taskItemInfoTaskItemInfoIdx == curTaskIdx) {
                        curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().val(item.taskScore);
                        curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().attr('data-id', item.taskItemIdx);
                    }
                }
            });
            //전역변수에 테이블의 크기를 입력
            studentSize = result.studentList.length;
            usedTaskSize = result.usedList.length;

        }, //성공했을때

        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
}

//주소창의 파라메터를 가져오는 함수
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//성적 비율 출력
function printGradeChart() {

    $.ajax({
        url: "/findTaskItemInfoList", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curClassIdx=" + curClassIdx,
        async: false,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            // console.log(result);

            //과제등급표
            $.each(result, function (index, item) {
                var str = "<tr>\n" +
                    "                            <td>" + item.taskItemName + "</td>\n" +
                    "                            <td>" + item.taskGradeRatio + "%</td>\n" +
                    "                        </tr>";

                $("#gradeChart tbody").append(str);
            });

            //학생 종합 성적 타이틀 출력
            $.each(result, function (index, item) {
                $("#GradeList tr").append("<th><div hidden>" + item.taskItemInfoIdx + "</div>" + item.taskItemName + "</th>")
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
        str = str + "<tr><td><div hidden data-id=\"" + item.studentIdx + "\"></div>" + item.studentName + "</td></tr><tr class=\"spacer\"></tr>";
        $("#TotalGradeChart").append(str).trigger("create");
        str = "";

        $.each(tkList, function (index2, item2) {
            $("#TotalGradeChart tr").last().prev().append("<td></td>");
        });
    });


    $.ajax({
        url: "/findTotalGrade", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curClassIdx=" + curClassIdx,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            console.log(result);

            //학생 수만큼 반복
            $.each($("#TotalGradeChart tr td div"), function (index2, item2) {

                var FinalGrade = 0;

                //과제 수만큼 반복
                $.each($("#GradeList tr th"), function (index3, item3) {

                    //매칭을 위한 변수 선언
                    var stIdx = $(item2).data("id");
                    var taskIdx = $(item3).children().text();

                    //과제idx 순서대로 점수를 담을 리스트 선언
                    var list = new Array();

                    //모든 값 가져오기
                    $.each(result, function (index, item) {

                        //학생idx와 매칭
                        if (stIdx == item.studentIdx) {
                            //과제idx와 매칭
                            if (index3 != 0 && index3 != $("#GradeList tr th").length - 1) {
                                if (taskIdx == item.taskItemInfoIdx) {
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
    //select css 수정
    SectionAjax();
    printGradeChart();
    printTotalGrade();


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

        var curSectionIdx = $("#multiple-select option:checked").val();
        var curSectionName = $("#multiple-select option:checked").text();

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
        var curSectionIdx = $("#multiple-select option:checked").val();

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
                success: function (result) {
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

    //과제 항목 선택
    //과제 항목의 이전 값을 저장하기 위한 변수
    var prev_val;
    $(document).on("focus", "select[name=select]", function () {
        prev_val = $(this).val();
        // alert(prev_val);
    }).on("change", "select[name=select]", function () {
        //삭제하기를 선택
        if ($(this).val() == "del") {
            if (confirm("Are you sure you want to delete the task item?")) {
                var sectionItemIdx = $(this).attr('data-id');
                // alert(sectionItemIdx);
                $.ajax({
                    url: "/class_delTask", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "sectionItemIdx=" + sectionItemIdx,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function (result) {
                        alert("Delete completed");
                        SectionAjax();
                        printTotalGrade();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }
                });// 실패했을때
            } else {
                $(this).val(prev_val);
            }
            //Please Select를 선택
        } else if ($(this).val == "select") {
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
                    if (index != i && $(item).val() != "select") {
                        if ($(item).val() == $("select[name=select]").eq(i).val()) {
                            alert("You cannot select the same task item.");
                            checked = 1;
                            return false;
                        }
                    }
                }
            });

            if (checked == 0) {

                var sectionItemIdx = $(this).attr('data-id');
                var targetTaskIdx = $(this).val();
                // alert(targetTaskIdx);
                $.ajax({
                    url: "/class_changeTask", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "sectionItemIdx=" + sectionItemIdx + "&targetTaskIdx=" + targetTaskIdx,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function (result) {
                        printTotalGrade();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }
                });// 실패했을때

            } else {
                $(this).val(prev_val);
            }
        }
        ;


        // $(this).find("option:selected").attr("selected",false);
        // $(this).attr('selected',true);
    });

    //과제 항목 추가
    $(document).on("click", "#addTaskBtn", function () {
        // 열 제목 추가
        var curSectionIdx = $("#multiple-select option:checked").val();

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
                console.log(result);

                /*var str2 = "";

                str2 = str2+ "<th><div class=\"col-12 col-md-9\">\n" +
                    "<select data-id=\""+result.sectionItem.sectionItemIdx+"\" name=\"select\" class=\"form-control\">\n" +
                    "</select>\n" +
                    "</div></td>\n";

                //Head - Tr 추가하기
                $("#taskList tr th").append(str2).trigger("create");
                //css 적용
                $('head').append('<link rel="stylesheet" href="css/class.css" type="text/css" />');

                $("#taskList tr th div select").last().append("<option class=\"option\" value=\"select\">Please Select</option>").trigger("create");
                //Head - Td 추가하기
                var str = "";

                $.each(result.taskItemInfo , function (index, item) {
                    str = str + "<option class=\"option\" value=\"" + item.taskItemInfoIdx + "\">" + item.taskItemName + "</option>"
                });
                str = str + "<option class=\"option\" value=\"del\">Delete</option>";
                // $("#taskListTr th:last div select").append(str3).trigger("create");

                // var str = "<td>a</td>";
                $("#taskList tr th div select").last().append(str).trigger("create");

                var stock_tbody_tr = $("#taskChart tr");
                for (var i=0; i<stock_tbody_tr.length; i++) {
                    var str = "<td><input type=\"text\" placeholder=\"\" class=\"form-control\"></td>";
                    $("#taskChart tr").eq(i).append(str);
                }*/

                printTaskChart(curSectionIdx);

            }, //성공했을때
            error: function (request) {
                alert("Failed to Create.");
                console.log(request.responseText);
            }// 실패했을때
        });
    });

    //섹션 클릭시 과제 항목 출력 & 입력
    $(document).on("click", "#multiple-select option", function () {
        var curSectionIdx = $("#multiple-select option:checked").val();

        printTaskChart(curSectionIdx);

        /*$.ajax({
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
                    //css 적용
                    $('head').append('<link rel="stylesheet" href="css/class.css" type="text/css" />');

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
        });*/
    });

    //과제 점수 등록
    $("#saveTask").on('click', function () {
        //이미 수행중이면 종료
        if(isRun == true) { return; }

        //선택된 섹션이 없으면 오류
        var curSectionIdx = $("#multiple-select option:checked").val();
        if (curSectionIdx == undefined) {
            alert("Please select a section");
            return false;
        }

        var check = 0;
        //선택안된 과제항목 체크
        $("#taskList tr th div select").each(function (index, item) {
            if ($(item).val() == "select") {
                alert("Please select an Task item.");
                check = 1;
            }
        });

        //maxScore 체크
        $.each($(".maxScore"),function(index, item){
           if($(item).val() <= 0 ){
               alert(" Please check the Task MaxScore.");
               check = 1;
           }
        });
        if (check == 1) {
            return false;
        }


        //데이터 전송을 위한 배열 만들기
        var taskChart = new Array();
        // 섹션id
        var curSectionIdx = $("#multiple-select option:checked").val();
        console.log("현재 섹션 Idx : " + curSectionIdx);

        //테이블 점수 가져오기
        for (var i = 0; i < studentSize; i++) {
            var curRow = $("#taskChart tr:eq(" + i + ")");
            for (var j = 0; j < usedTaskSize; j++) {

                //학생id
                var studentIdx = $(".studentIdx").eq(i).text();

                //과제항목id
                var taskInfoIdx = $("select[name=select]:eq(" + j + ")").val();

                //점수
                var score = curRow.find("td:eq(" + Number(j + 2) + ")").children().val();

                //maxScore
                var maxScore = $(".maxScore:eq(" + j + ")").val();

                //점수 체크
                //maxScore이상인지 체크
                if (Number(score) > Number(maxScore)) {
                    alert("Scores cannot exceed " +Number(maxScore));
                    curRow.find("td:eq(" + Number(j + 2) + ")").children().focus();
                    return false;
                } else if (score < 0) {
                    //0이하인지 체크
                    alert("Scores cannot be less than 0");
                    curRow.find("td:eq(" + Number(j + 2) + ")").children().focus();
                    return false;
                    //소수점 자리수가 2자리 이상인지 체크
                } else if (score.indexOf('.') != -1) {
                    var score_length = score.substring(score.indexOf('.') + 1).length;
                    if (score_length > 1) {
                        alert("You can enter only the first decimal place.");
                        curRow.find("td:eq(" + Number(j + 2) + ")").children().focus();
                        return false;
                    }
                }

                //과제id (있을경우)
                var taskItemIdx = curRow.find("td:eq(" + Number(j + 2) + ")").children().attr("data-id");

                console.log("idx : " + taskItemIdx + "현재 학생 Idx : " + studentIdx + " || 현재 과제 Idx : " + taskInfoIdx);
                var data = new Object();
                if (score != "") {
                    data.score = score;
                    console.log("현재 점수:" + score);
                }

                data.taskItemIdx = taskItemIdx;
                data.studentIdx = studentIdx;
                data.taskInfoIdx = taskInfoIdx;

                taskChart.push(data);
            }
        }

        //sectionItem : maxScore 저장
        var sectionItemList = new Array();
        $.each($(".maxScore"),function(index, item){
            var sectionItem = new Object();
            var maxScore = $(item).val();
            var sectionItemIdx = $(item).parent().find("div").children().data('id');
            sectionItem.sectionItemIdx = sectionItemIdx;
            sectionItem.maxScore = maxScore;
            sectionItemList.push(sectionItem);
        });

        //상태를 수행중으로 표시
        isRun = true;

        //저장 Ajax
        $.ajax({
            url: "/saveTaskScore", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "taskChart=" + JSON.stringify(taskChart) + "&curSectionIdx=" + curSectionIdx+"&sectionItemList="+JSON.stringify(sectionItemList),
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                alert("Saved successfully.");
                printTaskChart(curSectionIdx);
                printTotalGrade();
                // location.reload();
                $("#multiple-select").focus();
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

});

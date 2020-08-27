

////////////////////////////////////////////////////////////////////
//                                                                //
//                             클래스                             //
//                                                                //
////////////////////////////////////////////////////////////////////

$(function(){

// $("#StudentChartData tr").css("height","26px")

// var curClassIdx = <%=request.getAttribute("curClassIdx")%>;
    var curClassIdx = getParameterByName("idx");

    //주소창의 파라메터를 가져오는 함수
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    SectionAjax();
    TaskTemplate();

//섹션 목록 출력
    function SectionAjax(){
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

                $.each(result, function(index, item) {
                    var sectionName = item.sectionName;
                    var sectionIdx = item.sectionIdx;
                    var str = "<option value=\""+sectionIdx+"\">"+sectionName+"</option>";
                    $("#multiple-select").append(str);

                });
                // alert("StudentAjax 성공");
            } , //성공했을때
            error : function(request){
                alert(request.responseText);
            }// 실패했을때
        });
    }

//초기 과제 항목 테이블 출력 : 학생과 과제 정보만 볼수 있는.
    function TaskTemplate() {
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
                var str = "<tr id=\"taskListTr\"><th style=\"border-top: none;font-size: 0.38cm;padding-bottom: 21.5px;padding-right: 40px;\">Name</th></tr>";
                $("#taskList").append(str).trigger("create");

                $.each(result.DefaultTaskList,function(index,item){
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
                        if(item2.taskItemInfoIdx==item.taskItemInfoIdx){
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
                    $.each(result.DefaultTaskList,function(index2,item2){
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
    }

//섹션 추가
    $(document).on("click","#addSectionOk",function(){

        var sectionName = $("#sectionName").val();

        $.ajax({
            url : "/addSection", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            data : "sectionName="+sectionName+"&curClassIdx="+curClassIdx,
            dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result){

                SectionAjax()
            } , //성공했을때
            error : function(request){
                alert(request.responseText);
            }// 실패했을때
        });

    });

//섹션 삭제
    $(document).on("click","#delSection",function(){
        var curSectionIdx = $("#multiple-select option:checked").val();
        if(confirm("Are you sure you want to delete the current section?")==true){
            $.ajax({
                url : "/delSection", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                data : "curSectionIdx="+curSectionIdx,
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){
                    alert("The section has been deleted.");
                    SectionAjax();

                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
        }
    });

//과제 항목 선택
    //과제 항목의 이전 값을 저장하기 위한 변수
    var prev_val ;

    $(document).on("focus","select[name=select]",function() {
        prev_val = $(this).val();
        // alert(prev_val);
    }).on("change","select[name=select]",function() {
        //삭제하기를 선택
        if ($(this).val() == "del") {
            if (confirm("Are you sure you want to delete the task item?")) {
                var sectionItemIdx = $(this).attr('data-id');
                alert(sectionItemIdx);
                $.ajax({
                    url: "/class_delTask", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "sectionItemIdx="+sectionItemIdx,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function (result) {
                        alert("Delete completed");
                        location.reload();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }
                });// 실패했을때
            } else {
                $(this).val(prev_val);
            }
            //Please Select를 선택
        }else if ($(this).val == "select") {
            alert("This item cannot be selected.");
            $(this).val(prev_val);
            //과제 항목을 선택
        }else {
            var checked = 0;

            var length = $("select[name=select]").length;
            //이미 동일한 과제 항목이 있을 경우
            $("select[name=select]").each(function(index,item){
                for(var i = 0 ; i<=length-1;i++){
                    // alert(index + " | " + i);
                    // alert($(item).val() +" | "+ $("select[name=select]").eq(i).val());
                    if (index != i) {
                        if ($(item).val() == $("select[name=select]").eq(i).val()) {
                            alert("You cannot select the same task item.");
                            checked = 1;
                            return false;
                        }
                    }
                }
            });

            if (checked == 0) {
                if (confirm("Are you sure you want to modify the assignment item? : Results are immediately reflected.")) {
                    var sectionItemIdx = $(this).attr('data-id');
                    var targetTaskIdx = $(this).val();
                    // alert(targetTaskIdx);
                    $.ajax({
                        url: "/class_changeTask", //서버요청주소
                        type: "post",//요청방식 (get,post,patch,delete,put)
                        data: "sectionItemIdx=" + sectionItemIdx + "&targetTaskIdx=" + targetTaskIdx,
                        dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                        success: function (result) {
                            alert("Modification completed");
                            location.reload();
                        }, //성공했을때
                        error: function (request) {
                            alert(request.responseText);
                        }
                    });// 실패했을때
                } else {
                    $(this).val(prev_val);
                }
            } else {
                $(this).val(prev_val);
            }
        };



        // $(this).find("option:selected").attr("selected",false);
        // $(this).attr('selected',true);
    });

//테이블 크기를 측정하기 위한 전역변수
    var studentSize;
    var usedTaskSize;

//과제 항목 추가
    $(document).on("click","#addTaskBtn",function(){
        // 열 제목 추가
        var curSectionIdx = $("#multiple-select option:checked").val();

        $.ajax({
            url : "/addTask", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            data : "curSectionIdx="+curSectionIdx+"&curClassIdx="+curClassIdx,
            dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result) {
                console.log(result);

                var str2 = "";

                str2 = str2+ "<th><div class=\"col-12 col-md-9\">\n" +
                    "<select data-id=\""+result.sectionItem.sectionItemIdx+"\" name=\"select\" class=\"form-control\">\n" +
                    "</select>\n" +
                    "</div></td>\n";

                //Head - Tr 추가하기
                $("#taskList tr th").last().before(str2).trigger("create");
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
                }

            }, //성공했을때
            error : function(request){
                alert("Failed to Create.");
                console.log(request.responseText);
            }// 실패했을때
        });
    });


//섹션 클릭시 과제 항목 출력 & 입력
    $(document).on("click","#multiple-select option",function(){
        var curSectionIdx = $("#multiple-select option:checked").val();
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
        });
    });


//과제 점수 등록
    $("#saveTask").on('click',function(){

        var check = 0;
        //선택안된 과제항목 체크
        $("#taskList tr th div select").each(function(index,item){
            if($(item).val()=="select"){
                alert("Please select an Task item.");
                check = 1;
            }
        });
        if(check == 1){
            return false;
        }


        //데이터 전송을 위한 배열 만들기
        var taskChart = new Array();
        // 섹션id
        var curSectionIdx = $("#multiple-select option:checked").val();
        console.log("현재 섹션 Idx : " + curSectionIdx);

        //테이블 점수 가져오기
        for(var i=0;i<studentSize;i++){
            var curRow = $("#taskChart tr:eq("+i+")");
            for(var j=0;j<usedTaskSize;j++){

                //학생id
                var studentIdx = $(".studentIdx").eq(i).text();

                //과제항목id
                var taskInfoIdx = $("select[name=select]:eq(" + j + ")").val();

                //점수
                var score = curRow.find("td:eq("+Number(j+2)+")").children().val();


                //과제id (있을경우)
                var taskItemIdx = curRow.find("td:eq("+Number(j+2)+")").children().attr("data-id");

                console.log("idx : " + taskItemIdx + "현재 학생 Idx : " + studentIdx + " || 현재 과제 Idx : " + taskInfoIdx);
                var data = new Object();
                if(score!=""){
                    data.score = score;
                    console.log("현재 점수:" + score);
                }

                data.taskItemIdx = taskItemIdx;
                data.studentIdx = studentIdx;
                data.taskInfoIdx = taskInfoIdx;

                taskChart.push(data);
            }

        }

        //저장 Ajax
        $.ajax({
            url : "/saveTaskScore", //서버요청주소
            type : "post",//요청방식 (get,post,patch,delete,put)
            data : "taskChart="+JSON.stringify(taskChart)+"&curSectionIdx="+curSectionIdx,
            dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success : function(result){
                alert("Saved successfully.");
                location.reload();
            } , //성공했을때
            error : function(request){
                alert("Failed to save. Please check the input value.");
                console.log(request.responseText);
            }// 실패했을때
        });

        //수정 하기
    });




});


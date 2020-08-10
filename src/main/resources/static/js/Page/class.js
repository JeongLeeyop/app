
    ////////////////////////////////////////////////////////////////////
    //                                                                //
    //                           클래스                               //
    //                                                                //
    ////////////////////////////////////////////////////////////////////


    // $("#StudentChartData tr").css("height","26px")

    // var curClassIdx = <%=request.getAttribute("curClassIdx")%>;
    var curClassIdx = 45;
    SectionAjax();

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

    //섹션 추가
    $(document).on("click","#addSectionOk",function(){

        var sectionName = $("#sectionName").val();
        alert(curClassIdx);

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
        if(confirm("현재 섹션을 정말 삭제 하시겠습니까?")==true){
            $.ajax({
                url : "/delSection", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                data : "curSectionIdx="+curSectionIdx,
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){
                    alert("섹션이 삭제 되었습니다.");
                    SectionAjax();

                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
        }
    });

    //옵션 선택시 selected 옵션 수정
    $(document).on("change","select[name=select]",function(){
        // $(".option:selected").text();

        alert($(this).val());

        // $(this).find("option:selected").attr("selected",false);
        // $(this).attr('selected',true);
    });

    //테이블 크기를 측정하기 위한 전역변수
    var studentSize;
    var usedTaskSize;

    //섹션 클릭시 과제 항목 출력 & 입력
    $(document).on("click","#multiple-select option",function(){

        //초기 입력

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
                /*
                                    Long taskItemIdx();
                                    Long taskScore();
                                    Long taskItemInfoTaskItemInfoIdx();
                                    String studentStudentName();
                                    String taskItemInfoTaskItemName();
                                    Long studentStudentIdx();
                //
                                    taskItemInfoTaskItemName
                                    taskItemInfoTaskItemInfoIdx
                */

                //현 섹션에 사용중인 과제로 열 구성하기
                //모든 과제 목록 가져오기

                var str = "<tr id=\"taskListTr\"><th style=\"border-top: none;font-size: 0.38cm;padding-bottom: 21.5px;padding-right: 40px;\">이름</th></tr>";
                $("#taskList").append(str).trigger("create");


                $.each(result.usedList,function(index,item){
                    var str2 = "";
                    var str3 = "";

                    /*                      str2 = str2+ "<th style=\"border-top: none;\" >\n" +
                                              "      <div class=\"rs-select2--light rs-select2--sm\">\n" +
                                              "      <select class=\"js-select2\" name=\"time\"></select><div class=\"dropDownSelect2\"></div></div></th>";*/

                    str2 = str2+ "<th><div class=\"col-12 col-md-9\">\n" +
                        "<select name=\"select\" class=\"form-control\">\n" +
                        "\n" +
                        "</select>\n" +
                        "</div></td>\n";

                    $("#taskListTr").append(str2).trigger("create");
                    $('head').append('<link rel="stylesheet" href="css/class.css" type="text/css" />');

                    $.each(result.taskList,function(index2,item2) {
                        // alert(item2.taskItemInfoIdx+" :: "+item.taskItemInfoTaskItemInfoIdx);
                        if(item2.taskItemInfoIdx==item.taskItemInfoTaskItemInfoIdx){
                            // alert("selected 수행됨");
                            str3 = str3 + "<option class=\"option\" selected=\"selected\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>"

                        } else {
                            // alert("수행됨");
                            str3 = str3 + "<option class=\"option\" value=\"" + item2.taskItemInfoIdx + "\">" + item2.taskItemName + "</option>"
                        }
                    });
                    $("#taskListTr th:last div select").append(str3).trigger("create");


                });

                str = "<th style=\"border-top: none;border-bottom: none\"><button class=\"au-btn au-btn-icon au-btn--green au-btn--small\" style=\"height: 35px;width: 47px;\">\n" +
                    "                                                        <i class=\"zmdi zmdi-plus\"></i></button></th>"
                $("#taskListTr").append(str).trigger("create");

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
                    var curStudentTd = $(".studentIdx").filter(":contains(" + item.studentStudentIdx + ")");

                    for (var i = 0; i <= roundIndex; i++) {
                        // alert($("#taskList tr th:eq("+i+") div select option").attr('selected','selected').val());
                        curTaskIdx = $("select[name=select]:eq(" + i + ")").val();

                        if (item.taskItemInfoTaskItemInfoIdx == curTaskIdx) {
                            curStudentTd.parent().children("td:eq(" + Number(i + 2) + ")").children().val(item.taskScore);
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

                console.log("현재 학생 Idx : " + studentIdx + " || 현재 과제 Idx : " + taskInfoIdx + " || 현재 점수:" + score);
                var data = new Object();
                data.studentIdx = studentIdx;
                data.taskInfoIdx = taskInfoIdx;
                data.score = score;
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
                alert("성공적으로 저장되었습니다.");




            } , //성공했을때
            error : function(request){
                alert(request.responseText);
            }// 실패했을때
        });

        //수정 하기
    });
    function idxMatch(){


    }

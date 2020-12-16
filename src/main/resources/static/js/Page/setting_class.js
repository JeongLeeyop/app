////////////////////////////////////////////////////////////////////
//                                                                //
//                         Setting_Class                          //
//                                                                //
////////////////////////////////////////////////////////////////////

$(function () {

    //클래스 조회 & 과제 조회
    var classIdx = getParameterByName("idx");

    //주소창의 파라메터를 가져오는 함수
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    //버튼 UI
    $("#addTask").attr("hidden", false);
    $("#editTask").attr("hidden", false);
    $("#delTask").attr("hidden", false);
    $("#alert small").attr("hidden", true);

    //update로 표시
    $("#addClass").text("update");
    $("#addClass").attr('id', 'updateClass');

    $.ajax({
        url: "/findClass", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "classIdx=" + classIdx,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            console.log(result);
            var className = result.className;
            // var classSectionName = result.classSectionName;
            var classIdx = result.classIdx;

            $("#text-input1").val(className);
            // $("#select2-select-container").text(classSectionName);
            $("#classIdx").text(classIdx);

            TaskAjax();

        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });

    //과제 목록 input에 출력
    $(document).on("click", "#multiple-select option", function () {
        $("#text-input2").attr('placeholder', $(this).text());
        //과제 idx 숨기기
        $("#text-input2").parent().children('a').text(($(this).val()));
    });

    //섹션명 입력폼 select2 설정
    $("#select").select2({
        tags: true
    });

    //클래스 수정
    $(document).on("click", "#updateClass", function () {
        var className = $("#text-input1").val();
        var classIdx = $("#classIdx").text();

        if(className==""){
            alert("Please enter class name");
            return false;
        }

        $.ajax({
            url: "/updateClass", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "className=" + className +"&classIdx=" + classIdx,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                alert("The class has been modified.");
                location.href = "setting_class_list";
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    });

    //클래스 삭제
    $(document).on("click", "#delClass", function () {
        if (confirm("Are you sure you want to delete the current class?") == true) {
            if(confirm("Again : Are you sure you want to delete the current class? Data cannot be recovered.")){
            var classIdx = $("#classIdx").text();
            $.ajax({
                url: "/delClass", //서버요청주소
                type: "post",//요청방식 (get,post,patch,delete,put)
                data: "classIdx=" + classIdx,
                dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success: function (result) {
                    alert("The class has been deleted.");
                    location.href="setting_class_list"
                }, //성공했을때
                error: function (request) {
                    alert(request.responseText);
                }// 실패했을때
            });
        }
        }
    });

    //취소하기
    $(document).on("click", "#cancelClass", function () {
        if (confirm("Are you sure you want to go Back?")) {
            location.href = 'setting_class_list';
        }
    });

    //과제 등록
    $("#confirm").on('click', function () {
        addTask(1);
    });

    //과제 수정
    $("#confirm2").on('click', function () {
        addTask(2);
    });

    function addTask(Type){

        //신규등록과 기존정보 수정을 구분

        var classIdx;
        var taskName ;
        var gradeRatio;
        var taskIdx;
        var ckDefault=0;

        if(Type==1){
            classIdx = $("#classIdx").text();
            taskName = $("#taskName").val();
            gradeRatio = $("#gradeRatio").val();
        } else if(Type==2){
            classIdx = $("#classIdx").text();
            taskIdx = $("#modalTaskIdx").text();
            taskName = $("#taskName2").val();
            gradeRatio = $("#gradeRatio2").val();
        }

        //과제 등급 제어
        //공백 확인
        if (gradeRatio == "") {
            gradeRatio = 0;
        }

        //숫자만 가능
        var regexp = /^[0-9]*$/
        if (!regexp.test($("#gradeRatio").val())) {
            alert("Please enter only numbers.");
            $("#gradeRatio").val("");
            return false;
        }

        //합이 100이 넘지 못하도록
        var array = new Array();
        var GradeArray = new Array();
        var length = $("#multiple-select option").length;
        var Sum = 0;

        var selected = $("#multiple-select option:selected").index();
        for (var i = 2; i < length; i++) {
            if(Type==2 && i == selected){
                console.log(i + " | " + selected );
            } else {
                var str = $("#multiple-select option").eq(i).text();
                array = str.split('|| ');
                array = array[0].split('%');
                GradeArray.push(array[0]);
            }
        }
        ;
        $.each(GradeArray, function (index, item) {
            Sum = Number(Sum) + Number(item);
        });
        if (Number(Sum) + Number(gradeRatio) > 100) {
            alert("The sum of the rating proportions cannot exceed 100.");
            return false;
        }

        if(Type==1){
            $.ajax({
            url: "/updateTask", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "taskName=" + taskName + "&gradeRatio=" + gradeRatio + "&ckDefault=" + ckDefault + "&classIdx=" + classIdx,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                alert("The Task has been created.");
                TaskAjax();
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
        }

        if(Type==2){
        $.ajax({
            url: "/updateTask", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "taskName=" + taskName + "&gradeRatio=" + gradeRatio + "&ckDefault=" + ckDefault + "&classIdx=" + classIdx + "&taskIdx="+taskIdx ,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                alert("The Task has been updated.");
                TaskAjax();
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
        }

        // $('#text-input2').attr('placeholder',$(this).text());
    }

    //과제 삭제
    $("#delTask").on('click', function () {
        var taskIdx = $("#taskIdx").text();
        if (taskIdx == "") {
            alert("Please select a Task");
        } else {


            if (confirm("Are you sure you want to delete the selected task?")) {
                if (confirm("Again : Are you sure you want to delete the selected task? Data cannot be recovered.")) {
                    $.ajax({
                        url: "/delTask", //서버요청주소
                        type: "post",//요청방식 (get,post,patch,delete,put)
                        data: "taskIdx=" + taskIdx,
                        dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                        success: function (result) {
                            alert("The Task has been deleted.");
                            TaskAjax();
                        }, //성공했을때
                        error: function (request) {
                            alert(request.responseText);
                        }// 실패했을때
                    });
                }
            }
        }
    });

    //과제 수정 폼 열기
   $("#editTask").on('click', function () {
        var taskIdx = $("#taskIdx").text();
        if (taskIdx == "") {
            alert("Please select a Task");
        } else {
            var taskIdx = $("#taskIdx").text();
            $.ajax({
                url: "/findTask", //서버요청주소
                type: "post",//요청방식 (get,post,patch,delete,put)
                data: "taskIdx=" + taskIdx,
                dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success: function (result) {
                    $('#mediumModal2').modal("show"); //열기
                    $("#taskName2").val(result.taskItemName);
                    $("#gradeRatio2").val(result.taskGradeRatio);
                    $("#modalTaskIdx").text(result.taskIdx);
                }, //성공했을때
                error: function (request) {
                    alert(request.responseText);
                }// 실패했을때
            });


        }
    });


    //과제 리스트창 출력, 모달창 비우기 ajax
    function TaskAjax() {

        // var classIdx = $("#classIdx").text();

        //과제 리스트창 비우기
        $("#multiple-select").empty();
        $("#multiple-select").append("<option disabled>Ratio &nbsp; ||&nbsp;&nbsp;&nbsp; Task Name</option>");
        $("#multiple-select").append("<option disabled>-----------------------------------</option>");

        //과제input창 비우기
        $("#text-input2").attr('placeholder', '');

        //모달창 비우고 닫기
        $("#taskName").val("");
        $("#gradeRatio").val("");
        $("#modalTaskIdx").text("");
        $("#taskName2").val("");
        $("#gradeRatio2").val("");
        //과제항목 입력
        //Default 과제를 알기 위한 ajax

        //클래스의 과제항목을 검색하는 ajax
        $.ajax({
            url: "/findTaskListByClassId", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            data: "classIdx=" + classIdx,
            success: function (result) {

                $.each(result, function (index, item) {

                    var taskIdx = item.taskIdx;
                    var taskName = item.taskItemName;
                    var gradeRatio = item.taskGradeRatio;
                    var space = "";
                    if (gradeRatio <= 9) {
                        space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    } else if (gradeRatio >= 10 && gradeRatio < 100) {
                        space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    } else if (gradeRatio == 100) {
                        space = "&nbsp;&nbsp;&nbsp;&nbsp;";
                    }

                    var str;
                    str = "<option value=\"" + taskIdx + "\">" + gradeRatio + "% " + space + "|| &nbsp;&nbsp;&nbsp;" + taskName + "</option>";
                    $("#multiple-select").append(str);
                });
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    }

});

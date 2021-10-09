////////////////////////////////////////////////////////////////////
//                                                                //
//                        Season_Setting                          //
//                                                                //
////////////////////////////////////////////////////////////////////
$(function () {
    //시즌 전역변수 저장
    var curSeasonIdx = sessionStorage.getItem("curSeasonIdx");

    //코스,학생 목록 출력
    printClassList();
    printStudentList();
    
    //Mutiple-select2 색상적용
    multiple_Select();

    ////////////////////////////////////////////////////////////////////
    //                                                                //
    //                              Class                             //
    //                                                                //
    ////////////////////////////////////////////////////////////////////

    // Course Modal창
    //모달창이 열리면 자동으로 Input에 focus
    $("#mediumModal").on("shown.bs.modal", function () {
        $("#className").focus();
    });

    //모달창 Enter입력시 전송버튼 클릭
    $("#className").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#confirm").click();
        }
    });

    //addClass 버튼을 누르면 초기화
    $(document).on('click','#addClass',function(){
        $("#className").val("");
        $(".modal-classIdx").text("");
    });

    //class 모달 전송버튼 클릭시
    $(document).on('click',"#confirm",function(){
        var className = $("#className").val();

        if(className == ""){
            alert("Please Input Class Name.");
            $("#className").focus();
            return 0;
        }

        var classIdx = $(".modal-classIdx").text();

        $.ajax({
            url: "/updateClass", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "className=" + className+"&classIdx=" + classIdx+"&curSeasonIdx=" + curSeasonIdx,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function () {
                printClassList();
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });

        $("#className").val("");
    });
    ///////////////////////////////////////////////////////////////

    //클래스 Delete 선택시
    $(document).on('click',"#delClass",function(){

        //확인 메세지 출력
        if (confirm("Are you sure you want to delete the checked class? ( 1/2 )")) {
            if (confirm("Again : Are you sure you want to delete the checked class? Data cannot be recovered. ( 2/2 )")) {
                //배열에 class id 담기
                var classIdxList = [];
                $(".classList .au-checkbox input:checked").each(function (index, item) {
                    classIdxList[index] = $(item).parent().parent().next().find(".hoverName.classIdx").data('id');
                });
                $.ajax({
                    url: "/admin/delClass", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "classIdxList=" + classIdxList,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function () {
                        alert("The class has been deleted.");
                        printClassList();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }// 실패했을때
                });
            }
        }
    });

    //클래스 filter 선택시
    $(document).on('change',".class-order-by",function(){
        printClassList();
    });

    //클래스 Grade 선택시
    $(document).on("change", ".custom-rs-multiple-select2 select", function () {

        //Grade를 저장할 변수
        var Grade="";
        //ClassIdx를 저장할 변수
        var ClassIdx=$(this).parent().parent().parent().find(".hoverName.classIdx").data('id');


        //All이 선택되었있으면 해제시켜주고 진행
        if($(this).find(".selected_all").length!=0) {
            $(this).find(".selected_all").prop("selected", false);
            $(this).parent().find('.select2-selection__rendered li').each(function(){
                if($(this).text()=="All") $(this).remove();
            });
            $(this).find(".selected_all").removeClass("selected_all");
        }

        $(this).find('option:selected').each(function () {
            var text = $(this).text();

            if (text == "All"){
                $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#fb7d24');

                //'All'을 제외한 selected해제
                //'All'을 제외한 option disalbed
                $(this).parent().find('option:selected').each(function () {
                    if(text!=$(this).text()&&"Any"!=$(this).text()) {
                        $(this).prop("selected",false);
                    }
                });
                //'All'을 제외한 li제거
                $(this).parent().parent().find('.select2-selection__rendered li').each(function () {
                    if(text!=$(this).text()&&"Any"!=$(this).text()) {
                        $(this).remove();
                    }
                });
                $(this).addClass("selected_all");
            }
            /*else if (text == 1) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#5a6268');
            else if (text == 2) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#138496');
            else if (text == 3) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#e0a800');
            else if (text == 4) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#218838');
            else if (text == 5) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#0069d9');
            else if (text == 6) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#c82333');

            //Multiple Selected : Css 설정
        if ($(this).find('option:selected').length <= 2) {
            $(this).parent().parent().removeClass("level3");
            $(this).parent().parent().removeClass("level2");
            $(this).parent().parent().addClass("level1");

            $(this).parent().find(".select2-selection__choice").removeClass("level3");
            $(this).parent().find(".select2-selection__choice").removeClass("level2");

        } else if ($(this).find('option:selected').length == 3) {
            $(this).parent().parent().removeClass("level1");
            $(this).parent().parent().removeClass("level3");
            $(this).parent().parent().addClass("level2");

            $(this).parent().find(".select2-selection__choice").removeClass("level3");
            $(this).parent().find(".select2-selection__choice").addClass("level2");

        } else if ($(this).find('option:selected').length >= 4) {
            $(this).parent().parent().removeClass("level2");
            $(this).parent().parent().addClass("level3");

            $(this).parent().find(".select2-selection__choice").removeClass("level2");
            $(this).parent().find(".select2-selection__choice").addClass("level3");
        }
*/
        });

        //Multiple_Select 설정
        multiple_Select($(this));

        $(this).find('option:selected').each(function () {
            var text = $(this).text();

            if (text == "All") text = "0";

            Grade +=text+"|";
        });

        //Grade Update Ajax
        $.ajax({
            url: "/admin/updateClassGrade", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "ClassIdx=" + ClassIdx +"&Grade="+Grade,
            global: false,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });

    });

    //클래스 Name 선택시
    $(document).on("click", ".hoverName.classIdx", function () {
        //클래스 모달
        $("#mediumModal").modal();
        //아이디 삽입
        $(".modal-classIdx").text($(this).data("id"));
        //클래스명 삽입
        $("#className").val($(this).text());
    });


    ////////////////////////////////////////////////////////////////////
    //                                                                //
    //                            Student                             //
    //                                                                //
    ////////////////////////////////////////////////////////////////////

    //모달창 클래스 목록 입력
    $.ajax({
        url: "/findStudentGroupList", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "curSeasonIdx=" + curSeasonIdx,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {

            var str = "<label for=\"Class\" class=\" form-control-label\">Class Name</label><select id=\"Class\" class=\"form-control\" name=\"Class\">"
            $.each(result, function(index, item){
                str = str + "<option>"+item+"</option>";
            });
            str = str + "</select>";
            $("#modalClassForm").append(str).trigger("create");

        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });

    // student Modal창
    //모달창이 열리면 자동으로 Input에 focus
    $("#mediumModal2").on("shown.bs.modal", function () {
        $("#studentName").focus();
    });

    //모달창 Enter입력시 전송버튼 클릭
    $("#studentName").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#confirm2").click();
        }
    });

    //addStudent 버튼을 누르면 초기화
    $(document).on('click','#addStudent',function(){
        //이름
        $("#studentName").val("");
        //idx
        $(".modal-studentIdx").text("");
        //Grade
        $("#studentGrade option:selected").prop('selected',false);
        //Gender
        $(".genderCheck:first").prop('checked',true);
    });

    //student 모달 전송버튼 클릭시
    $(document).on('click',"#confirm2",function(){
        var studentName = $("#studentName").val();
        var studentGender = $(".genderCheck:checked").val();
        var studentGrade = $("#studentGrade option:selected").text();

        if(studentName == ""){
            alert("Please Input Student Name.");
            $("#studentName").focus();
            return 0;
        } else if(studentGender==null){
            alert("Please Check gender.");
            return 0;
        }

        var studentIdx = $(".modal-studentIdx").text();

        $.ajax({
            url: "/updateStudent", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "curSeasonIdx="+curSeasonIdx+"&studentName=" + studentName+"&studentIdx=" + studentIdx+"&studentGender=" + studentGender+"&studentGrade=" + studentGrade,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function () {
                printStudentList();
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });

        $("#studentName").val("");
    });

    //Class Modal창 (StudentGroup)
    //Class 모달 전송버튼 클릭시
    $(document).on('click',"#confirm3",function(){
        var studentGroup = $("#Class option:selected").text();
        var studentIdx = $(".modal-classIdx2").text();

        $.ajax({
            url: "/updateStudentGroup", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "studentGroup="+studentGroup+"&studentIdx=" + studentIdx,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function () {
                printStudentList();
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });

        $("#studentName").val("");
    });


    ////////////////////////////////////////////
    ////////////////////////////////////////////

    //Student Delete 선택시
    $(document).on('click',"#delStudent",function(){
        //확인 메세지 출력
        if (confirm("Are you sure you want to delete the checked student? ( 1/2 )")) {
            if (confirm("Again : Are you sure you want to delete the checked student? Data cannot be recovered. ( 2/2 )")) {
                //배열에 class id 담기
                var studentIdxList = [];
                $(".studentList .au-checkbox input:checked").each(function (index, item) {
                    studentIdxList[index] = $(item).parent().parent().next().find(".hoverName.studentIdx").data('id');
                    console.log(studentIdxList[index]);
                });

                $.ajax({
                    url: "/admin/delStudent", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "studentIdxList=" + studentIdxList,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function () {
                        alert("The student has been deleted.");
                        printStudentList();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }// 실패했을때
                });
            }
        }
    });

    //Student filter 선택시
    $(document).on('change',".student-order-by",function(){
        printStudentList();
    });

    //Student Gender 선택시
    $(document).on("change", ".custom-rs-select2 .studentGender", function () {
        var studentGender = $(this).find("option:selected").text();
        var StudentIdx = $(this).parent().parent().parent().find(".hoverName.studentIdx").data('id');
    //Gender Update Ajax
        $.ajax({
            url: "/admin/updateStudentGender", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "StudentIdx=" + StudentIdx +"&studentGender="+studentGender,
            global: false,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    });

    //Student Grade 선택시
    $(document).on("change", ".custom-rs-select2 .studentGrade", function () {
        Select2($(this));

        var studentGrade = $(this).find("option:selected").text();
        var StudentIdx = $(this).parent().parent().parent().find(".hoverName.studentIdx").data('id');

        //Grade Update Ajax
        $.ajax({
            url: "/admin/updateStudentGrade", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "StudentIdx=" + StudentIdx +"&studentGrade="+studentGrade,
            global: false,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    });

    //Student Name 선택시
    $(document).on("click", ".hoverName.studentIdx", function () {
        //클래스 모달
        $("#mediumModal2").modal();
        //id 삽입
        $(".modal-studentIdx").text($(this).data("id"));
        //클래스명 삽입
        $("#studentName").val($(this).text());

        //Grade 선택
        var Grade = $(this).parent().parent().parent().find(".studentGrade option:selected").text();
        $("#studentGrade option").each(function(){
            if($(this).text() == Grade) $(this).prop('selected',true);
        });

        //Gender 체크
        var Gender = $(this).parent().parent().parent().find(".studentGender option:selected").text();
        $(".genderCheck").each(function(){
            if($(this).val() == Gender) $(this).prop('checked',true);
        });
    });

    //Student Class 선택시
    $(document).on("click", ".hoverName.studentGroup", function () {
        //모달
        $("#mediumModal3").modal();
        //아이디 삽입
        $(".modal-classIdx2").text($(this).parent().parent().parent().find(".hoverName.studentIdx").data("id"));

        //Grade 선택
        var className = $(this).text();
        $("#Class option").each(function(){
            if($(this).text() == className) $(this).prop('selected',true);
        });

    });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    //전체 선택 & 해제
    $(document).on("click", ".allCheck", function () {
        if ($(this).prop('checked')) {
            $(this).parent().parent().parent().parent().parent().find('tbody tr td label input').each(function () {
                $(this).prop('checked', true);
            })
        } else {
            $(this).parent().parent().parent().parent().parent().find('tbody tr td label input').each(function () {
                $(this).prop('checked', false);
            })
        }
    });
    // 모두 체크가 될경우 전체선택 체크, 아닌경우 해제
    $(document).on("change", ".studentList input", function () {
        // $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        if($(".studentList input:checked").length==$(".studentList input").length){
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',true);
        } else {
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        }
    });
    $(document).on("change", ".classList input", function () {
        // $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        if($(".classList input:checked").length==$(".classList input").length){
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',true);
        } else {
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        }
    });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    //Mutiple-select2 색상 매치
    function multiple_Select(Select){
        $(".custom-rs-multiple-select2 select option:selected").each(function () {
            var text = $(this).text();
            if (text == "All") $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#fb7d24');
            else if (text == 1) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#5a6268');
            else if (text == 2) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#138496');
            else if (text == 3) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#e0a800');
            else if (text == 4) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#218838');
            else if (text == 5) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#0069d9');
            else if (text == 6) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#c82333');
        });
        $.each(Select,function (index,item) {

            //Multiple Selected : Css 설정
            if ($(item).find('option:selected').length <= 2) {
                $(item).parent().parent().removeClass("level3");
                $(item).parent().parent().removeClass("level2");
                $(item).parent().parent().addClass("level1");

                $(item).parent().find(".select2-selection__choice").removeClass("level3");
                $(item).parent().find(".select2-selection__choice").removeClass("level2");

            } else if ($(item).find('option:selected').length == 3) {
                $(item).parent().parent().removeClass("level1");
                $(item).parent().parent().removeClass("level3");
                $(item).parent().parent().addClass("level2");

                $(item).parent().find(".select2-selection__choice").removeClass("level3");
                $(item).parent().find(".select2-selection__choice").addClass("level2");

            } else if ($(item).find('option:selected').length >= 4) {
                $(item).parent().parent().removeClass("level2");
                $(item).parent().parent().addClass("level3");

                $(item).parent().find(".select2-selection__choice").removeClass("level2");
                $(item).parent().find(".select2-selection__choice").addClass("level3");
            }
        })
    }
    //select2 색상 매치
    function Select2(Select){
        $(Select).find("option:selected").each(function () {
            var number = $(this).text();
            if (number == 1) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#5a6268');
            else if (number == 2) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#138496');
            else if (number == 3) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#e0a800');
            else if (number == 4) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#218838');
            else if (number == 5) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#0069d9');
            else if (number == 6) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#c82333');
        });
    }

    //클래스 목록 조회
    function printClassList(){
        $(".classList").empty();
        var orderBy = $(".class-order-by option:selected").text();
        if(orderBy=="By Index") orderBy=0;
        else if(orderBy=="By Grade") orderBy=1;
        else if(orderBy=="By Name") orderBy=2;

        $.ajax({
            url: "/findClassList", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "curSeasonIdx=" + curSeasonIdx+"&orderBy="+orderBy,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {

                $.each(result, function (index, item){
                    var str = "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +
                        "                                    </td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 data-id=\""+item.classIdx+"\" class=\"hoverName classIdx\">"+item.className+"</h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td>\n" +
                        "                                    <td class=\"multiple-select2-td level1\">\n" +
                        "                                        <div class=\"rs-select2--trans rs-select2--sm custom-rs-multiple-select2\">\n" +
                        "                                            <select class=\"js-select2\" multiple=\"multiple\" name=\"property\">\n" +
                        "                                                <option value=\"\">1</option>\n" +
                        "                                                <option value=\"\">2</option>\n" +
                        "                                                <option value=\"\">3</option>\n" +
                        "                                                <option value=\"\">4</option>\n" +
                        "                                                <option value=\"\">5</option>\n" +
                        "                                                <option value=\"\">6</option>\n" +
                        "                                                <option value=\"\">All</option>\n" +
                        "                                            </select>\n" +
                        "                                            <div class=\"dropDownSelect2\"></div>\n" +
                        "                                        </div>\n" +
                        "                                    </td>\n" +
                        "\n" +
                        "                                </tr>";

                    $(".classList").append(str).trigger("create");

                    //Grade 작업
                    if (item.classGrade != null) {
                        var gradeArray = item.classGrade.split("|");

                        $(".classList tr:last").find(".custom-rs-multiple-select2 select option").each(function () {

                            for (var i in gradeArray) {
                                if ($(this).text() == gradeArray[i]) {
                                    $(this).prop('selected', true);
                                }
                                //All 처리
                                if ($(this).text()=="All"&&gradeArray[i]=="0"){
                                    $(this).prop('selected', true);
                                    $(this).addClass("selected_all");
                                }
                            }
                        });
                    }

                });

                //select2
                $(".custom-rs-multiple-select2 select").each(function () {
                    $(this).select2({
                        minimumResultsForSearch: 20,
                        dropdownParent: $(this).next('.dropDownSelect2')
                    });
                });

                //Mutiple-select2 색상 매치
                multiple_Select($(".custom-rs-multiple-select2 select"));

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });

        //전체 체크 해제
        $(".classList").parent().find(".allCheck").prop('checked',false);
    };
    //학생 목록 조회
    function printStudentList(){
        $(".studentList").empty();
        var orderBy = $(".student-order-by option:selected").text();
        if(orderBy=="By Index") orderBy=0;
        else if(orderBy=="By Grade") orderBy=1;
        else if(orderBy=="By Name") orderBy=2;

        $.ajax({
            url: "/findStudentList", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "curSeasonIdx=" + curSeasonIdx+"&orderBy="+orderBy,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                console.log(result);
                $.each(result, function (index, item){
                    var str = "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +
                        "                                    </td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 data-id=\""+item.studentIdx+"\" class=\"hoverName studentIdx\">"+item.studentName+"</h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td> " +
                        "                                    <td>\n" +
                        "                                        <div class=\"rs-select2--trans rs-select2--sm custom-rs-select2\">\n" +
                        "                                            <select class=\"js-select2 studentGender\" name=\"property\">\n" +
                        "                                                <option value=\"\">Male</option>\n" +
                        "                                                <option value=\"\">Female</option>\n" +
                        "                                            </select>\n" +
                        "                                            <div class=\"dropDownSelect2\"></div>\n" +
                        "                                        </div>\n" +
                        "                                    </td>" +
                        "                                    <td class=\"custom-td\">\n" +
                        "                                        <div class=\"rs-select2--trans rs-select2--sm custom-rs-select2\">\n" +
                        "                                            <select class=\"js-select2 studentGrade\" name=\"property\">\n" +
                        "                                                <option value=\"\" selected=\"selected\">1</option>\n" +
                        "                                                <option value=\"\">2</option>\n" +
                        "                                                <option value=\"\">3</option>\n" +
                        "                                                <option value=\"\">4</option>\n" +
                        "                                                <option value=\"\">5</option>\n" +
                        "                                                <option value=\"\">6</option>\n" +
                        "                                            </select>\n" +
                        "                                            <div class=\"dropDownSelect2\"></div>\n" +
                        "                                        </div>\n" +
                        "                                    </td>\n" +
                        "                                       <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 class=\"hoverName studentGroup\">"+item.studentGroup+"</h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td>" +
                        "                                </tr>";

                    $(".studentList").append(str).trigger("create");

                    //Gender 작업
                    $(".studentList tr:last").find(".custom-rs-select2 .studentGender option").each(function () {
                        if ($(this).text() == "Male"&& item.studentGender == 0) $(this).prop('selected', true);
                        else if ($(this).text() == "Female"&& item.studentGender == 1) $(this).prop('selected', true);
                    });

                    //Grade 작업
                    $(".studentList tr:last").find(".custom-rs-select2 .studentGrade option").each(function () {
                        if ($(this).text() == item.studentGrade) $(this).prop('selected', true);
                    });
                });

                //select2
                $(".custom-rs-select2 select").each(function () {
                    $(this).select2({
                        minimumResultsForSearch: 20,
                        dropdownParent: $(this).next('.dropDownSelect2')
                    });
                });

                //Mutiple-select2 색상 매치
                Select2($(".custom-rs-select2 .studentGrade"));

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
        $(".studentList").parent().find(".allCheck").prop('checked',false);
    }
});

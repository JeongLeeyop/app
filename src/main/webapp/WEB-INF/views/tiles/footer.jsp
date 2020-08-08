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

        //로그인 세션 확인
        var Account = "<%=session.getAttribute("Account")%>";

        //"null"이라는 스트링 문제
        if(Account == "null"){
            alert("로그인이 필요한 서비스 입니다.");
            location.href = "login";
        }

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



        ////////////////////////////////////////////////////////////////////
        //                                                                //
        //                         Setting_Class                          //
        //                                                                //
        ////////////////////////////////////////////////////////////////////

        //초기 클래스 목록 출력
        ClassAjax();

        //섹션명 입력폼 select2 설정
        $("#select").select2({
            tags: true
        });
        //과제 목록 input에 출력
        $(document).on("click","#multiple-select option",function(){
           $("#text-input2").attr('placeholder',$(this).text());
           //과제 idx 숨기기
           $("#text-input2").parent().children('a').text(($(this).val()));
        });

        //클래스 입력 폼 비우기
        function FormClear(){
            //항목 비우기
            $("#text-input1").val("");

            $("#select").empty();
            var str = "<option value=\"0\">Please select</option>\n" +
                "<option value=\"1\">Chapter</option>\n" +
                "<option value=\"2\">Week</option>\n" +
                "<option value=\"3\">Page</option>";
            $("#select").append(str);

            //과제 항목 비활성화 (수정 예정)
            $("#multiple-select").empty();
            $("#multiple-select").attr("disabled", true);

            //과제 항목 버튼 비활성화
            $("#addTask").attr("hidden",true);
            $("#editTask").attr("hidden",true);
            $("#delTask").attr("hidden",true);

            //알림
            $("#alert small").attr("hidden",false);

            //Save로 표시
            $("#updateClass").text("save");
            $("#updateClass").attr('id','addClass');

            $("#classIdx").text("addClass");
        }

        //클래스 출력 Ajax 메소드
        function ClassAjax(){

            $.ajax({
                url : "/findClassList", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){

                    //클래스 생성
                    $("#multiple-select2").empty();
                    $("#multiple-select2").append("<option selected style=\"text-align: center;\"value=\"addClass\"> --- 클래스 생성 ---</option>");
                    $("#multiple-select").attr("disabled", true);

                    $("#addTask").attr("hidden",true);
                    $("#editTask").attr("hidden",true);
                    $("#delTask").attr("hidden",true);

                    $.each(result, function(index, item) {

                        var className = item.className;
                        var classIdx = item.classIdx;

                        var str = "<option value=\""+classIdx+"\">"+className+"</option>";
                        $("#multiple-select2").append(str);

                    });
                    // alert("StudentAjax 성공");
                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
        }

        //과제 조회 Ajax 메소드
        function TaskAjax(){

            var classIdx = $("#classIdx").text();
            var ckDefault = new Array();

            //과제 리스트창 비우기
            $("#multiple-select").empty();

            //모달창 비우고 닫기
            $("#taskName").val("");
            $("#gradeRatio").val("");
            $("#ckDefault").prop("checked", false);
            // $('#mediumModal').css('display','none');
            // $('#mediumModal').attr('class','modal fade');
            // $('#mediumModal').attr('aria-hidden',true);
            // $('.modal-dialog modal-lg').modal("hide");

            //Default 과제를 알기 위한 ajax
            $.ajax({
                url : "/findDfTask", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                data: "classIdx="+classIdx,
                success : function(result){
                    $.each(result, function(index, item) {
                        ckDefault.push(item.taskItemInfo.taskItemInfoIdx);
                    });


                    //클래스의 과제항목을 검색하는 ajax
                    $.ajax({
                        url : "/findTask", //서버요청주소
                        type : "post",//요청방식 (get,post,patch,delete,put)
                        dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                        data: "classIdx="+classIdx,
                        success : function(result) {

                            $.each(result, function (index, item) {

                                var taskIdx = item.taskItemInfoIdx;
                                var taskName = item.taskItemName;
                                var gradeRatio = item.taskGradeRatio;
                                var str;

                                str = "<option value=\""+taskIdx+"\">" + gradeRatio + " | " + taskName + "</option>\n";

                                //value에 idx 넣기
                                $.each(ckDefault, function (index2, item2) {
                                    if (taskIdx == item2) {
                                        str = "<option value=\""+taskIdx+"\">" + gradeRatio + " | " + taskName + " | Default " + "</option>";
                                        return false;
                                    }
                                });

                                $("#multiple-select").append(str);

                            });

                        } , //성공했을때
                        error : function(request){
                            alert(request.responseText);
                        }// 실패했을때
                    });


                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
        }

        //클래스 조회 & 과제 조회
        $(document).on("click","#multiple-select2 option",function(){
            var select = $("#multiple-select2 option:selected").val();

            //새 클래스 생성 선택시
            if(select == "addClass"){
                FormClear();
            }
            //기존 클래스 선택시
            else {
                $("#multiple-select").attr("disabled", false);

                $("#addTask").attr("hidden",false);
                $("#editTask").attr("hidden",false);
                $("#delTask").attr("hidden",false);
                $("#alert small").attr("hidden",true);

                //update로 표시
                $("#addClass").text("update");
                $("#addClass").attr('id','updateClass');

                var classIdx = $(this).val();

                $.ajax({
                    url : "/findClass", //서버요청주소
                    type : "post",//요청방식 (get,post,patch,delete,put)
                    data : "classIdx="+classIdx,
                    dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success : function(result){
                        var className = result.className;
                        var classSectionName = result.classSectionName;
                        var classIdx = result.classIdx;

                        $("#text-input1").val(className);

                        $("#select2-select-container").text(classSectionName);

                        $("#classIdx").text(classIdx);

                        TaskAjax();

                    } , //성공했을때
                    error : function(request){
                        alert(request.responseText);
                    }// 실패했을때
                });

            }
        });

        //클래스 생성
        $(document).on("click","#addClass",function(){
            var className =  $("#text-input1").val();
            var sectionName = $(".select2-selection__rendered").text();

            if(sectionName=="Please select"){
                alert("섹션명을 입력하세요.");
                return true;
            }

            $.ajax({
                url : "/updateClass", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                data : "className="+className+"&sectionName="+sectionName,
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){
                    alert("클래스가 생성 되었습니다.");
                    ClassAjax();
                    FormClear();
                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
        });

        //클래스 수정
        $(document).on("click","#updateClass",function(){
            var className =  $("#text-input1").val();
            var sectionName = $("#select2-select-container").text();
            var classIdx = $("#classIdx").text();

            if(sectionName=="Please select"){
                alert("섹션명을 입력하세요.");
                return true;
            }

            $.ajax({
                url : "/updateClass", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                data : "className="+className+"&sectionName="+sectionName+"&classIdx="+classIdx,
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){
                    alert("클래스가 수정 되었습니다.");
                    ClassAjax();
                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
        });

        //클래스 삭제
        $(document).on("click","#delClass",function(){
            if(confirm("현재 클래스를 정말 삭제 하시겠습니까?")==true){
            var classIdx = $("#classIdx").text();
            $.ajax({
                url : "/delClass", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                data : "classIdx="+classIdx,
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){
                    alert("클래스가 삭제 되었습니다.");
                    ClassAjax();
                    FormClear();

                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
            }
        });

        //과제 등록
        $("#confirm").on('click',function(){

            //새 클래스인 경우 (예정)
          /*  if($("#classIdx").text() == "addClass"){
                var classIdx = $("#classIdx").text();
                var taskName = $("#taskName").val();
                var gradeRatio = $("#gradeRatio").val();
                var ckDefault;
                if($("#ckDefault").is(":checked") == true){
                    ckDefault = "Default";
                } else {
                    ckDefault = "";
                }

                var str = "<option value=\"0\">"+taskName+" | "+ gradeRatio+" | "+ckDefault +"</option>";
                $("#multiple-select").append(str);

                $("#taskName").val("");
                $("#gradeRatio").val("");
                $("#ckDefault").prop("checked", false);
            }*/

            //기존 클래스인 경우
            var classIdx = $("#classIdx").text();
            var taskName = $("#taskName").val();
            var gradeRatio = $("#gradeRatio").val();
            var ckDefault;

            //과제 등급 제어
            //공백 확인
            if(gradeRatio=="") {
                gradeRatio = 0;
            }

            //숫자만 가능
            var regexp = /^[0-9]*$/
            if( !regexp.test($("#gradeRatio").val()) ) {
                alert("숫자만 입력하세요");
                $("#gradeRatio").val("");
                return false;
            }

            //합이 100이 넘지 못하도록
            var array = new Array();
            var GradeArray = new Array();
            var length = $("#multiple-select option").length;
            var Sum = 0;

            for(var i=0; i<length; i++) {
                var str = $("#multiple-select option").eq(i).text();
                array = str.split(' | ');
                GradeArray.push(array[0]);
            };
            $.each(GradeArray, function(index, item){
                Sum = Number(Sum) + Number(item);
            });
            if(Number(Sum)+Number(gradeRatio)>100){
                alert("등급 비율의 합은 100을 넘을 수 없습니다.");
                return false;
            }


            if($("#ckDefault").is(":checked") == true){
                ckDefault = 1;
            } else {
                ckDefault = 0;
            }

            $.ajax({
                url : "/createTask", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                data : "taskName="+taskName+"&gradeRatio="+gradeRatio+"&ckDefault="+ckDefault+"&classIdx="+classIdx,
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){
                    alert("과제가 생성 되었습니다.");
                    TaskAjax();

                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });

           // $('#text-input2').attr('placeholder',$(this).text());
        });

        //과제 삭제
        $("#delTask").on('click',function(){

            if(confirm("선택된 과제를 정말로 삭제하시겠습니까?")){
                 var taskIdx = $("#taskIdx").text();
                $.ajax({
                    url : "/delTask", //서버요청주소
                    type : "post",//요청방식 (get,post,patch,delete,put)
                    data : "taskIdx="+taskIdx,
                    dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success : function(result){
                        alert("과제가 삭제 되었습니다.");
                        TaskAjax();
                    } , //성공했을때
                    error : function(request){
                        alert(request.responseText);
                    }// 실패했을때
                });

            }
        });

        //과제 수정 (예정)


        ////////////////////////////////////////////////////////////////////
        //                                                                //
        //                       Setting_Student                          //
        //                                                                //
        ////////////////////////////////////////////////////////////////////

        StudentAjax();

        //add_student
        $("#student-add").click(function(){

            var studentName = $("#text-input").val();
            var studentGender = $(".form-check-input:checked").val();

            alert(studentName);
            alert(studentGender);

                $.ajax({
                    url : "/addStudent", //서버요청주소
                    type : "get",//요청방식 (get,post,patch,delete,put)
                    dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    data : "studentName="+studentName+"&studentGender="+studentGender,//서버에게 보내는 parameter정보
                    success : function(result){
                        alert(result);
                        StudentAjax();
                    } , //성공했을때
                    error : function(request){
                        alert(request.responseText);
                    }// 실패했을때
                });



        })

        //delete_student
        $(document).on("click", "#delete", function(){
            var check = confirm("정말로 삭제하시겠습니까?");
            if (check==true){
                var studentIdx = $(this).children("#delDev").text();
                alert(studentIdx);
                $.ajax({
                    url : "/delStudent", //서버요청주소
                    type : "get",//요청방식 (get,post,patch,delete,put)
                    dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    data : "studentIdx="+studentIdx,//서버에게 보내는 parameter정보
                    success : function(result){
                        alert("삭제성공");
                        StudentAjax();
                    } , //성공했을때
                    error : function(request){
                        alert(request.responseText);
                    }// 실패했을때
                });
            }

        })

        //Student_AJAX
        function StudentAjax(){

            $.ajax({
                url : "/findStudent", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){
                    $(".tbody").empty();
                    $.each(result, function(index, item) {

                        var Name = item.studentName;
                        var GenderNum = item.studentGender;
                        var Gender;
                        var StudentIdx = item.studentIdx;

                        if (GenderNum==0) {
                            Gender = "Male";
                        } else {
                            Gender = "Female";
                        }

                        var str = "<tr class=\"tr-shadow\">\n" +
                            "                                    <td>\n" +
                            "                                        <label class=\"au-checkbox\">\n" +
                            "                                            <input type=\"checkbox\">\n" +
                            "                                            <span class=\"au-checkmark\"></span>\n" +
                            "                                        </label>\n" +
                            "                                    </td>\n" +
                            "                                    <td>" + Name + "</td>\n" +
                            "                                    <td>\n" +
                            "                                        <span class=\"block-email\">lori@example.com</span>\n" +
                            "                                    </td>\n" +
                            "                                    <td class=\"desc\">"+Gender+"</td>\n" +
                            "                                    <td>\n" +
                            "                                        <div class=\"table-data-feature\">\n" +
                            "                                            <button class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\">\n" +
                            "                                                <i class=\"zmdi zmdi-edit\"></i>\n"+
                            "                                            </button>\n" +
                            "                                            <button id=\"delete\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\">\n" +
                            "                                                <i class=\"zmdi zmdi-delete\"></i>\n " +
                            "                                                 <div id=delDev style='display:none'>"+StudentIdx+ "</div>" +
                            "                                            </button>\n" +
                            "                                            <button class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"More\">\n" +
                            "                                                <i class=\"zmdi zmdi-more\"></i>\n" +
                            "                                            </button>\n" +
                            "                                        </div>\n" +
                            "                                    </td>\n" +
                            "                                </tr>\n" +
                            "                                <tr class=\"spacer\"></tr>"

                        $('.tbody').append(str);

                    });
                    // alert("StudentAjax 성공");
                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
        }

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

        // setup a few events
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            events: events.concat(trivia_nights)
        });
    });



</script>


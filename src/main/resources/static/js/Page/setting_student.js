////////////////////////////////////////////////////////////////////
//                                                                //
//                       Setting_Student                          //
//                                                                //
////////////////////////////////////////////////////////////////////

//css추가
$('head').append('<link rel="stylesheet" href="css/settingStudent.css" type="text/css" />');

StudentAjax();

//add_student
$("#student-add").click(function () {
    updateStudent(1);
});

    function updateStudent(Type){
        var studentName;
        var studentGrade;
        var studentGender;
        var studentIdx;

        if(Type==1){
            studentName = $("#text-input").val();
            studentGrade = $("select[name=grade] option:selected").text();
            studentGender = $("#mediumModal .form-check-input:checked").val();
        } else if(Type==2){
             studentIdx = $("#modelStudentIdx").text();
             studentName = $("#text-input2").val();
             studentGrade = $("select[name=grade2] option:selected").text();
             studentGender = $("#mediumModal2 .form-check-input:checked").val();

        }

        if (studentName == "") {
            alert("Please enter a student name.");
            return false;
        }
        if (studentGender==undefined) {
            alert("Please enter your gender.");
            return false;
        }

        if(Type==1){
        $.ajax({
            url: "/addStudent", //서버요청주소
            type: "get",//요청방식 (get,post,patch,delete,put)
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            data: "studentName=" + studentName + "&studentGender=" + studentGender + "&studentGrade=" + studentGrade,//서버에게 보내는 parameter정보
            success: function (result) {
                // alert("You have registered a new student.");
                StudentAjax();

                //모달1 폼 비우기
                $("#text-input").val("");
                $("select[name=grade] option:selected").prop("selected",false);
                $("#mediumModal .form-check-input:checked").prop('checked',false);
                $("#mediumModal").modal("hide");

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
        } else if(Type==2){
            $.ajax({
                url: "/addStudent", //서버요청주소
                type: "get",//요청방식 (get,post,patch,delete,put)
                dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                data: "studentIdx=" + studentIdx + "&studentName=" + studentName + "&studentGender=" + studentGender + "&studentGrade=" + studentGrade,//서버에게 보내는 parameter정보
                success: function (result) {
                    // alert("Updated successfully.");
                    StudentAjax();
                    $("#mediumModal2").modal("hide");
                }, //성공했을때
                error: function (request) {
                    alert(request.responseText);
                }// 실패했을때
            });
        }
    }

//delete_student
$(document).on("click", "button[name=delete]", function () {
    var check = confirm("Are you sure you want to delete it?");
    if (check == true) {
        var studentIdx = $(this).parent().children(".studentIdx").text();
        $.ajax({
            url: "/delStudent", //서버요청주소
            type: "get",//요청방식 (get,post,patch,delete,put)
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            data: "studentIdx=" + studentIdx,//서버에게 보내는 parameter정보
            success: function (result) {
                alert("Delete Complete");
                StudentAjax();
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    }
});

//more Student
$(document).on("click", "button[name=more]", function () {
    alert("Developing");
});

//수정 폼 열기
$(document).on("click", "button[name=edit]", function () {
    var studentIdx = $(this).parent().children(".studentIdx").text();

    $.ajax({
        url: "/findStudentInfo", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        data: "studentIdx=" + studentIdx,
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            console.log(result);
            $('#mediumModal2').modal("show"); //열기

            //학생의 idx를 hidden으로 입력
            $("#modelStudentIdx").text(result.studentIdx);

            //학생의 이름을 입력
            $("#text-input2").val(result.studentName);

            //학생의 학년을 입력
            var option = $("select[name=grade2] option");

            //기존의 선택을 해제
            $("select[name=grade2] option:selected").attr("selected",false);

            $.each(option,function(index,item){
                if($(item).text()==result.studentGrade){
                    $(this).attr("selected",true);
                }
            })

            //학생 성별을 입력
            var gender = $("#mediumModal2 .form-check-input");
            var itemGender;
            if(result.studentGender==0){
                itemGender = "Male";
            } else if(result.studentGender==1){
                itemGender = "Female";
            }

            //기존의 체크를 해제
            $("#mediumModal2 .form-check-input").removeAttr('checked');

            $.each(gender,function(index,item){
                if($(item).val()==itemGender){
                    $(this).prop("checked",true);
                }
            })
             // $("#mediumModal2.form-check-input:checked").val();

        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
});

//edit Student
$(document).on("click", "#student-add2", function () {
    updateStudent(2);
});

//Student_AJAX
function StudentAjax() {

    $.ajax({
        url: "/findStudent", //서버요청주소
        type: "post",//요청방식 (get,post,patch,delete,put)
        dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success: function (result) {
            $(".tbody").empty();
            $.each(result, function (index, item) {

                var Name = item.studentName;
                var GenderNum = item.studentGender;
                var Gender;
                var Grade = item.studentGrade;
                var StudentIdx = item.studentIdx;

                if (GenderNum == 0) {
                    Gender = "Male";
                } else {
                    Gender = "Female";
                }

                var str = "<tr class=\"tr-shadow\">\n" +

                    "                                    <td>" + Name + "</td>\n" +
                    "                                    <td>\n" +
                    "                                        <span class=\"block-email\">" + Grade + "</span>\n" +
                    "                                    </td>\n" +
                    "                                    <td class=\"desc\">" + Gender + "</td>\n" +
                    "                                    <td>\n" +
                    "                                        <div class=\"table-data-feature\">\n" +
                    "                                           <a class = \"studentIdx\" hidden>" + StudentIdx + "</a>" +
                    "                                            <button name=\"edit\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\">\n" +
                    "                                                <i class=\"zmdi zmdi-edit\"></i>\n" +
                    "                                            </button>\n" +
                    "                                            <button name=\"delete\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\">\n" +
                    "                                                <i class=\"zmdi zmdi-delete\"></i>\n " +
                    "                                            </button>\n" +
                    "                                            <button name = \"more\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"More\">\n" +
                    "                                                <i class=\"zmdi zmdi-more\"></i>\n" +
                    "                                            </button>\n" +
                    "                                        </div>\n" +
                    "                                    </td>\n" +
                    "                                </tr>\n" +
                    "                                <tr class=\"spacer\"></tr>"

                $('.tbody').append(str);

            });
            // alert("StudentAjax 성공");
        }, //성공했을때
        error: function (request) {
            alert(request.responseText);
        }// 실패했을때
    });
}
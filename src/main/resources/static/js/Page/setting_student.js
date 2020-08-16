
    ////////////////////////////////////////////////////////////////////
    //                                                                //
    //                       Setting_Student                          //
    //                                                                //
    ////////////////////////////////////////////////////////////////////

    //css추가
    $('head').append('<link rel="stylesheet" href="css/settingStudent.css" type="text/css" />');

    StudentAjax();

    //add_student
    $("#student-add").click(function(){

        var studentName = $("#text-input").val();
        var studentGrade = $("select[name=time] option:selected").text();
        var studentGender = $(".form-check-input:checked").val();

        if( $("#text-input").val()==""){
            alert("Please enter a student name.");
            return false;
        }
        if( $("input:radio[name=inline-radios]").is(":checked") == false){
            alert("Please enter your gender.");
            return false;
        }

        $.ajax({
            url : "/addStudent", //서버요청주소
            type : "get",//요청방식 (get,post,patch,delete,put)
            dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            data : "studentName="+studentName+"&studentGender="+studentGender+"&studentGrade="+studentGrade,//서버에게 보내는 parameter정보
            success : function(result){
                alert("You have registered a new student.");
                StudentAjax();
                location.reload();
            } , //성공했을때
            error : function(request){
                alert(request.responseText);
            }// 실패했을때
        });



    })

    //delete_student
    $(document).on("click", "#delete", function(){
        var check = confirm("Are you sure you want to delete it?");
        if (check==true){
            var studentIdx = $(this).children("#delDev").text();
            $.ajax({
                url : "/delStudent", //서버요청주소
                type : "get",//요청방식 (get,post,patch,delete,put)
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                data : "studentIdx="+studentIdx,//서버에게 보내는 parameter정보
                success : function(result){
                    alert("Delete Complete");
                    StudentAjax();
                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });
        }

    })

    //more Student
    $(document).on("click", "#more", function() {
        alert("In ready...");
    });

    //edit Student
    $(document).on("click", "#edit", function() {
        alert("In ready...");
    });

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
                    var Grade = item.studentGrade;
                    var StudentIdx = item.studentIdx;

                    if (GenderNum==0) {
                        Gender = "Male";
                    } else {
                        Gender = "Female";
                    }

                    var str = "<tr class=\"tr-shadow\">\n" +
                        "                                    <td>\n" +
                       /* "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +*/
                        "                                    </td>\n" +
                        "                                    <td>" + Name + "</td>\n" +
                        "                                    <td>\n" +
                        "                                        <span class=\"block-email\">"+Grade+"</span>\n" +
                        "                                    </td>\n" +
                        "                                    <td class=\"desc\">"+Gender+"</td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"table-data-feature\">\n" +
                        "                                            <button id=\"edit\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\">\n" +
                        "                                                <i class=\"zmdi zmdi-edit\"></i>\n"+
                        "                                            </button>\n" +
                        "                                            <button id=\"delete\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\">\n" +
                        "                                                <i class=\"zmdi zmdi-delete\"></i>\n " +
                        "                                                 <div id=delDev style='display:none'>"+StudentIdx+ "</div>" +
                        "                                            </button>\n" +
                        "                                            <button id = \"more\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"More\">\n" +
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
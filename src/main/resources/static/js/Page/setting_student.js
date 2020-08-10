
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
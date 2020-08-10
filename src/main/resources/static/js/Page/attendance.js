
    ////////////////////////////////////////////////////////////////////
    //                                                                //
    //                             출석                               //
    //                                                                //
    ////////////////////////////////////////////////////////////////////


    //출석 학생 목록 출력
    $.ajax({
        url : "/findStudent", //서버요청주소
        type : "post",//요청방식 (get,post,patch,delete,put)
        dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
        success : function(result){
            $.each(result, function(index, item) {

                var studentName = item.studentName;
                var studentIdx = item.studentIdx;
                /*var str = "<tr id=\"studentDetail\"><td hidden>"+item.studentIdx+"</td><td>"+item.studentName+"</td><td>" +
                    "<select name=\"selectSm\" id=\"SelectLm\" class=\"form-control-sm form-control\">\n" +
                    "<option value=\"0\">Please select</option>\n" +
                    "<option value=\"1\">Option #1</option>\n" +
                    "<option value=\"2\">Option #2</option>\n" +
                    "<option value=\"3\">Option #3</option>\n" +
                    "<option value=\"4\">Option #4</option>\n" +
                    "<option value=\"5\">Option #5</option>\n" +
                    "</select></td></tr>";*/
                // <div class='hiddenStIdx' hidden>"+item.studentIdx+"</div>
                var str = "<tr class=\"studentDetail\"><td style=\"vertical-align: middle;\">"+item.studentName+"<div hidden>"+item.studentIdx+"</div></td><td>" +
                    "<div class=\"noselect\" style=\"width: 130px;\">\n" +
                    "                    <select style=\"position: relative;left: 32px;\"class=\"js-select2\" name=\"time\">\n" +
                    "                    <option data-id=\"0\" value=\"\">Present</option>\n" +
                    "                    <option data-id=\"1\" value=\"\">Ex. Tardy</option>\n" +
                    "                    <option data-id=\"2\" value=\"\">Tardy </option>\n" +
                    "                    <option data-id=\"3\" value=\"\">Family Leave</option>\n" +
                    "                    <option data-id=\"4\" value=\"\">Ex. Absent</option>\n" +
                    "                    <option data-id=\"5\" value=\"\">Absent</option>\n" +
                    "                    <option data-id=\"6\" value=\"\">Early Leave</option>\n" +
                    "                </select>\n" +
                    "                <div class=\"dropDownSelect2\"></div>\n" +
                    "                    </div></td></tr>";

                $("#studentList").append(str);
            });
            $(".table-top-countries tbody tr td:odd").css("color","#666");

        } , //성공했을때
        error : function(request){
            alert(request.responseText);
        }// 실패했을때
    });

////////////////////////////////////////////////////////////////////
//                                                                //
//                           학생목록                             //
//                                                                //
////////////////////////////////////////////////////////////////////
//css 적용
var curSeasonIdx =  sessionStorage.getItem("curSeasonIdx");

$('head').append('<link rel="stylesheet" href="css/student.css" type="text/css" />');
//학생 차트에 타이틀 출력
$.ajax({
    url: "/findAuthClassList", //서버요청주소
    data: "curSeasonIdx=" + curSeasonIdx,
    type: "post",//요청방식 (get,post,patch,delete,put)
    dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
    success: function (title) {
        $.each(title, function (index, item) {
            $("#StudentChart tr").append("<th><div class=\"class\" data-id=\"" + item.authclass + "\"/></div>" + item.classname + "</th>");
        });


        //학생 차트에 데이터 출력
        $.ajax({
            url: "/findStudentSummary", //서버요청주소
            data: "curSeasonIdx=" + curSeasonIdx,
            type: "post",//요청방식 (get,post,patch,delete,put)
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                console.log(result);
                $.each(result.Attendance, function (index, item) {
                    var str = "<tr class=\"studentDetail\"></td><td class=\"student\" data-id=\"" + item.studentIdx + "\">" + item.studentName + "</td><td>" + item.studentAttendance + "</td>";
                    var str2 = "";

                    $.each(title, function (index2, item2) {
                        // console.log(item2);

                        str2 = str2 + "<td></td>";
                    });
                    str = str + str2 + "</tr>";

                    $("#StudentChartData").append(str);
                });
                $.each(result.FinalGrade, function (index2, item2) {
                        $.each( $(".class"), function (index3, item3) {
                            $.each( $(".student"), function (index4, item4) {
                                if(item2.studentIdx == $(item4).data("id")){
                                    if(item2.classIdx == $(item3).data("id") ){
                                        if(item2.finalGrade!=null) $(item4).parent().find("td").eq(index3+2).append(Math.floor(item2.finalGrade * 100) / 100);

                                    }
                                }
                            });
                        });

                });

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }
        });// 실패했을때


    }, //성공했을때
    error: function (request) {
        alert(request.responseText);
    }
});// 실패했을때


//학생 클릭시 상세 페이지로 이동
$(document).on("click", ".studentDetail", function () {
    // alert("Developing.");
    // alert("학생의 idx는 "+$(this).children().eq(0).text()+"입니다.");
    // location.href="student_detail";
});


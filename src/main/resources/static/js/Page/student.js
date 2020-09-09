

////////////////////////////////////////////////////////////////////
//                                                                //
//                           학생목록                             //
//                                                                //
////////////////////////////////////////////////////////////////////

//학생 차트에 타이틀 출력
$.ajax({
    url : "/findClassList", //서버요청주소
    type : "post",//요청방식 (get,post,patch,delete,put)
    dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
    success : function(result) {

        $.each(result, function(index,item){
            $("#StudentChart tr").append("<th><div data-id=\""+item.classIdx+"\"/></div>"+item.className+"</th>");
        });

    }, //성공했을때
    error : function(request) {
        alert(request.responseText);
    }
});// 실패했을때

//학생 차트에 데이터 출력
$.ajax({
    url : "/findStudentSummary", //서버요청주소
    type : "post",//요청방식 (get,post,patch,delete,put)
    dataType : "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
    success : function(result) {
        console.log(result);
        $.each(result,function(index,item){
            var str = "<tr class=\"studentDetail\"></td><td data-id=\""+item.studentIdx+"\">"+item.studentName+"</td><td>"+item.studentAttendance+"</td>";
            var str2 ="";

            $.each(item.studentGrade,function(index2,grade){
                str2 = str2+"<td>"+grade+"</td>";
            });
            str = str+str2+"</tr>";

            $("#StudentChartData").append(str);
        });
    }, //성공했을때
    error : function(request) {
        alert(request.responseText);
    }
});// 실패했을때





//학생 클릭시 상세 페이지로 이동
$(document).on("click",".studentDetail",function(){
    alert("Developing.");
    // alert("학생의 idx는 "+$(this).children().eq(0).text()+"입니다.");
    // location.href="student_detail";
});


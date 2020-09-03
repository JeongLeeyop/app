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
            var className = result.className;
            var classSectionName = result.classSectionName;
            var classIdx = result.classIdx;

            $("#text-input1").val(className);
            $("#select2-select-container").text(classSectionName);
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
        var sectionName = $("#select2-select-container").text();
        var classIdx = $("#classIdx").text();

        if (sectionName == "Please select") {
            alert("Please enter section name.");
            sectionName = "";
            // return true;
        }

        $.ajax({
            url: "/updateClass", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "className=" + className + "&sectionName=" + sectionName + "&classIdx=" + classIdx,
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
        if (confirm("Are you sure you want to cancel?")) {
            location.href = 'setting_class_list';
        }
    });

    //과제 등록
    $("#confirm").on('click', function () {

        //기존 클래스인 경우
        var classIdx = $("#classIdx").text();
        var taskName = $("#taskName").val();
        var gradeRatio = $("#gradeRatio").val();
        var ckDefault;

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

        for (var i = 2; i < length; i++) {
            var str = $("#multiple-select option").eq(i).text();
            array = str.split('|| ');
            array = array[0].split('%');
            GradeArray.push(array[0]);
        }
        ;
        $.each(GradeArray, function (index, item) {
            Sum = Number(Sum) + Number(item);
        });
        if (Number(Sum) + Number(gradeRatio) > 100) {
            alert("The sum of the rating proportions cannot exceed 100.");
            return false;
        }

        ckDefault = 0;


        $.ajax({
            url: "/createTask", //서버요청주소
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

        // $('#text-input2').attr('placeholder',$(this).text());
    });

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

    //과제 수정 (예정)

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

        //과제항목 입력
        //Default 과제를 알기 위한 ajax

        //클래스의 과제항목을 검색하는 ajax
        $.ajax({
            url: "/findTask", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            data: "classIdx=" + classIdx,
            success: function (result) {

                $.each(result, function (index, item) {

                    var taskIdx = item.taskItemInfoIdx;
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


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

/*  //클래스 입력 폼 비우기
  function FormClear() {
      //항목 비우기
      $("#text-input1").val("");
      $("#text-input2").val("");

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
      $("#addTask").attr("hidden", true);
      $("#editTask").attr("hidden", true);
      $("#delTask").attr("hidden", true);

      //알림
      $("#alert small").attr("hidden", false);

      //Save로 표시
      $("#updateClass").text("save");
      $("#updateClass").attr('id', 'addClass');

      $("#classIdx").text("addClass");
  }

  //클래스 출력 Ajax 메소드
  function ClassAjax() {
      $.ajax({
          url: "/findClassList", //서버요청주소
          type: "post",//요청방식 (get,post,patch,delete,put)
          dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
          success: function (result) {

              //클래스 생성
              $("#multiple-select2").empty();
              $("#multiple-select2").append("<option selected style=\"text-align: center;\"value=\"addClass\"> --- Add Class ---</option>");
              $("#multiple-select").attr("disabled", true);

              $("#addTask").attr("hidden", true);
              $("#editTask").attr("hidden", true);
              $("#delTask").attr("hidden", true);

              $.each(result, function (index, item) {

                  var className = item.className;
                  var classIdx = item.classIdx;

                  var str = "<option value=\"" + classIdx + "\">" + className + "</option>";
                  $("#multiple-select2").append(str);

              });
              // alert("StudentAjax 성공");
          }, //성공했을때
          error: function (request) {
              alert(request.responseText);
          }// 실패했을때
      });
  }

  //클래스 생성
  $(document).on("click", "#addClass", function () {
      var className = $("#text-input1").val();
      var sectionName = $(".select2-selection__rendered").text();

      if (sectionName == "Please select") {
          alert("Please enter section name.");
          return true;
      }

      $.ajax({
          url: "/updateClass", //서버요청주소
          type: "post",//요청방식 (get,post,patch,delete,put)
          data: "className=" + className + "&sectionName=" + sectionName,
          dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
          success: function (result) {
              alert("The class has been created.");
              ClassAjax();
              FormClear();
              location.reload();
          }, //성공했을때
          error: function (request) {
              alert(request.responseText);
          }// 실패했을때
      });
  });
*/

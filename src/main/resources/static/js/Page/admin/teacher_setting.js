////////////////////////////////////////////////////////////////////
//                                                                //
//                         Setting_Class                          //
//                                                                //
////////////////////////////////////////////////////////////////////

$(function () {
    //시즌 전역변수 저장
    var curSeasonIdx = sessionStorage.getItem("curSeasonIdx");

    //설정화면 버튼 활성화여부
    var activeButton = -1;

    //선생님 목록 출력
    findTeacherList();

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    //학생 목록 클릭
    $(document).on("click", ".studentButton", function () {

        var index = $(".studentButton").index(this);

        //설정화면이 활성화 된 상태이면
        if (activeButton != -1) {

            //활성화된 설정화면을 제거한다.
            $(".studentButton").eq(activeButton).parent().parent().next().remove();
            $(".studentButton").eq(activeButton).parent().parent().next().remove();

            //같은 TR의 다른 종류의 버튼을 눌렀을 경우
            if ($(".classButton.active").eq(activeButton).length == 1) {
                //다른 버튼의 active상태를 제거해준다.
                $(".classButton.active").eq(activeButton).removeClass('active');
            }
            //같은 TR의 같은 종류의 버튼을 눌렀을 경우
            else if ($(this).parent().find(".active").length == 1) {
                //본인의 active상태를 제거하고 함수를 종료한다.
                $(".studentButton").eq(activeButton).removeClass('active');
                activeButton = -1;
                return 0;
            }
            //이전 활성화 TR의 active상태를 제거해준다.
            $(".studentButton").eq(activeButton).removeClass('active');
            $(".classButton").eq(activeButton).removeClass('active');
        }

        var str = "                                  <tr class=\"spacer\"></tr>" +
            "                                           <tr>\n" +
            "                                            <td colspan=\"8\">\n" +
            "                                                <div class=\"row activeDiv\">\n" +
            "                                                    <div class=\"col-lg-6 custom-col-lg-6\">\n" +
            "                                                        <!-- USER DATA-->\n" +
            "                                                        <div class=\"user-data custom-user-data m-b-30\">\n" +
            "                                                            <div class=\"filters m-b-25\" style=\"padding-right: 20px;\">\n" +
            "                                                                <h3 style=\"display: contents;\" class=\"title-3 m-b-30\"><i style=\"padding-bottom: 10px;\" class=\"zmdi zmdi-account-calendar\"></i>All Class</h3>\n" +
            "                                                               <div class=\"rs-select2--dark rs-select2--md m-r-10 rs-select2--border\" style=\"float: right;\">\n" +
            "                                                                   <select class=\"js-select2 all-student-order-by\" name=\"property\">\n" +
            "                                                                       <option value=\"0\">By Index</option>\n" +
            "                                                                       <option selected=\"selected\" value=\"2\">By Name</option>\n" +
            "                                                                       <option value=\"1\">By Grade</option>\n" +
            "                                                                   </select>\n" +
            "                                                               <div class=\"dropDownSelect2\"></div>\n" +
            "                                                           </div>\n" +
            "                                                            </div>\n" +
            "                                                            <div class=\"table-responsive custom-table-data2\">\n" +
            "                                                                <table class=\"table\">\n" +
            "                                                                    <thead>\n" +
            "                                                                    <tr>\n" +
            "                                                                        <td>\n" +
            "                                                                            <label class=\"au-checkbox\">\n" +
            "                                                                                <input type=\"checkbox\" class=\"allCheck\">\n" +
            "                                                                                <span class=\"au-checkmark\"></span>\n" +
            "                                                                            </label>\n" +
            "                                                                        </td>\n" +
            "                                                                        <td>name</td>\n" +
            // "                                                                        <td>Gender</td>\n" +
            "                                                                        <td>Grade</td>\n" +
            "                                                                    </tr>\n" +
            "                                                                    </thead>\n" +
            "                                                                    <tbody class=\"studentList\">\n" +
            "                                                                    </tbody>\n" +
            "                                                                </table>\n" +
            "                                                            </div>\n" +
            "                                                        </div>\n" +
            "                                                        <!-- END USER DATA-->\n" +
            "                                                    </div>\n" +
            "                                                    <div class=\"arrow\">\n" +
            "                                                        <button class=\"au-btn au-btn-icon au-btn-load au-btn--small arrow-right\">\n" +
            "                                                            >\n" +
            "                                                        </button>\n" +
            "                                                        <button class=\"au-btn au-btn-icon au-btn-load au-btn--small arrow-left\">\n" +
            "                                                            <\n" +
            "                                                        </button>\n" +
            "                                                    </div>\n" +
            "                                                    <div class=\"col-lg-6 custom-col-lg-6\">\n" +
            "                                                        <!-- USER DATA-->\n" +
            "                                                        <div class=\"user-data custom-user-data m-b-30\">\n" +
            "                                                            <div class=\"filters m-b-25\" style=\"padding-right: 20px;\">\n" +
            "                                                                <h3 style=\"display: contents;\" class=\"title-3 m-b-30\"><i style=\"padding-bottom: 10px;\" class=\"zmdi zmdi-account-calendar\"></i>Auth Class</h3>\n" +
            "                                                               <div class=\"rs-select2--dark rs-select2--md m-r-10 rs-select2--border\" style=\"float: right;\">\n" +
            "                                                                   <select class=\"js-select2 auth-student-order-by\" name=\"property\">\n" +
            "                                                                       <option value=\"0\">By Index</option>\n" +
            "                                                                       <option selected=\"selected\" value=\"2\">By Name</option>\n" +
            "                                                                       <option value=\"1\">By Grade</option>\n" +
            "                                                                   </select>\n" +
            "                                                               <div class=\"dropDownSelect2\"></div>\n" +
            "                                                           </div>\n" +
            "                                                            </div>\n" +
            "                                                            <div class=\"table-responsive custom-table-data2\">\n" +
            "                                                                <table class=\"table\">\n" +
            "                                                                    <thead>\n" +
            "                                                                    <tr>\n" +
            "                                                                        <td>\n" +
            "                                                                            <label class=\"au-checkbox\">\n" +
            "                                                                                <input type=\"checkbox\" class=\"allCheck\">\n" +
            "                                                                                <span class=\"au-checkmark\"></span>\n" +
            "                                                                            </label>\n" +
            "                                                                        </td>\n" +
            "                                                                        <td>name</td>\n" +
            // "                                                                        <td>Gender</td>\n" +
            "                                                                        <td>Grade</td>\n" +
            "                                                                    </tr>\n" +
            "                                                                    </thead>\n" +
            "                                                                    <tbody class=\"authStudentList\">\n" +
            "                                                                    </tbody>\n" +
            "                                                                </table>\n" +
            "                                                            </div>\n" +
            "                                                        </div>\n" +
            "                                                        <!-- END USER DATA-->\n" +
            "                                                    </div>\n" +
            "                                                </div>\n" +
            "                                            </td>\n" +
            "                                        </tr>\n" +
            "                                        ";

        $(this).parent().parent().after(str);
        $(".activeDiv").css("display", "none").slideToggle();
        $(this).addClass('active');
        activeButton = index;


        $(".all-student-order-by").each(function () {
            $(this).select2({
                minimumResultsForSearch: 20,
                dropdownParent: $(this).next('.dropDownSelect2')
            });
        });
        $(".auth-student-order-by").each(function () {
            $(this).select2({
                minimumResultsForSearch: 20,
                dropdownParent: $(this).next('.dropDownSelect2')
            });
        });

        printStudentList(0);
        printAuthStudentList(0)
    });
    //orderby
    $(document).on("change", ".all-student-order-by", function () {
        printStudentList($(this).find('option:selected').val());
    });
    $(document).on("change", ".auth-student-order-by", function () {
        printAuthStudentList($(this).find('option:selected').val())
    });
    //학생 배치
    $(document).on("click", ".arrow-right", function () {

        //체크 항목 Idx 저장
        // var studentIdxList = [];

        //체크 항목 class 이름 저장
        var classList = [];

        $(".studentList .au-checkbox input:checked").each(function (index, item) {
            // studentIdxList[index] = $(item).parent().parent().next().find(".hoverName.studentIdx").data('id');
            classList[index] = $(item).parent().parent().next().find(".hoverName.studentIdx").text();
        });

        // if (studentIdxList.length == 0) {
        //     alert("Please select a class");
        //     return 0;
        // }

        if (classList.length == 0) {
                alert("Please select a class");
                return 0;
            }

        //선택된 선생님 Idx 저장
        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');


        console.log(classList);

        $.ajax({
            // url: "/admin/createAuthStudent", //서버요청주소
            url: "/admin/createAuthClass", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            // data: "studentIdxList=" + studentIdxList + "&userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx,
            data: "classList=" + classList + "&userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function () {
                printStudentList($(".all-student-order-by").find('option:selected').val());
                printAuthStudentList($(".auth-student-order-by").find('option:selected').val());
                //Count 수정
                updateCount();
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    });
    //학생 배치 해제
    $(document).on("click", ".arrow-left", function () {

        //체크 항목 class 이름 저장
        var authClassList = [];

        $(".authStudentList .au-checkbox input:checked").each(function (index, item) {
            // studentIdxList[index] = $(item).parent().parent().next().find(".hoverName.studentIdx").data('id');
            authClassList[index] = $(item).parent().parent().next().find(".hoverName.studentIdx").text();
        });

        //선택된 선생님 Idx 저장
        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');


        // //체크 항목 Idx 저장
        // var authStudentIdxList = [];
        // $(".authStudentList .au-checkbox input:checked").each(function (index, item) {
        //     authStudentIdxList[index] = $(item).parent().parent().next().find(".hoverName.studentIdx").data('id');
        // });
        //
        // if (authStudentIdxList.length == 0) {
        //     alert("Please select a student");
        //     return 0;
        // }

        if (authClassList.length == 0) {
            alert("Please select a authClass");
            return 0;
        }

        console.log(userIdx);
        console.log(curSeasonIdx);
        console.log(authClassList);

        if (confirm("Are you sure you want to delete the checked student? ( 1/2 )")) {
            if (confirm("Again : Are you sure you want to delete the checked student? Data cannot be recovered. ( 2/2 )")) {
                $.ajax({
                    // url: "/admin/deleteAuthStudent", //서버요청주소
                    url: "/admin/deleteAuthClass", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    // data: "authStudentIdxList=" + authStudentIdxList,
                    data: "authClassList=" + authClassList+ "&userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function () {
                        printStudentList($(".all-student-order-by").find('option:selected').val());
                        printAuthStudentList($(".auth-student-order-by").find('option:selected').val());
                        //Count 수정
                        updateCount();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }// 실패했을때
                });
            }
        }


    });

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    //클래스 목록 클릭
    $(document).on("click", ".classButton", function () {

        var index = $(".classButton").index(this);

        //설정화면이 활성화 된 상태이면
        if (activeButton != -1) {

            //활성화된 설정화면을 제거한다.
            $(".classButton").eq(activeButton).parent().parent().next().remove();
            $(".classButton").eq(activeButton).parent().parent().next().remove();

            //같은 TR의 다른 종류의 버튼을 눌렀을 경우
            if ($(".studentButton.active").eq(activeButton).length == 1) {
                //다른 버튼의 active상태를 제거해준다.
                $(".studentButton.active").eq(activeButton).removeClass('active');
            }
            //같은 TR의 같은 종류의 버튼을 눌렀을 경우
            else if ($(this).parent().find(".active").length == 1) {
                //본인의 active상태를 제거하고 함수를 종료한다.
                $(".classButton").eq(activeButton).removeClass('active');
                activeButton = -1;
                return 0;
            }

        }
        //이전 활성화 TR의 active상태를 제거해준다.
        $(".studentButton").eq(activeButton).removeClass('active');
        $(".classButton").eq(activeButton).removeClass('active');

        var str = "                                  <tr class=\"spacer\"></tr>" +
            "                                           <tr>\n" +
            "                                            <td colspan=\"8\">\n" +
            "                                                <div class=\"row activeDiv\">\n" +
            "                                                    <div class=\"col-lg-6 custom-col-lg-6\">\n" +
            "                                                        <!-- USER DATA-->\n" +
            "                                                        <div class=\"user-data custom-user-data m-b-30\">\n" +
            "                                                            <div class=\"filters m-b-25\" style=\"padding-right: 20px;\">\n" +
            "                                                                <h3 style=\"display: contents;\" class=\"title-3 m-b-30\"><i style=\"padding-bottom: 10px;\" class=\"zmdi zmdi-account-calendar\"></i>All Course</h3>\n" +
            "                                                               <div class=\"rs-select2--dark rs-select2--md m-r-10 rs-select2--border\" style=\"float: right;\">\n" +
            "                                                                   <select class=\"js-select2 all-class-order-by\" name=\"property\">\n" +
            "                                                                       <option selected=\"selected\" value=\"0\">By Index</option>\n" +
            "                                                                       <option value=\"2\">By Name</option>\n" +
            "                                                                       <option value=\"1\">By Grade</option>\n" +
            "                                                                   </select>\n" +
            "                                                               <div class=\"dropDownSelect2\"></div>\n" +
            "                                                           </div>\n" +
            "                                                            <div class=\"table-responsive custom-table-data\">\n" +
            "                                                                <table class=\"table\">\n" +
            "                                                                    <thead class=\"classThead\">\n" +
            "                                                                    <tr>\n" +
            "                                                                        <td>\n" +
            "                                                                            <label class=\"au-checkbox\">\n" +
            "                                                                                <input type=\"checkbox\" class=\"allCheck\">\n" +
            "                                                                                <span class=\"au-checkmark\"></span>\n" +
            "                                                                            </label>\n" +
            "                                                                        </td>\n" +
            "                                                                        <td>name</td>\n" +
            "                                                                        <td>Grade</td>\n" +
            "                                                                    </tr>\n" +
            "                                                                    </thead>\n" +
            "                                                                    <tbody class=\"classList\">\n" +
            "                                                                    </tbody>\n" +
            "                                                                </table>\n" +
            "                                                            </div>" +
            "                                                            </div>" +
            "                                                           <div style=\"padding: 12px 0;\" class=\"user-data__footer\">\n" +
            "                                                           <button type=\"button\" class=\"btn btn-success createAuthClass\">\n" +
            "                                                           <i class=\"fa fa-plus\"></i> Create\n" +
            "                                                            </button>\n" +
            "                                                           </div>\n" +
            "                                                        </div>\n" +
            "                                                        <!-- END USER DATA-->\n" +
            "                                                    </div>\n" +
            "                                                    <div class=\"arrow\" style=\"min-width: 47px;\">\n" +
            "                                                    </div>\n" +
            "                                                    <div class=\"col-lg-6 custom-col-lg-6\">\n" +
            "                                                        <!-- USER DATA-->\n" +
            "                                                        <div class=\"user-data custom-user-data m-b-30\">\n" +
            "                                                            <div class=\"filters m-b-25\" style=\"padding-right: 20px;\">\n" +
            "                                                                <h3 style=\"display: contents;\" class=\"title-3 m-b-30\"><i style=\"padding-bottom: 10px;\" class=\"zmdi zmdi-account-calendar\"></i>Auth Course</h3>\n" +
            "                                                               <div class=\"rs-select2--dark rs-select2--md m-r-10 rs-select2--border\" style=\"float: right;\">\n" +
            "                                                                   <select class=\"js-select2 auth-class-order-by\" name=\"property\">\n" +
            "                                                                       <option selected=\"selected\" value=\"0\">By Index</option>\n" +
            "                                                                       <option value=\"2\">By Name</option>\n" +
            "                                                                       <option value=\"1\">By Grade</option>\n" +
            "                                                                   </select>\n" +
            "                                                               <div class=\"dropDownSelect2\"></div>\n" +
            "                                                           </div>\n" +
            "                                                            <div class=\"table-responsive custom-table-data\">\n" +
            "                                                                <table class=\"table\">\n" +
            "                                                                    <thead class=\"classThead\">\n" +
            "                                                                    <tr>\n" +
            "                                                                        <td>\n" +
            "                                                                            <label class=\"au-checkbox\">\n" +
            "                                                                                <input type=\"checkbox\" class=\"allCheck\">\n" +
            "                                                                                <span class=\"au-checkmark\"></span>\n" +
            "                                                                            </label>\n" +
            "                                                                        </td>\n" +
            "                                                                        <td>name</td>\n" +
            "                                                                        <td>Grade</td>\n" +
            "                                                                        <td>Member</td>\n" +
            "                                                                    </tr>\n" +
            "                                                                    </thead>\n" +
            "                                                                    <tbody class=\"authClassList\">\n" +
            "                                                                    </tbody>\n" +
            "                                                                </table>\n" +
            "                                                        </div>\n" +
            "                                                        <!-- END USER DATA-->\n" +
            "                                                    </div>\n" +
            "                                                             <div style=\"padding: 12px 0;\" class=\"user-data__footer\">\n" +
            "                                                              <button type=\"button\" class=\"btn btn-danger deleteAuthClass\">\n" +
            "                                                             <i class=\"fa fa-minus\"></i> Delete\n" +
            "                                                                </button>\n" +
            "                                                            </div>\n" +
            "                                                </div>\n" +
            "                                            </td>\n" +
            "                                        </tr>\n" +
            "                                        ";

        $(this).parent().parent().after(str);
        $(".activeDiv").css("display", "none").slideToggle();
        $(this).addClass('active');
        activeButton = index;
        $(".all-class-order-by").each(function () {
            $(this).select2({
                minimumResultsForSearch: 20,
                dropdownParent: $(this).next('.dropDownSelect2')
            });
        });
        $(".auth-class-order-by").each(function () {
            $(this).select2({
                minimumResultsForSearch: 20,
                dropdownParent: $(this).next('.dropDownSelect2')
            });
        });

        printClassList(0);
        printAuthClassList(0);


        //아이콘
        //fa-ellipsis-h

        //select2
        $(".custom-js-select2").each(function () {
            $(this).select2({
                minimumResultsForSearch: 20,
                dropdownParent: $(this).next('.dropDownSelect2')
            });
        });

        //Grade 색상 매치
        $(".custom-td div .select2-hidden-accessible option:selected").each(function () {
            var number = $(this).text();
            if (number == 1) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#5a6268');
            else if (number == 2) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#138496');
            else if (number == 3) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#e0a800');
            else if (number == 4) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#218838');
            else if (number == 5) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#0069d9');
            else if (number == 6) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#c82333');
        });

        //Grade 선택시 색상 매치
        $(document).on("change", ".custom-td div .select2-hidden-accessible", function () {
            var number = $(this).find('option:selected').text();
            if (number == 1) $(this).parent().find('.select2-selection__rendered').css('background', '#5a6268');
            else if (number == 2) $(this).parent().find('.select2-selection__rendered').css('background', '#138496');
            else if (number == 3) $(this).parent().find('.select2-selection__rendered').css('background', '#e0a800');
            else if (number == 4) $(this).parent().find('.select2-selection__rendered').css('background', '#218838');
            else if (number == 5) $(this).parent().find('.select2-selection__rendered').css('background', '#0069d9');
            else if (number == 6) $(this).parent().find('.select2-selection__rendered').css('background', '#c82333');

        });

    });
    //orderby
    $(document).on("change", ".all-class-order-by", function () {
        printClassList($(this).find('option:selected').val());
    });
    $(document).on("change", ".auth-class-order-by", function () {
        printAuthClassList($(this).find('option:selected').val())
    });
    //클래스 배치
    $(document).on("click", ".createAuthClass", function () {

        //체크 항목 Idx 저장
        var classIdxList = [];

        $(".classList .au-checkbox input:checked").each(function (index, item) {
            classIdxList[index] = $(item).parent().parent().next().find(".hoverName.classIdx").data('id');
        });

        //선택된 선생님 Idx 저장
        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');

        if (classIdxList.length == 0) {
            alert("Please select a class");
            return 0;
        }

        if (confirm("Are you sure you want to create Course?")) {
            $.ajax({
                url: "/admin/createAuthCourse", //서버요청주소
                type: "post",//요청방식 (get,post,patch,delete,put)
                data: "classIdxList=" + classIdxList + "&userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx,
                dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success: function () {
                    printClassList($(".all-class-order-by").find('option:selected').val());
                    printAuthClassList($(".all-class-order-by").find('option:selected').val());
                    //Count 수정
                    updateCount();
                }, //성공했을때
                error: function (request) {
                    alert(request.responseText);
                }// 실패했을때
            });
        }
    });
    //클래스 배치 해제
    $(document).on("click", ".deleteAuthClass", function () {

        //체크 항목 Idx 저장
        var classIdxList = [];
        $(".authClassList .au-checkbox input:checked").each(function (index, item) {
            classIdxList[index] = $(item).parent().parent().next().find(".hoverName.classIdx").data('id');
        });

        if (classIdxList.length == 0) {
            alert("Please select a class");
            return 0;
        }

        if (confirm("Are you sure you want to delete the checked class? ( 1/2 )")) {
            if (confirm("Again : Are you sure you want to delete the checked class? Data cannot be recovered. ( 2/2 )")) {
                $.ajax({
                    url: "/admin/deleteAuthCourse", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "classIdxList=" + classIdxList,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function () {
                        printClassList($(".all-class-order-by").find('option:selected').val());
                        printAuthClassList($(".all-class-order-by").find('option:selected').val());
                        //Count 수정
                        updateCount();
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }// 실패했을때
                });
            }
        }


    });


    //클래스 맴버 목록
    $(document).on("click", ".classMembers", function () {
        var authClassIdx = $(this).parent().parent().find(".hoverName.classIdx").data('id');
        $(".auth-student-order-by2").find('option:selected').prop('selected',false);
        $(".auth-student-order-by2").find('option[value=0]').prop('selected',true);
        $(".auth-student-order-by2").parent().find(".select2-selection__rendered").text("By Index");
        $(".class-members-order-by").find('option:selected').prop('selected',false);
        $(".class-members-order-by").find('option[value=0]').prop('selected',true);
        $(".class-members-order-by").parent().find(".select2-selection__rendered").text("By Index");
        printAuthStudentList2(authClassIdx,0);
        printClassMembersList(authClassIdx,0);
        //모달에 authClassIdx저장
        $(".modal-body .authClassIdx").text(authClassIdx);
    });
    //orderby
    $(document).on("change", ".auth-student-order-by2", function () {
        var authClassIdx = $(".modal-body .authClassIdx").text();
        printAuthStudentList2(authClassIdx,$(this).find('option:selected').val());
    });
    $(document).on("change", ".class-members-order-by", function () {
        var authClassIdx = $(".modal-body .authClassIdx").text();
        printClassMembersList(authClassIdx,$(this).find('option:selected').val())
    });
    //클래스 맴버 배치
    $(document).on("click", ".arrow-right2", function () {

        var authClassIdx = $(".modal-body .authClassIdx").text();
        //체크 항목 Idx 저장
        var studentIdxList = [];

        $(".authStudentList2 .au-checkbox input:checked").each(function (index, item) {
            studentIdxList[index] = $(item).parent().parent().next().find(".hoverName.studentIdx").data('id');
        });

        if (studentIdxList.length == 0) {
            alert("Please select a student");
            return 0;
        }
        $.ajax({
            url: "/admin/createClassMembers", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "studentIdxList=" + studentIdxList + "&authClassIdx=" + authClassIdx,
            dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function () {
                printAuthStudentList2(authClassIdx,$(".auth-student-order-by2").find('option:selected').val());
                printClassMembersList(authClassIdx,$(".class-members-order-by").find('option:selected').val());
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    });
    //클래스 맴버 배치 해제
    $(document).on("click", ".arrow-left2", function () {

        var authClassIdx = $(".modal-body .authClassIdx").text();
        //체크 항목 Idx 저장
        var classMembersList = [];
        $(".classMembersList .au-checkbox input:checked").each(function (index, item) {
            classMembersList[index] = $(item).parent().parent().next().find(".hoverName.studentIdx").data('id');
        });

        if (classMembersList.length == 0) {
            alert("Please select a student");
            return 0;
        }
        if (confirm("Are you sure you want to delete the checked student? ( 1/2 )")) {
            if (confirm("Again : Are you sure you want to delete the checked student? Data cannot be recovered. ( 2/2 )")) {
                $.ajax({
                    url: "/admin/deleteClassMembers", //서버요청주소
                    type: "post",//요청방식 (get,post,patch,delete,put)
                    data: "classMembersList=" + classMembersList,
                    dataType: "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                    success: function () {
                        printAuthStudentList2(authClassIdx,$(".auth-student-order-by2").find('option:selected').val());
                        printClassMembersList(authClassIdx,$(".class-members-order-by").find('option:selected').val());
                    }, //성공했을때
                    error: function (request) {
                        alert(request.responseText);
                    }// 실패했을때
                });
            }
        }


    });

    //filter선택시
    $(document).on('change', '.teacher-order-by', function () {
        findTeacherList();
    });

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
    $(document).on("change", ".authStudentList input", function () {
        // $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        if($(".authStudentList input:checked").length==$(".authStudentList input").length){
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',true);
        } else {
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        }
    });
    $(document).on("change", ".studentList input", function () {
        // $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        if($(".studentList input:checked").length==$(".studentList input").length){
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',true);
        } else {
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        }
    });
    $(document).on("change", ".authClassList input", function () {
        // $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        if($(".authClassList input:checked").length==$(".authClassList input").length){
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
    $(document).on("change", ".authStudentList2 input", function () {
        // $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        if($(".authStudentList2 input:checked").length==$(".authStudentList2 input").length){
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',true);
        } else {
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        }
    });
    $(document).on("change", ".classMembersList input", function () {
        // $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        if($(".classMembersList input:checked").length==$(".classMembersList input").length){
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',true);
        } else {
            $(this).parent().parent().parent().parent().parent().find(".allCheck").prop('checked',false);
        }
    });

    function findTeacherList() {

        $(".teacherList").empty();
        var orderBy = $(".teacher-order-by option:selected").text();
        if (orderBy == "By Index") orderBy = 0;
        else if (orderBy == "By Name") orderBy = 2;

        //선생님 목록 출력
        $.ajax({
            url: "/admin/findTeacherList", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "curSeasonIdx=" + curSeasonIdx + "&orderBy=" + orderBy,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {

                $.each(result, function (index, item) {
                    var str = "<tr class=\"tr-shadow\">\n" +
                        "                                <td class=\"userIdx\" data-id=\"" + item.account.userIdx + "\">" + (index + 1) + "</td>\n" +
                        "                                <td>" + item.account.userName + "</td>\n" +
                        "                                <td class=\"emailTd\">\n" +
                        "                                    <span class=\"block-email\">" + item.account.userEmail + "</span>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <button type=\"button\" class=\"btn btn-outline-link btn-sm studentButton\">\n" +
                        "                                        <i class=\"fa fa-user\"></i>&nbsp;<span>Student ( " + item.authStudentCount + " )</span>\n" +
                        "                                    </button>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <button type=\"button\" class=\"btn btn-outline-link btn-sm classButton\">\n" +
                        "                                        <i class=\"fa fa-link\"></i>&nbsp;<span>Course ( " + item.authClassCount + " )</span>\n" +
                        "                                    </button>\n" +
                        "                                </td>\n" +
                        "                            </tr>" +
                        "                           <tr class=\"spacer\"></tr>";

                    $(".teacherList").append(str).trigger("create");

                });

                //select2
                $(".custom-rs-multiple-select2 select").each(function () {
                    $(this).select2({
                        minimumResultsForSearch: 20,
                        dropdownParent: $(this).next('.dropDownSelect2')
                    });
                });


            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });

    }

    function printStudentList(orderBy) {
        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');

        $(".studentList").empty();
        $(".teacher-order-by option:selected").text();


        $.ajax({
            // url: "/admin/findStudentList_WithoutAuth", //서버요청주소
            url: "/admin/findClassList_WithoutAuth", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            // data: "userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx + "&orderBy=" + orderBy,
            data: "userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx,
            global: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                // console.log(result);
                $.each(result, function (index, item) {

                    var str = "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +
                        "                                    </td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        // "                                            <h6 data-id=\"" + item.studentIdx + "\" class=\"hoverName studentIdx\">" + item.studentName + "</h6>\n" +
                        "                                            <h6 class=\"hoverName studentIdx\">" + item.studentGroup + "</h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td> " +
                        // "                                    <td class=\"custom-td\">\n" +
                        // "                                        <div class=\"custom-table-data__info\">\n" +
                        // "                                            <h6 class=\"hoverName studentGender\"></h6>\n" +
                        // "                                        </div>\n" +
                        // "                                    </td>\n" +
                        "                                    <td>" +
                        "                                   <span class=\"studentGrade\" id=\"select2-property-ql-container\"" +
                        "                                    title=\"1\"\">" + item.studentGrade + "</span>\n" +
                        "                                    </td>" +
                        "                                </tr>";


                    $(".studentList").append(str).trigger("create");

                    /*//Gender 작업
                    $(".studentList tr:last").find(".custom-rs-select2 .studentGender option").each(function () {
                        if ($(this).text() == "Male"&& item.studentGender == 0) $(this).prop('selected', true);
                        else if ($(this).text() == "Female"&& item.studentGender == 1) $(this).prop('selected', true);
                    });*/

                    //Gender 작업
                    // if (item.studentGender == 0) $(".studentList tr:last").find(".hoverName.studentGender").text("Male");
                    // else if (item.studentGender == 1) $(".studentList tr:last").find(".hoverName.studentGender").text("Female");

                    /*//Grade 작업
                    $(".studentList tr:last").find(".custom-rs-select2 .studentGrade option").each(function () {
                        if ($(this).text() == item.studentGrade) $(this).prop('selected', true);
                    });*/

                    var number = $(".studentList tr:last").find(".studentGrade").text();
                    if (number == 1) $(".studentList tr:last").find(".studentGrade").css('background', '#5a6268');
                    else if (number == 2) $(".studentList tr:last").find(".studentGrade").css('background', '#138496');
                    else if (number == 3) $(".studentList tr:last").find(".studentGrade").css('background', '#e0a800');
                    else if (number == 4) $(".studentList tr:last").find(".studentGrade").css('background', '#218838');
                    else if (number == 5) $(".studentList tr:last").find(".studentGrade").css('background', '#0069d9');
                    else if (number == 6) $(".studentList tr:last").find(".studentGrade").css('background', '#c82333');
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

        //전체 체크 해제
        $(".studentList").parent().find(".allCheck").prop('checked',false);
        $(".authStudentList").parent().find(".allCheck").prop('checked',false);
    }

    function printAuthStudentList(orderBy) {
        $(".authStudentList").empty();
        /*        var orderBy = $(".teacher-order-by option:selected").text();
                if (orderBy == "By Index") orderBy = 0;
                else if (orderBy == "By Grade") orderBy = 1;
                else if (orderBy == "By Name") orderBy = 2;*/

        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');

        $.ajax({
            // url: "/admin/findTeacherAuthStudentList", //서버요청주소
            url: "/admin/findAuthClassList_Group", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            // data: "userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx + "&orderBy=" + orderBy,
            data: "userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx,
            global: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                console.log(result);
                $.each(result, function (index, item) {
                    var str = "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +
                        "                                    </td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        // "                                            <h6 data-id=\"" + item.authStudentIdx + "\" class=\"hoverName studentIdx\">" + item.student.studentName + "</h6>\n" +
                        "                                            <h6 class=\"hoverName studentIdx\">" + item.studentGroup + "</h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td> " +
                        // "                                    <td class=\"custom-td\">\n" +
                        // "                                        <div class=\"custom-table-data__info\">\n" +
                        // "                                            <h6 class=\"hoverName studentGender\"></h6>\n" +
                        // "                                        </div>\n" +
                        // "                                    </td>\n" +
                        "                                    <td>" +
                        "                                   <span class=\"studentGrade\" id=\"select2-property-ql-container\"" +
                        // "                                    title=\"1\"\">" + item.student.studentGrade + "</span>\n" +
                        "                                    title=\"1\"\">" + item.studentGrade + "</span>\n" +
                        "                                    </td>" +
                        "                                </tr>";


                    $(".authStudentList").append(str).trigger("create");

                    //Gender 작업
                    // if (item.student.studentGender == 0) $(".authStudentList tr:last").find(".hoverName.studentGender").text("Male");
                    // else if (item.student.studentGender == 1) $(".authStudentList tr:last").find(".hoverName.studentGender").text("Female");

                    //Grade 작업
                    var number = $(".authStudentList tr:last").find(".studentGrade").text();
                    if (number == 1) $(".authStudentList tr:last").find(".studentGrade").css('background', '#5a6268');
                    else if (number == 2) $(".authStudentList tr:last").find(".studentGrade").css('background', '#138496');
                    else if (number == 3) $(".authStudentList tr:last").find(".studentGrade").css('background', '#e0a800');
                    else if (number == 4) $(".authStudentList tr:last").find(".studentGrade").css('background', '#218838');
                    else if (number == 5) $(".authStudentList tr:last").find(".studentGrade").css('background', '#0069d9');
                    else if (number == 6) $(".authStudentList tr:last").find(".studentGrade").css('background', '#c82333');
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

        //전체 체크 해제
        $(".studentList").parent().find(".allCheck").prop('checked',false);
        $(".authStudentList").parent().find(".allCheck").prop('checked',false);
    }

    function printClassList(orderBy) {
        $(".classList").empty();

        $.ajax({
            url: "/findClassList", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "curSeasonIdx=" + curSeasonIdx + "&orderBy=" + orderBy,
            global: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {

                $.each(result, function (index, item) {
                    var str = "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +
                        "                                    </td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 data-id=\"" + item.classIdx + "\" class=\"hoverName classIdx\">" + item.className + "</h6>\n" +
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
                                if ($(this).text() == "All" && gradeArray[i] == "0") {
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
                        dropdownParent: $(this).next('.dropDownSelect2'),
                        disabled: true
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
        $(".authClassList").parent().find(".allCheck").prop('checked',false);
    }

    function printAuthClassList(orderBy) {
        $(".authClassList").empty();

        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');

        $.ajax({
            url: "/admin/findAuthClassList", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx + "&orderBy=" + orderBy,
            global: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                // console.log(result);
                $.each(result, function (index, item) {
                    var str = "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +
                        "                                    </td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 data-id=\"" + item.authClassIdx + "\" class=\"hoverName classIdx\">" + item._class.className + "</h6>\n" +
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
                        "                               <td><button type=\"button\" class=\"btn btn-outline-link classMembers\" data-toggle=\"modal\"\n" +
                        "                                  data-target=\"#largeModal\"><i class=\"fa fa-users\"></i></button></td>\n" +
                        "                                </tr>";

                    $(".authClassList").append(str).trigger("create");

                    //Grade 작업
                    if (item._class.classGrade != null) {
                        var gradeArray = item._class.classGrade.split("|");

                        $(".authClassList tr:last").find(".custom-rs-multiple-select2 select option").each(function () {

                            for (var i in gradeArray) {
                                if ($(this).text() == gradeArray[i]) {
                                    $(this).prop('selected', true);
                                }
                                //All 처리
                                if ($(this).text() == "All" && gradeArray[i] == "0") {
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
                        dropdownParent: $(this).next('.dropDownSelect2'),
                        disabled: true
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
        $(".authClassList").parent().find(".allCheck").prop('checked',false);
    }

    function printAuthStudentList2(authClassIdx,orderBy) {
        $(".authStudentList2").empty();
        /*        var orderBy = $(".teacher-order-by option:selected").text();
                if (orderBy == "By Index") orderBy = 0;
                else if (orderBy == "By Grade") orderBy = 1;
                else if (orderBy == "By Name") orderBy = 2;*/

        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');

        $.ajax({
            url: "/admin/findTeacherAuthStudentList2", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "authClassIdx=" + authClassIdx + "&userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx + "&orderBy=" + orderBy,
            global: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                // console.log(result);
                $.each(result, function (index, item) {
                    var str = "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +
                        "                                    </td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 data-id=\"" + item.authStudentIdx + "\" class=\"hoverName studentIdx\">" + item.student.studentName + "</h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td> " +
                        "                                    <td class=\"custom-td\">\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 class=\"hoverName studentGender\"></h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td>\n" +
                        "                                    <td>" +
                        "                                   <span class=\"studentGrade\" id=\"select2-property-ql-container\"" +
                        "                                    title=\"1\"\">" + item.student.studentGrade + "</span>\n" +
                        "                                    </td>" +
                        "                                </tr>";


                    $(".authStudentList2").append(str).trigger("create");

                    //Gender 작업
                    if (item.student.studentGender == 0) $(".authStudentList2 tr:last").find(".hoverName.studentGender").text("Male");
                    else if (item.student.studentGender == 1) $(".authStudentList2 tr:last").find(".hoverName.studentGender").text("Female");

                    //Grade 작업
                    var number = $(".authStudentList2 tr:last").find(".studentGrade").text();
                    if (number == 1) $(".authStudentList2 tr:last").find(".studentGrade").css('background', '#5a6268');
                    else if (number == 2) $(".authStudentList2 tr:last").find(".studentGrade").css('background', '#138496');
                    else if (number == 3) $(".authStudentList2 tr:last").find(".studentGrade").css('background', '#e0a800');
                    else if (number == 4) $(".authStudentList2 tr:last").find(".studentGrade").css('background', '#218838');
                    else if (number == 5) $(".authStudentList2 tr:last").find(".studentGrade").css('background', '#0069d9');
                    else if (number == 6) $(".authStudentList2 tr:last").find(".studentGrade").css('background', '#c82333');
                });

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
        //전체 체크 해제
        $(".authStudentList2").parent().find(".allCheck").prop('checked',false);
        $(".classMembersList").parent().find(".allCheck").prop('checked',false);
    }

    function printClassMembersList(authClassIdx,orderBy) {
        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');

        $(".classMembersList").empty();
        /*var orderBy = $(".teacher-order-by option:selected").text();
        if (orderBy == "By Index") orderBy = 0;
        else if (orderBy == "By Grade") orderBy = 1;
        else if (orderBy == "By Name") orderBy = 2;*/

        $.ajax({
            url: "/admin/findClassMembers", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "authClassIdx=" + authClassIdx + "&orderBy=" + orderBy,
            global: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                $.each(result, function (index, item) {
                    var str = "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <label class=\"au-checkbox\">\n" +
                        "                                            <input type=\"checkbox\">\n" +
                        "                                            <span class=\"au-checkmark\"></span>\n" +
                        "                                        </label>\n" +
                        "                                    </td>\n" +
                        "                                    <td>\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 data-id=\"" + item.classMembersIdx + "\" class=\"hoverName studentIdx\">" + item.authStudent.student.studentName + "</h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td> " +
                        "                                    <td class=\"custom-td\">\n" +
                        "                                        <div class=\"custom-table-data__info\">\n" +
                        "                                            <h6 class=\"hoverName studentGender\"></h6>\n" +
                        "                                        </div>\n" +
                        "                                    </td>\n" +
                        "                                    <td>" +
                        "                                   <span class=\"studentGrade\" id=\"select2-property-ql-container\"" +
                        "                                    title=\"1\"\">" + item.authStudent.student.studentGrade + "</span>\n" +
                        "                                    </td>" +
                        "                                </tr>";


                    $(".classMembersList").append(str).trigger("create");

                    //Gender 작업
                    $(".classMembersList tr:last").find(".custom-rs-select2 .studentGender option").each(function () {
                        if ($(this).text() == "Male" && item.authStudent.student.studentGender == 0) $(this).prop('selected', true);
                        else if ($(this).text() == "Female" && item.authStudent.student.studentGender == 1) $(this).prop('selected', true);
                    });

                    //Gender 작업
                    if (item.authStudent.student.studentGender == 0) $(".classMembersList tr:last").find(".hoverName.studentGender").text("Male");
                    else if (item.authStudent.student.studentGender == 1) $(".classMembersList tr:last").find(".hoverName.studentGender").text("Female");

                    //Grade 작업
                    $(".classMembersList tr:last").find(".custom-rs-select2 .studentGrade option").each(function () {
                        if ($(this).text() == item.authStudent.student.studentGrade) $(this).prop('selected', true);
                    });

                    var number = $(".classMembersList tr:last").find(".studentGrade").text();
                    if (number == 1) $(".classMembersList tr:last").find(".studentGrade").css('background', '#5a6268');
                    else if (number == 2) $(".classMembersList tr:last").find(".studentGrade").css('background', '#138496');
                    else if (number == 3) $(".classMembersList tr:last").find(".studentGrade").css('background', '#e0a800');
                    else if (number == 4) $(".classMembersList tr:last").find(".studentGrade").css('background', '#218838');
                    else if (number == 5) $(".classMembersList tr:last").find(".studentGrade").css('background', '#0069d9');
                    else if (number == 6) $(".classMembersList tr:last").find(".studentGrade").css('background', '#c82333');
                });

            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
        //전체 체크 해제
        $(".authStudentList2").parent().find(".allCheck").prop('checked',false);
        $(".classMembersList").parent().find(".allCheck").prop('checked',false);
    }

    function Select2(Select) {
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

    function multiple_Select(Select) {
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
        $.each(Select, function (index, item) {

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

    function updateCount() {
        var userIdx = $(".teacherList .active:button").parent().parent().find(".userIdx").data('id');
        $.ajax({
            url: "/admin/updateCount", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "userIdx=" + userIdx + "&curSeasonIdx=" + curSeasonIdx,
            global: false,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                $(".teacherList .active:button").parent().parent().find(".studentButton span").text("Student ( " + result.authStudentCount + " )");
                $(".teacherList .active:button").parent().parent().find(".classButton span").text("Class ( " + result.authClassCount + " )");
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }// 실패했을때
        });
    }
});

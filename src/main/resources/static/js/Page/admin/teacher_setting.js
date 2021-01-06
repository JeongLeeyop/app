////////////////////////////////////////////////////////////////////
//                                                                //
//                         Setting_Class                          //
//                                                                //
////////////////////////////////////////////////////////////////////

$(function () {
    $(".js-example-placeholder-multiple").select2({
        placeholder: "Select a state"
    });

    var activeButton = -1;

    //학생 목록
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
            "                                                                <h3 style=\"display: contents;\" class=\"title-3 m-b-30\"><i style=\"padding-bottom: 10px;\" class=\"zmdi zmdi-account-calendar\"></i>All Students</h3>\n" +
            "\n" +
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
            "                                                                        <td>Grade</td>\n" +
            "                                                                        <td>Gender</td>\n" +
            "                                                                    </tr>\n" +
            "                                                                    </thead>\n" +
            "                                                                    <tbody>\n" +
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
            "                                                            <h3 class=\"title-3 m-b-30\"><i class=\"zmdi zmdi-account-calendar\"></i>Auth Student</h3>\n" +
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
            "                                                                        <td>Grade</td>\n" +
            "                                                                        <td>Gender</td>\n" +
            "                                                                    </tr>\n" +
            "                                                                    </thead>\n" +
            "                                                                    <tbody>\n" +
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


        //    클래스 샘플 데이터 삽입

    });


    //클래스 목록
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
            "                                                                <h3 style=\"display: contents;\" class=\"title-3 m-b-30\"><i style=\"padding-bottom: 10px;\" class=\"zmdi zmdi-account-calendar\"></i>All Classes</h3>\n" +
            "\n" +
            "                                                            </div>\n" +
            "                                                            <div class=\"table-responsive custom-table-data\">\n" +
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
            "                                                                    </tr>\n" +
            "                                                                    </thead>\n" +
            "                                                                    <tbody class=\"allClass\">\n" +
            "                                                                    </tbody>\n" +
            "                                                                </table>\n" +
            "                                                            </div>" +
            "                                                           <div style=\"padding: 12px 0;\" class=\"user-data__footer\">\n" +
            "                                                           <button type=\"button\" class=\"btn btn-success\">\n" +
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
            "                                                            <h3 class=\"title-3 m-b-30\"><i class=\"zmdi zmdi-account-calendar\"></i>Auth Class</h3>\n" +
            "                                                            <div class=\"table-responsive custom-table-data\">\n" +
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
            "                                                                        <td>Member</td>\n" +
            "                                                                    </tr>\n" +
            "                                                                    </thead>\n" +
            "                                                                    <tbody class=\"authClass\">\n" +
            "                                                                    </tbody>\n" +
            "                                                                </table>\n" +
            "                                                            </div>" +
            "                                                             <div style=\"padding: 12px 0;\" class=\"user-data__footer\">\n" +
            "                                                              <button type=\"button\" class=\"btn btn-danger\">\n" +
            "                                                             <i class=\"fa fa-minus\"></i> Delete\n" +
            "                                                                </button>\n" +
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

        //데이터 추가
        var str2 = "<tr>\n" +
            "                                    <td>\n" +
            "                                        <label class=\"au-checkbox\">\n" +
            "                                            <input type=\"checkbox\">\n" +
            "                                            <span class=\"au-checkmark\"></span>\n" +
            "                                        </label>\n" +
            "                                    </td>\n" +
            "                                    <td>\n" +
            "                                        <div class=\"custom-table-data__info\">\n" +
            "                                            <h6 class=\"hoverName\">lori lynch</h6>\n" +
            "                                        </div>\n" +
            "                                    </td>\n" +
            "                                </tr>";
        $(".allClass").append(str2).trigger("create");

        var str3 = "<tr>\n" +
            "                                    <td>\n" +
            "                                        <label class=\"au-checkbox\">\n" +
            "                                            <input type=\"checkbox\">\n" +
            "                                            <span class=\"au-checkmark\"></span>\n" +
            "                                        </label>\n" +
            "                                    </td>\n" +
            "                                    <td>\n" +
            "                                        <div class=\"custom-table-data__info\">\n" +
            "                                            <h6 class=\"hoverName\">lori lynch</h6>\n" +
            "                                        </div>\n" +
            "                                    </td>\n" +
            "                                    <td><button type=\"button\" class=\"btn btn-outline-link\" data-toggle=\"modal\"" +
            "                                        data-target=\"#largeModal\"><i class=\"fa fa-users\"></i></button></td>" +
            "                                </tr>";

        $(".authClass").append(str3).trigger("create");

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

    //전체 선택 해제
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


});

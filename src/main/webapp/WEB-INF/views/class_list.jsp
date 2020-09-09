<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!-- animsition overrides all click events on clickable things like a,
since calendar doesn't add href's be default,
it leads to odd behaviors like loading 'undefined'
moving the class to menus lead to only the menu having the effect -->
<!-- MAIN CONTENT-->
<script src="vendor/jquery-3.2.1.min.js"></script>
<script>
    $(function () {
        $('head').append('<link rel="stylesheet" href="css/setting_class_list.css" type="text/css" />');

        $.ajax({
            url: "/findClassList", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                $.each(result, function (index, item) {
                    var number = index + 1;
                    if(number > 8){
                        number = number - 8;
                    }

                    var str = "<div class=\"col-sm-6 col-lg-4 mb-4 mb-lg-0\">\n" +
                        "                            <div class=\"categories_post\">\n" +
                        "                                <img class=\"card-img rounded-0\" src=\"images/cat-post/"+number+".jpg\" alt=\"post\">\n" +
                        "                                <div onclick=\"location.href=\'class?idx="+item.classIdx+"\'\" class=\"categories_details\">\n" +
                        "                                    <div class=\"categories_text\">\n" +
                        "                                        <a>\n" +
                        "                                            <h5>"+item.className+"</h5>\n" +
                        "                                        </a>\n" +
                        "                                        <div class=\"border_line\"></div>\n" +
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                        </div>";

                    $(".wrap .row").append(str).trigger("create");

                });
            }, //성공했을때
            error: function (request) {
                alert(request.responseText);
            }
        });// 실패했을때


    });
</script>
<div class="main-content">
    <div class="section__content section__content--p30">
        <div class="container-fluid">
            <div class="centerer">
                <div style="margin-bottom: 0px;margin-right: 200px;" class="table-data__tool">
                    <h3 class="title-5 m-b-35" style="white-space: nowrap;margin-bottom: 0px;">Class List</h3>
                </div>
                <div class="wrap">
                    <div style="margin-left: 25px;" class="row">

                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="copyright">
                        <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="#">Colorlib</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


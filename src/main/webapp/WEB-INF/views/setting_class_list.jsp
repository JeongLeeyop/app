<%@ page import="com.example.app.model.domain.Account" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!-- animsition overrides all click events on clickable things like a,
since calendar doesn't add href's be default,
it leads to odd behaviors like loading 'undefined'
moving the class to menus lead to only the menu having the effect -->
<!-- MAIN CONTENT-->
<script src="vendor/jquery-3.2.1.min.js"></script>
<script>
    function ClassPage2(classId){
        var authClassIdx = classId;

        document.write('<form action="setting_class" id="smb_form" method="post"><input type="hidden" id="authClassIdx" name="authClassIdx" value="'+ authClassIdx +'"></form>');
        document.getElementById("smb_form").submit();
    }

    $(function () {
        $('head').append('<link rel="stylesheet" href="css/class_list.css" type="text/css" />');

        //시즌 전역변수 저장
        var curSeasonIdx = sessionStorage.getItem("curSeasonIdx");

        //클래스 목록 출력
        $.ajax({
            url: "/admin/findAuthClassList2", //서버요청주소
            type: "post",//요청방식 (get,post,patch,delete,put)
            data: "curSeasonIdx="+curSeasonIdx+"&orderBy="+0,
            dataType: "json",//서버가 보내온 데이터 타입 (text, html, xml, json)
            success: function (result) {
                console.log(result);
                $.each(result, function (index, item) {
                    var number = index + 1;
                    if(number > 8){
                        number = number - 8;
                    }
                    var str = "<div class=\"col-sm-6 col-lg-4 mb-4 mb-lg-0\">\n" +
                        "                            <div class=\"categories_post\">\n" +
                        "                                <img class=\"card-img rounded-0\" src=\"images/cat-post/"+number+".jpg\" alt=\"post\">\n" +
                        "                                <div href=\"#\" onclick=\"ClassPage2("+item.authClassIdx+");\" class=\"categories_details\">\n" +
                        "                                    <div class=\"categories_text\">\n" +
                        "                                        <a>\n" +
                        "                                            <h5>"+item._class.className+"</h5>\n" +
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

/*
        //클래스 생성
        $("#class-add").on("click",function () {

            var className =  $("#text-input").val();
            if(className==""){
                alert("Please enter class name");
                return false;
            }
            var sectionName = "";

            // alert(className);

            $.ajax({
                url : "/updateClass", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                data : "className="+className+"&sectionName="+sectionName,
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result){
                    alert("The class has been created.");
                    location.reload();
                } , //성공했을때
                error : function(request){
                    alert(request.responseText);
                }// 실패했을때
            });

        });
*/


    });
</script>
<div class="main-content">
    <div class="section__content section__content--p30">
        <div class="container-fluid">
            <div class="centerer">
                <div style="margin-bottom: 0px;" class="table-data__tool">
                    <h3 class="title-5 m-b-35" style="white-space: nowrap;margin-bottom: 0px;">Class Setting</h3>
                    <div class="table-data__tool-right">
                        <button type="button" class="btn btn-secondary" style="float: right;height: 40px;" onclick="location.href='setting'">Go back</button>
                        <%--<button type="bFutton" class="au-btn au-btn-icon au-btn--green au-btn--small" data-toggle="modal" data-target="#mediumModal">
                            <i class="zmdi zmdi-plus"></i>add Class
                        </button>--%>

                    </div>
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
<div class="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
    <div  style="max-width:600px;" class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="mediumModalLabel">Add Class</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row form-group">
                    <div class="col col-md-3">
                        <label for="text-input" class=" form-control-label">Class Name</label>
                    </div>
                    <div class="col-12 col-md-9">
                        <input type="text" id="text-input" name="text-input" placeholder="Text" class="form-control">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button"  data-toggle="modal" data-target="#mediumModal" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" id="class-add" class="btn btn-primary" data-dismiss="modal">Confirm</button>
            </div>
        </div>
    </div>
</div>



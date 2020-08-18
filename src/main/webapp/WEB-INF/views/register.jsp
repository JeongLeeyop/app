<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"; charset=utf-8;>
    <meta name="description" content="au theme template";charset=utf-8;>
    <meta name="author" content="Hau Nguyen";charset=utf-8;>
    <meta name="keywords" content="au theme template";charset=utf-8;>

    <!-- Title Page-->
    <title>Register</title>

    <!-- Fontfaces CSS-->
    <link href="css/font-face.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all">
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">

    <!-- Bootstrap CSS-->
    <link href="vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">

    <!-- Vendor CSS-->
    <link href="vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
    <link href="vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all">
    <link href="vendor/wow/animate.css" rel="stylesheet" media="all">
    <link href="vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
    <link href="vendor/slick/slick.css" rel="stylesheet" media="all">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <link href="vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">

    <!-- Main CSS-->
    <link href="css/theme.css" rel="stylesheet" media="all">

    <script src="vendor/jquery-3.2.1.min.js"></script>

    <!--register -->
    <script>



        function checkValid(){

            if($("#username").val()==""){
                alert("Please enter your name.");
                $("#username").focus();
                return false;
            }
            if($("#email").val()==""){
                alert("Please enter your email.");
                $("#email").focus();
                return false;
            }
            if($("#span").text()=="This email is already in use."){
                alert("Please change your email.");
                $("#email").focus();
                return false;
            }
            if($("#password").val()==""){
                alert("Please enter your password.");
                $("#password").focus();
                return false;
            }
            if($("#password").val()!=$("#password2").val()){
                alert("Passwords do not match.");
                $("#password").val("");
                $("#password2").val("");
                $("#password").focus();
                return false;
            }

        }

        $(function() {

            //이메일 중복 체크
            $("#email").keyup(function () {
                if ($(this).val() == "") {
                    $("#span").text("   ");
                    return;
                }
                $.ajax({
                    type: "post",
                    url: "emailCheck",
                    dataType: "text",//서버에게 받은 응답결과 type(text, xml, html, json)
                    data: {memberEmail: $(this).val()},//서버에게 전송할 parameter
                    success: function (result) {
                        $("#span").html(result);
                    },
                    error : function(err) {
                        console.log(err + "=> find error");
                    }
                });//ajax끝
            });//keyup끝

        });

    </script>

</head>

<body class="animsition">
<div class="page-wrapper">
    <div class="page-content--bge5">
        <div class="container">
            <div class="login-wrap">
                <div class="login-content">
                    <div class="login-logo">
                        <a href="#">
                            <img style="max-width: 50%;margin-bottom: 30px;" src="images/icon/logo.png" alt="CoolAdmin">
                        </a>
                    </div>
                    <div class="login-form">
                        <form action="signUp" method="post" onSubmit="return checkValid()">
                            <div class="form-group">
                                <label>Username</label>
                                <input class="au-input au-input--full" type="text" name="username" id="username" placeholder="Username">
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input class="au-input au-input--full" type="email" name="email" id="email" placeholder="Email">
                                <span id="span">Check for email duplication</span>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input class="au-input au-input--full" type="password" name="password" id="password" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <label>Password Check</label>
                                <input class="au-input au-input--full" type="password" name="password2" id="password2" placeholder="Password">
                            </div>
                            <%--<div class="login-checkbox">
                                <label>
                                    <input type="checkbox" name="agree">Agree the terms and policy
                                </label>
                            </div>--%>
                            <button class="au-btn au-btn--block au-btn--green m-b-20" type="submit">register</button>
                        </form>
                        <div class="register-link">
                            <p>
                                Already have account?
                                <a href="login">Sign In</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<!-- Jquery JS-->
<script src="vendor/jquery-3.2.1.min.js"></script>
<!-- Bootstrap JS-->
<script src="vendor/bootstrap-4.1/popper.min.js"></script>
<script src="vendor/bootstrap-4.1/bootstrap.min.js"></script>
<!-- Vendor JS       -->
<script src="vendor/slick/slick.min.js">
</script>
<script src="vendor/wow/wow.min.js"></script>
<script src="vendor/animsition/animsition.min.js"></script>
<script src="vendor/bootstrap-progressbar/bootstrap-progressbar.min.js">
</script>
<script src="vendor/counter-up/jquery.waypoints.min.js"></script>
<script src="vendor/counter-up/jquery.counterup.min.js">
</script>
<script src="vendor/circle-progress/circle-progress.min.js"></script>
<script src="vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
<script src="vendor/chartjs/Chart.bundle.min.js"></script>
<script src="vendor/select2/select2.min.js">
</script>

<!-- Main JS-->
<script src="js/main.js"></script>

</body>

</html>
<!-- end document-->

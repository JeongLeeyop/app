<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="au theme template">
    <meta name="author" content="Hau Nguyen">
    <meta name="keywords" content="au theme template">

    <!-- Title Page-->
    <title>Login</title>

    <!-- Fontfaces CSS-->
    <link href="/css/font-face.css" rel="stylesheet" media="all">
    <link href="/vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link href="/vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all">
    <link href="/vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">

    <!-- Bootstrap CSS-->
    <link href="/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">

    <!-- Vendor CSS-->
    <link href="/vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
    <link href="/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all">
    <link href="/vendor/wow/animate.css" rel="stylesheet" media="all">
    <link href="/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
    <link href="/vendor/slick/slick.css" rel="stylesheet" media="all">
    <link href="/vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <link href="/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">

    <!-- Main CSS-->
    <link href="/css/theme.css" rel="stylesheet" media="all">

    <script src="vendor/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="js/cookieFunction.js"></script>
    <script>

        function checkValid(){
            if($("input[name=email]").val()==""){
                alert("Check your Email.");
                $("input[name=email]").focus();
                return false;
            }
            if($("input[name=password]").val()==""){
                alert("Check your PassWord.");
                $("input[name=password]").focus();
                return false;
            }
        }

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
                                <img src="/images/icon/logo.png" alt="CoolAdmin"style="max-width: 50%;margin-bottom: 30px;">
                            </a>
                        </div>
                        <div class="login-form">
                            <form action="signIn" method="post" onSubmit="return checkValid()">
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input class="au-input au-input--full" type="email" name="email" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input class="au-input au-input--full" type="password" name="password" placeholder="Password">
                                </div>

                                <div class="login-checkbox">
                                    <label>
                                        <input id="idSaveCheck" type="checkbox" name="remember">Remember Me
                                    </label>
                                    <%--<label>
                                        <a href="#">Forgotten Password?</a>
                                    </label>--%>
                                </div>
                                <button class="au-btn au-btn--block au-btn--green m-b-20" type="submit" id="signIn">sign in</button>
                               <%-- <div class="social-login-content">
                                    <div class="social-button">
                                        <button class="au-btn au-btn--block au-btn--blue m-b-20">sign in with facebook</button>
                                        <button class="au-btn au-btn--block au-btn--blue2">sign in with twitter</button>
                                    </div>
                                </div>--%>
                            </form>
<%--                            <div class="register-link">
                                <p>
                                    Don't you have account?
                                    <a href="register">Sign Up Here</a>
                                </p>
                            </div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <script src="/vendor/jquery-3.2.1.min.js"></script>

    <script>
       /* $(function(){


        $("#signIn").on('click',function(){

            var email = $("input[name=email]").val();
            var password = $("input[name=password]").val();
            $.ajax({
                url : "/signIn", //서버요청주소
                type : "post",//요청방식 (get,post,patch,delete,put)
                data : "email="+email+"&password="+password,
                dataType : "text",//서버가 보내온 데이터 타입 (text, html, xml, json)
                success : function(result) {
                        if(result==0){
                            alert("로그인에 성공하셨습니다.");
                            location.href("redirect:attendance");
                        }else if(result=="1"){
                            alert("로그인에 실패하셨습니다.");
                            location.href("redirect:login");

                        }
                }, //성공했을때
                error : function(request) {
                    alert(request.responseText);
                }
            });// 실패했을때
            })

        })
*/

    </script>

    </script>
    <!-- Jquery JS-->

    <!-- Bootstrap JS-->
    <script src="/vendor/bootstrap-4.1/popper.min.js"></script>
    <script src="/vendor/bootstrap-4.1/bootstrap.min.js"></script>
    <!-- Vendor JS       -->
    <script src="/vendor/slick/slick.min.js">
    </script>
    <script src="/vendor/wow/wow.min.js"></script>
    <script src="/vendor/animsition/animsition.min.js"></script>
    <script src="/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js">
    </script>
    <script src="/vendor/counter-up/jquery.waypoints.min.js"></script>
    <script src="/vendor/counter-up/jquery.counterup.min.js">
    </script>
    <script src="/vendor/circle-progress/circle-progress.min.js"></script>
    <script src="/vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="/vendor/chartjs/Chart.bundle.min.js"></script>
    <script src="/vendor/select2/select2.min.js">
    </script>

    <!-- Main JS-->
    <script src="/js/main.js" ></script>



</body>

</html>
<!-- end document-->

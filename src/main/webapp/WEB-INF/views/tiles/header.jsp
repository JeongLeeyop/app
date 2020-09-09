<!-- HEADER MOBILE-->
<header class="header-mobile d-block d-lg-none">
    <div class="header-mobile__bar">
        <div class="container-fluid">
            <div class="header-mobile-inner">
                <a class="logo" href="attendance">
                    <img src="images/icon/logo.png" alt="CoolAdmin" style="max-width: 25%;margin-top: 15px;"/>
                </a>
                <button class="hamburger hamburger--slider" type="button">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                </button>
            </div>
        </div>
    </div>
    <nav class="navbar-mobile">
        <div class="container-fluid">
            <ul class="navbar-mobile__list list-unstyled">
                <li>
                    <a href="attendance">
                        <i class="fas fa-calendar"></i>Attendance</a>
                </li>
<%--                <li>
                    <a href="class_list">
                        <i class="fas fa-table"></i>Class</a>
                </li>--%>
                <li>
                    <a href="class_list">
                        <i class="fas fas fa-table"></i>Class &nbsp; <i class="js-arrow fas fa-caret-down"
                                                                        style="width: 50px;height: 20px;"></i>
                        <ul id="classListMobile" style="padding-top: 10px;"
                            class="list-unstyled navbar__sub-list js-sub-list">
                        </ul>
                    </a>
                </li>
                <li>
                    <a href="student">
                        <i class="fas fa-chart-bar"></i>Student</a>
                </li>

                <li>
                    <a href="setting">
                        <i class="fa fa-cog"></i>Setting</a>
                </li>
                <li>
                    <a href="reportcard">
                        <i class="fas fa-star" style="margin-right: 17px;"></i>Report Card</a>
                </li>
            </ul>
        </div>
    </nav>
</header>
<!-- END HEADER MOBILE-->

<!-- MENU SIDEBAR-->
<aside class="menu-sidebar d-none d-lg-block">


    <div class="logo">
        <a href="attendance">
            <img src="images/icon/logo.png" alt="Cool Admin" style="max-width:80%;margin-left: 15px;"/>
        </a>
    </div>


    <%--<div class="setting-menu js-right-sidebar d-none d-lg-block show-sidebar">
        <div class="account-dropdown__body">
            <div class="account-dropdown__item">
                <a href="#">
                    <i class="zmdi zmdi-account"></i>Account</a>
            </div>
            <div class="account-dropdown__item">
                <a href="#">
                    <i class="zmdi zmdi-settings"></i>Setting</a>
            </div>
            <div class="account-dropdown__item">
                <a href="#">
                    <i class="zmdi zmdi-money-box"></i>Billing</a>
            </div>
        </div>
        <div class="account-dropdown__body">
            <div class="account-dropdown__item">
                <a href="#">
                    <i class="zmdi zmdi-globe"></i>Language</a>
            </div>
            <div class="account-dropdown__item">
                <a href="#">
                    <i class="zmdi zmdi-pin"></i>Location</a>
            </div>
            <div class="account-dropdown__item">
                <a href="#">
                    <i class="zmdi zmdi-email"></i>Email</a>
            </div>
            <div class="account-dropdown__item">
                <a href="#">
                    <i class="zmdi zmdi-notifications"></i>Notifications</a>
            </div>
        </div>
    </div>--%>

    <div class="setting-menu js-right-sidebar d-none d-lg-block show-sidebar">
        <nav class="navbar-sidebar">
            <ul class="list-unstyled navbar__list">
                <%--<li class="active has-sub">--%>

                <li>
                    <a href="attendance">
                        <i class="fas fa-calendar"></i>Attendance</a>
                </li>
                <li>

                    <%--   <li>
                           <a href="class">
                               <i class="fas fa-tags"></i>Class</a>
                       </li>--%>
                <li>
                    <a href="class_list">
                        <i class="fas fas fa-table"></i>Class &nbsp; <i class="js-arrow fas fa-caret-down"
                                                                        style="width: 50px;height: 20px;"></i>
                        <ul id="classList" style="padding-top: 10px;"
                            class="list-unstyled navbar__sub-list js-sub-list">
                        </ul>
                    </a>
                </li>
                <li>
                    <a href="student">
                        <i class="fas fa-chart-bar"></i>Student</a>
                </li>
                <li>
                    <a href="setting">
                        <i class="fa fa-cog"></i>Setting</a>
                </li>
                <li>
                    <a href="reportcard">
                        <i style="margin-right: 17px;" class="fas fa-star"></i>Report Card</a>
                </li>
            </ul>
        </nav>
    </div>
</aside>
<!-- END MENU SIDEBAR-->

<!-- PAGE CONTAINER-->
<div class="page-container">
    <!-- HEADER DESKTOP-->
    <header class="header-desktop">
        <div class="section__content section__content--p30">


            <div class="container-fluid">

                <div class="header-button-item mr-0 js-sidebar-btn" style="position: absolute;top: 7px;color: #000;">
                    <i class="zmdi zmdi-menu"></i>
                </div>

                <div class="header-wrap">
                    <form class="form-header" action="" method="POST">
                    </form>
                    <div class="header-button">
                        <div class="noti-wrap">
                        </div>
                        <div class="account-wrap">
                            <div class="account-item clearfix js-item-menu">
                                <div class="image">
                                    <img src="images/icon/avatar-01.png" alt="${Account.userName}"/>
                                </div>
                                <div class="content">
                                    <a class="js-acc-btn" href="#">${Account.userName}</a>
                                </div>
                                <div class="account-dropdown js-dropdown">
                                    <div class="info clearfix">
                                        <div class="image">
                                            <a href="#">
                                                <img src="images/icon/avatar-01.png" alt="${Account.userName}"/>
                                            </a>
                                        </div>
                                        <div class="content">
                                            <h5 class="name">
                                                <a href="#">${Account.userName}</a>
                                            </h5>
                                            <span class="email">${Account.userEmail}</span>
                                        </div>
                                    </div>
                                    <div class="account-dropdown__footer">
                                        <a id="logout"><i class="zmdi zmdi-power"></i>Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- HEADER DESKTOP-->


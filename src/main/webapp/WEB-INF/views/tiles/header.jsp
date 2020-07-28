    <!-- HEADER MOBILE-->
    <header class="header-mobile d-block d-lg-none">
        <div class="header-mobile__bar">
            <div class="container-fluid">
                <div class="header-mobile-inner">
                    <a class="logo" href="student">
                        <img src="images/icon/logo.png" alt="CoolAdmin" />
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
                        <a href="student">
                            <i class="fas fa-chart-bar"></i>Student</a>
                    </li>
                    <li>
                        <a href="attendance">
                            <i class="fas fa-table"></i>Attendance</a>
                    </li>
                    <li class="has-sub">
                        <a class="js-arrow" href="#">
                            <i class="fas fa-tachometer-alt"></i>Class</a>
                        <ul class="navbar-mobile-sub__list list-unstyled js-sub-list">
                            <li>
                                <a href="class">Class 1</a>
                            </li>
                            <li>
                                <a href="class">Class 2</a>
                            </li>
                            <li>
                                <a href="class">Class 3</a>
                            </li>
                            <li>
                                <a href="class">Class 4</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="setting">
                            <i class="far fa-check-square"></i>Setting</a>
                    </li>
                    <li>
                        <a href="reportcard">
                            <i class="fas fa-calendar-alt"></i>Report Card</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- END HEADER MOBILE-->

    <!-- MENU SIDEBAR-->
    <aside class="menu-sidebar d-none d-lg-block">
        <div class="logo">
            <a href="student">
                <img src="images/icon/logo.png" alt="Cool Admin" />
            </a>
        </div>
        <div class="menu-sidebar__content js-scrollbar1">
            <nav class="navbar-sidebar">
                <ul class="list-unstyled navbar__list">
                    <%--<li class="active has-sub">--%>
                    <li>
                        <a href="student">
                            <i class="fas fa-chart-bar"></i>Student</a>
                    </li>
                    <li>
                        <a href="attendance">
                            <i class="fas fa-table"></i>Attendance</a>
                    </li>
                    <li>
                        <a class="js-arrow" href="#">
                            <i class="fas fa-tachometer-alt"></i>Class</a>
                        <ul class="list-unstyled navbar__sub-list js-sub-list">
                            <li>
                                <a href="class">Class 1</a>
                            </li>
                            <li>
                                <a href="class">Class 2</a>
                            </li>
                            <li>
                                <a href="class">Class 3</a>
                            </li>
                            <li>
                                <a href="class">Class 4</a>
                            </li>
                        </ul>
                    </li>


                    <li>
                        <a href="setting">
                            <i class="far fa-check-square"></i>Setting</a>
                    </li>
                    <li>
                        <a href="reportcard">
                            <i class="fas fa-calendar-alt"></i>Report Card</a>
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
                    <div class="header-wrap">
                        <form class="form-header" action="" method="POST">
                        </form>
                        <div class="header-button">
                            <div class="noti-wrap">
                            </div>
                            <div class="account-wrap">
                                <div class="account-item clearfix js-item-menu">
                                    <div class="image">
                                        <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                    </div>
                                    <div class="content">
                                        <a class="js-acc-btn" href="#">john doe</a>
                                    </div>
                                    <div class="account-dropdown js-dropdown">
                                        <div class="info clearfix">
                                            <div class="image">
                                                <a href="#">
                                                    <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                                </a>
                                            </div>
                                            <div class="content">
                                                <h5 class="name">
                                                    <a href="#">john doe</a>
                                                </h5>
                                                <span class="email">johndoe@example.com</span>
                                            </div>
                                        </div>
                                        <div class="account-dropdown__footer">
                                            <a href="login">
                                                <i class="zmdi zmdi-power"></i>Logout</a>
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


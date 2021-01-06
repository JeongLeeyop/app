<!-- HEADER MOBILE-->

<header class="header-mobile d-block d-lg-none">
    <div class="header-mobile__bar">
        <div class="container-fluid">
            <div class="header-mobile-inner">
                <a class="logo" href="/admin">
                    <img src="/images/icon/logo.png" alt="CoolAdmin" style="max-width: 25%;margin-top: 15px;"/>
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
                    <a href="/admin"><i class="fa fa-gears"></i>Admin</a>
                </li>

            </ul>
        </div>
    </nav>
</header>
<!-- END HEADER MOBILE-->

<!-- MENU SIDEBAR-->
<aside class="menu-sidebar d-none d-lg-block">


    <div class="logo">
        <a href="/admin">
            <img src="/images/icon/logo.png" alt="Cool Admin" style="max-width:80%;margin-left: 15px;"/>
        </a>
    </div>



    <div class="setting-menu js-right-sidebar d-none d-lg-block show-sidebar">
        <nav class="navbar-sidebar">
            <ul class="list-unstyled navbar__list">
                <li>
                    <a href="/admin">
                        <i class="fa fa-gears"></i>Admin</a>
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
                                    <img src="/images/icon/avatar-01.png" alt="${Account.userName}"/>
                                </div>
                                <div class="content">
                                    <a class="js-acc-btn" href="#">${Account.userName}</a>
                                </div>
                                <div class="account-dropdown js-dropdown">
                                    <div class="info clearfix">
                                        <div class="image">
                                            <a href="#">
                                                <img src="/images/icon/avatar-01.png" alt="${Account.userName}"/>
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


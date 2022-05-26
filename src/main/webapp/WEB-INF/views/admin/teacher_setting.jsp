<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<!-- animsition overrides all click events on clickable things like a,
since calendar doesn't add href's be default,
it leads to odd behaviors like loading 'undefined'
moving the class to menus lead to only the menu having the effect -->
<!-- MAIN CONTENT-->

<div class="main-content">
    <div class="section__content section__content--p30">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <!-- DATA TABLE -->
                    <h3 class="title-5 m-b-35">data table</h3>
                    <div class="table-data__tool">
                        <div class="table-data__tool-left">

                            <div class="rs-select2--light rs-select2--md">
                                <select class="js-select2 teacher-order-by" name="property">
                                    <option selected="selected">By Index</option>
                                    <option value="">By Name</option>
                                </select>
                                <div class="dropDownSelect2"></div>
                            </div>
                            <button class="au-btn-filter">
                                <i class="zmdi zmdi-filter-list"></i>filters
                            </button>
                            <div class="rs-select2--light rs-select2--sm">
                                <%--  <select class="js-select2" name="time">
                                      <option selected="selected">By Name</option>
                                      <option value="">By Grade</option>
                                  </select>--%>
                                <div class="dropDownSelect2"></div>
                            </div>

                        </div>
                        <div class="table-data__tool-right">

                            <%--<button class="au-btn au-btn-icon au-btn--green au-btn--small">
                                <i class="zmdi zmdi-plus"></i>add Season</button>--%>

                            <%--<div class="rs-select2--dark rs-select2--sm rs-select2--dark2">
                                <select class="js-select2" name="type">
                                    <option selected="selected">Season 1</option>
                                    <option value="">Season 2</option>
                                    <option value="">Season 3</option>
                                </select>
                                <div class="dropDownSelect2"></div>
                            </div>--%>
                        </div>

                    </div>
                    <div class="table-responsive table-responsive-data2">
                        <table class="table table-data2">
                            <thead>
                            <tr>
                                <td></td>
                                <th style="width: 150px;">name</th>
                                <th>email</th>
                                <%--<th>Grade</th>--%>
                                <th>Student</th>
                                <th>Course</th>
                            </tr>
                            </thead>
                            <tbody class="teacherList">
                            </tbody>
                        </table>
                    </div>
                    <!-- END DATA TABLE -->
                </div>
            </div>
            <button type="button" class="btn btn-secondary btn-lg"
                    style="margin-top:25px;margin-right: 25px; float: right;" onclick="location.href='/admin'">Go back
            </button>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="copyright">
                    <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<div class="modal fade" id="largeModal" tabindex="-1" role="dialog" aria-labelledby="largeModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document" style="max-width: 915px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="largeModalLabel">Large Modal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <div class="row activeDiv">
                    <div class="col-lg-6 custom-col-lg-6">
                        <!-- USER DATA-->
                        <div class="user-data custom-user-data m-b-30">
                            <div class="filters m-b-25" style="padding-right: 0px;">
                                <div hidden class="authClassIdx"></div>
                                <h3 style="display: contents;" class="title-3 m-b-30"><i style="padding-bottom: 0px;"
                                                                                         class="zmdi zmdi-account-calendar"></i>Auth
                                    Student</h3>
                                <div class="rs-select2--dark rs-select2--md m-r-10 rs-select2--border"
                                     style="width: 112px;float: right;">
                                    <select class="js-select2 auth-student-order-by2" name="property">
                                        <option selected="selected" value="0">By Index</option>
                                        <option value="2">By Name</option>
                                        <option value="1">By Grade</option>
                                    </select>
                                    <div class="dropDownSelect2"></div>
                                </div>
                            </div>
                            <div class="table-responsive custom-table-data">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <td>
                                            <label class="au-checkbox">
                                                <input type="checkbox" class="allCheck">
                                                <span class="au-checkmark"></span>
                                            </label>
                                        </td>
                                        <td>name</td>
                                        <td>Gender</td>
                                        <td>Grade</td>
                                    </tr>
                                    </thead>
                                    <tbody class="authStudentList2">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- END USER DATA-->
                    </div>

                    <div class="arrow">
                        <button class="au-btn au-btn-icon au-btn-load au-btn--small arrow-right2">
                            >
                        </button>
                        <button class="au-btn au-btn-icon au-btn-load au-btn--small arrow-left2">
                            <
                        </button>
                    </div>
                    <div class="col-lg-6 custom-col-lg-6">
                        <!-- USER DATA-->
                        <div class="user-data custom-user-data m-b-30">
                            <div class="filters m-b-25" style="padding-right: 0px;">
                                <h3 style="display: contents;" class="title-3 m-b-30"><i style="padding-bottom: 10px;"class="zmdi zmdi-account-calendar">
                                </i>Class Members</h3>
                                <div class="rs-select2--dark rs-select2--md m-r-10 rs-select2--border" style="width: 112px;float: right;">
                                    <select class="js-select2 class-members-order-by" name="property">
                                        <option selected="selected" value="0">By Index</option>
                                        <option value="2">By Name</option>
                                        <option value="1">By Grade</option>
                                    </select>
                                    <div class="dropDownSelect2"></div>
                                </div>
                            </div>
                            <div class="table-responsive custom-table-data">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <td>
                                            <label class="au-checkbox">
                                                <input type="checkbox" class="allCheck">
                                                <span class="au-checkmark"></span>
                                            </label>
                                        </td>
                                        <td>name</td>
                                        <td>Gender</td>
                                        <td>Grade</td>
                                    </tr>
                                    </thead>
                                    <tbody class="classMembersList">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <%--<button type="button" class="btn btn-primary">Confirm</button>--%>
            </div>
        </div>
    </div>
</div>

<script src="/vendor/jquery-3.2.1.min.js"></script>
<script src="/vendor/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/Page/admin/teacher_setting.js"></script>
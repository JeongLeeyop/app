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
                <div class="col-lg-6">
                    <!-- USER DATA-->
                    <div class="user-data m-b-30">
                        <h3 class="title-3 m-b-30">
                            <i class="zmdi zmdi-account-calendar"></i>Class</h3>
                        <div class="filters m-b-25">
                            <div class="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
                                <select class="js-select2" name="property">
                                    <option selected="selected">Named</option>
                                    <option value="">Grade</option>
                                </select>
                                <div class="dropDownSelect2"></div>
                            </div>
                            <%--                            <div class="rs-select2--dark rs-select2--sm rs-select2--border">
                                                            <select class="js-select2 au-select-dark" name="time">
                                                                <option selected="selected">All Time</option>
                                                                <option value="">By Month</option>
                                                                <option value="">By Day</option>
                                                            </select>
                                                            <div class="dropDownSelect2"></div>
                                                        </div>--%>
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
                                    <td>Grade</td>
                                    <%--<td>Teacher</td>--%>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <label class="au-checkbox">
                                            <input type="checkbox">
                                            <span class="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <div class="custom-table-data__info">
                                            <h6 class="hoverName">Class1</h6>
                                        </div>
                                    </td>
                                    <td class="multiple-select2-td level1">
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-multiple-select2">
                                            <select class="js-select2" multiple="multiple" name="property">
                                                <option value="">All</option>
                                                <option value="" selected="selected">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                                <option value="">6</option>
                                                <option value="">Any</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>
                                    <%--                                                <td>
                                                                                        <div class="rs-select2--trans rs-select2--sm">
                                                                                            <select class="js-select2 js-example-placeholder-multiple" multiple="multiple">
                                                                                                <option>1</option>
                                                                                                <option>2</option>
                                                                                                <option>3</option>
                                                                                                <option>4</option>
                                                                                                <option>5</option>
                                                                                                <option>6</option>
                                                                                                <option>전과목</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </td>--%>
                                </tr>
                                <tr>
                                    <td>
                                        <label class="au-checkbox">
                                            <input type="checkbox">
                                            <span class="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <div class="custom-table-data__info">
                                            <h6 class="hoverName">Class1</h6>
                                        </div>
                                    </td>
                                    <td class="multiple-select2-td level1">
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-multiple-select2">
                                            <select class="js-select2" multiple="multiple" name="property">
                                                <option value="">All</option>
                                                <option value="" selected="selected">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                                <option value="">6</option>
                                                <option value="">Any</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <label class="au-checkbox">
                                            <input type="checkbox">
                                            <span class="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <div class="custom-table-data__info">
                                            <h6 class="hoverName">Class1</h6>
                                        </div>
                                    </td>
                                    <td class="multiple-select2-td level1">
<%--                                    <td>--%>
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-multiple-select2">
                                            <select class="js-select2" multiple="multiple" name="property">
                                                <option value="">All</option>
                                                <option value="" selected="selected">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                                <option value="">6</option>
                                                <option value="">Any</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="user-data__footer">
                            <button type="button" class="btn btn-success" data-toggle="modal"
                                    data-target="#mediumModal">
                                <i class="zmdi zmdi-plus"></i> Add Class
                            </button>
                            <button type="button" class="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                    <!-- END USER DATA-->
                </div>
                <div class="col-lg-6">
                    <!-- USER DATA-->
                    <div class="user-data m-b-30">
                        <h3 class="title-3 m-b-30">
                            <i class="zmdi zmdi-account-calendar"></i>Student</h3>
                        <div class="filters m-b-25">
                            <div class="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
                                <select class="js-select2" name="property">
                                    <option selected="selected">Named</option>
                                    <option value="">Grade</option>
                                </select>
                                <div class="dropDownSelect2"></div>
                            </div>
                            <%--<div class="rs-select2--dark rs-select2--sm rs-select2--border">
                                <select class="js-select2 au-select-dark" name="time">
                                    <option selected="selected">All Time</option>
                                    <option value="">By Month</option>
                                    <option value="">By Day</option>
                                </select>
                                <div class="dropDownSelect2"></div>
                            </div>--%>
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
                                <tbody>
                                <tr>
                                    <td>
                                        <label class="au-checkbox">
                                            <input type="checkbox">
                                            <span class="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <div class="custom-table-data__info">
                                            <h6 class="hoverName">lori lynch</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-select2">
                                            <select class="js-select2" name="property">
                                                <option value="" selected="selected">Male</option>
                                                <option value="">Female</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>
                                    <td class="custom-td">
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-select2">
                                            <select class="js-select2" name="property">
                                                <option value="" selected="selected">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                                <option value="">6</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <label class="au-checkbox">
                                            <input type="checkbox">
                                            <span class="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <div class="custom-table-data__info">
                                            <h6 class="hoverName">lori lynch</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-select2">
                                            <select class="js-select2" name="property">
                                                <option value="" selected="selected">Male</option>
                                                <option value="">Female</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>
                                    <td class="custom-td">
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-select2">
                                            <select class="js-select2" name="property">
                                                <option value="" selected="selected">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                                <option value="">6</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <label class="au-checkbox">
                                            <input type="checkbox">
                                            <span class="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <div class="custom-table-data__info">
                                            <h6 class="hoverName">lori lynch</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-select2">
                                            <select class="js-select2" name="property">
                                                <option value="" selected="selected">Male</option>
                                                <option value="">Female</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>
                                    <td class="custom-td">
                                        <div class="rs-select2--trans rs-select2--sm custom-rs-select2">
                                            <select class="js-select2" name="property">
                                                <option value="" selected="selected">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                                <option value="">6</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="user-data__footer">
                            <button type="button" class="btn btn-success" data-toggle="modal"
                                    data-target="#mediumModal2">
                                <i class="zmdi zmdi-plus"></i> Add Student
                            </button>
                            <button type="button" class="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                    <!-- END USER DATA-->
                </div>
            </div>
            <button type="button" class="btn btn-secondary btn-lg" style="margin-right: 25px; float: right;" onclick="location.href='/admin'">Go back</button>
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
<div class="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="width: 50%;">
            <div class="modal-header">
                <h5 class="modal-title" id="mediumModalLabel">Add Class</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-lg-6" style="max-width: 100%;">
                    <div class="card" style="margin-bottom: 0px;">
                        <div class="card-header">
                            <strong>Class</strong>
                            <small> Form</small>
                        </div>
                        <div class="card-body card-block">
                            <div class="form-group">
                                <label for="taskName" class=" form-control-label">Class name</label>
                                <input type="text" id="taskName" placeholder="Enter your Class name"
                                       class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="gradeRatio" class=" form-control-label">Class Grade</label>
                                <input type="text" id="gradeRatio" placeholder="1" class="form-control">
                                <%--<small class="help-block form-text">Only numbers can be entered; all proportions must be
                                    summed up to 100%.</small>--%>
                            </div>
                            <%--<div class="row form-group">

                                    <div class="form-check">
                                        <div class="checkbox">
                                            <label for="ckDefault" class="form-check-label ">
                                                Default Task Check
                                            </label>
                                            <input type="checkbox" id="ckDefault" name="checkbox1" value="option1" class="form-check-input" style="
                                            margin-left: 5px;">
                                        </div>
                                    </div>
                            </div>--%>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="modal-footer">
                <button id="cancel" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="confirm" data-toggle="modal" data-target="#mediumModal" type="button"
                        class="btn btn-primary">Confirm
                </button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="mediumModal2" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="width: 50%;margin-left: 50%;left: 15%;">
            <div class="modal-header">
                <h5 class="modal-title" id="mediumModalLabel2">Add Student</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">

                <div class="col-lg-6" style="max-width: 100%;">
                    <div class="card" style="margin-bottom: 0px;">
                        <div class="card-header">
                            <strong>Student</strong>
                            <small> Form</small>
                        </div>
                        <div class="card-body card-block">
                            <div class="form-group">
                                <label for="taskName" class=" form-control-label">Student name</label>
                                <input type="text" placeholder="Enter your Student name"
                                       class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="gradeRatio" class=" form-control-label">Class Grade</label>
                                <select class="form-control" name="grade">
                                    <option data-id="1" value="">1</option>
                                    <option data-id="2" value="">2</option>
                                    <option data-id="3" value="">3</option>
                                    <option data-id="4" value="">4</option>
                                    <option data-id="5" value="">5</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class=" form-control-label">Gender</label>
                                <div class="form-check">
                                    <label for="inline-radio1" class="form-check-label "
                                           style="padding-right: 20px;">
                                        <input type="radio" id="inline-radio1" name="inline-radios" value="Male"
                                               class="form-check-input">Male
                                    </label>
                                    <label for="inline-radio2" class="form-check-label ">
                                        <input type="radio" id="inline-radio2" name="inline-radios" value="Female"
                                               class="form-check-input">Female
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="modal-footer">
                <button id="cancel2" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="confirm2" data-toggle="modal" data-target="#mediumModal2" type="button"
                        class="btn btn-primary">Confirm
                </button>
            </div>
        </div>
        <%--<div class="modal-body">

            <div class="col-lg-6" style="max-width: 100%;">
                <div class="card" style="margin-bottom: 0px;">
                    <div class="card-header">
                        <strong>Student</strong>
                        <small> Form</small>
                    </div>
                    <div class="card-body card-block">
                        <div class="form-group">
                            <label for="taskName" class=" form-control-label">Student Name</label>
                            <a id="modalTaskIdx" hidden></a>
                            <input type="text" id="taskName2" placeholder="Enter your Student name"
                                   class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="gradeRatio" class=" form-control-label">Student Grade</label>
                            <input type="text" id="gradeRatio2" placeholder="1" class="form-control">
                            &lt;%&ndash;<small class="help-block form-text">Only numbers can be entered; all proportions must be
                                summed up to 100%.</small>&ndash;%&gt;
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>
    </div>
</div>
</div>
<script src="/vendor/jquery-3.2.1.min.js"></script>
<script src="/vendor/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/Page/admin/season_setting.js"></script>
<%--<script type="text/javascript" src="/js/Page/setting_class.js"></script>--%>
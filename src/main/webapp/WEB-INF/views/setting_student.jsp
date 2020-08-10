<!-- animsition overrides all click events on clickable things like a,
since calendar doesn't add href's be default,
it leads to odd behaviors like loading 'undefined'
moving the class to menus lead to only the menu having the effect -->
<!-- MAIN CONTENT-->
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<div class="main-content">
    <div class="section__content section__content--p30" style="padding-left: 50px;">
        <div class="container-fluid">
            <div class="row" style="padding-left: 30px;">
                <div class="row">
                    <div class="col-md-12">
                        <!-- DATA TABLE -->
                        <div class="table-data__tool">
                            <h3 class="title-5 m-b-35" style="margin-bottom: 0px;">data table</h3>
                            <div class="table-data__tool-left">
                                <div class="rs-select2--light rs-select2--md">
                                    <div class="dropDownSelect2"></div>
                                </div>
                            </div>
                            <div class="table-data__tool-right">

                                <button type="button" class="au-btn au-btn-icon au-btn--green au-btn--small" data-toggle="modal"  data-target="#mediumModal" >
                                    <i class="zmdi zmdi-plus"></i>add item
                                </button>

                            </div>
                        </div>
                        <div class="table-responsive table-responsive-data2">
                            <table class="table table-data2">
                                <thead>
                                <tr>
                                    <th>
                                        <label class="au-checkbox">
                                            <input type="checkbox">
                                            <span class="au-checkmark"></span>
                                        </label>
                                    </th>
                                    <th>name</th>
                                    <th>email</th>
                                    <th>Gender</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody class = "tbody">
                                </tbody>
                            </table>
                        </div>
                        <!-- END DATA TABLE -->
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="copyright">
                        <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="mediumModalLabel">신규 학생 등록</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row form-group">
                    <div class="col col-md-3">
                        <label for="text-input" class=" form-control-label">Name</label>
                    </div>
                    <div class="col-12 col-md-9">
                        <input type="text" id="text-input" name="text-input" placeholder="Text" class="form-control">
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col col-md-3">
                        <label class=" form-control-label">Gender</label>
                    </div>
                    <div class="col col-md-9">
                        <div class="form-check-inline form-check">
                            <label for="inline-radio1" class="form-check-label " style="padding-right: 20px;">
                                <input type="radio" id="inline-radio1" name="inline-radios" value="Male" class="form-check-input">Male
                            </label>
                            <label for="inline-radio2" class="form-check-label ">
                                <input type="radio" id="inline-radio2" name="inline-radios" value="Female" class="form-check-input">Female
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button"  data-toggle="modal" data-target="#mediumModal" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" id="student-add" class="btn btn-primary" data-dismiss="modal">Confirm</button>
            </div>
        </div>
    </div>
</div>
<script src="vendor/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/Page/setting_student.js"></script>


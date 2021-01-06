<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!-- animsition overrides all click events on clickable things like a,
      since calendar doesn't add href's be default,
      it leads to odd behaviors like loading 'undefined'
      moving the class to menus lead to only the menu having the effect -->
            <!-- MAIN CONTENT-->

            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <%--<div class="col-lg-6" style="flex: 0 0 70%;max-width: 30%;">
                                <div class="card">
                                    <div class="card-header">
                                        <strong>Class</strong> List
                                    </div>
                                    <div class="card-body card-block" style="height: 431px;" >
                                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal" style="height: 100%;">
                                            <div class="row form-group" style="height: 87%;">
                                                <div class="col-12 col-md-9">
                                                    <select name="multiple-select" id="multiple-select2" multiple="" class="form-control" style="height: 110%;width: 130%;">

                                                    </select>
                                                </div>

                                            </div>

                                    </div>
                                </div>
                            </div>--%>
                            <div class="col-lg-6" style="flex: 0 0 70%;max-width: 70%;min-width: 450px;">
                                <div class="card">
                                    <div class="card-header">
                                        <strong>Class</strong> Setting
                                    </div>
                                    <div class="card-body card-block">
                                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">

                                            <div class="row form-group">
                                                <div class="col col-md-3">
                                                    <label for="text-input1" class=" form-control-label">Class Name</label>
                                                    <div id="classIdx" hidden>addClass</div>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <input disabled type="text" id="text-input1" name="text-input" placeholder="Text" class="form-control">
                                                </div>
                                            </div>

                                           <%-- <div class="row form-group">

                                                <div class="col col-md-3">
                                                    <label for="select" class=" form-control-label">Section Title</label>
                                                </div>

                                                <div class="col-12 col-md-9">
                                                    <select name="select" id="select" class="form-control">
                                                        <option value="0">Please select</option>
                                                        <option value="1">Chapter</option>
                                                        <option value="2">Week</option>
                                                        <option value="3">Page</option>
                                                    </select>
                                                </div>

                                            </div>--%>

                                            <div class="row form-group">
                                                <div class="col col-md-3">
                                                    <label for="multiple-select" class=" form-control-label">Task Manager</label>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <input type="text" id="text-input2" name="text-input" placeholder="" class="form-control" disabled>
                                                    <a id="taskIdx" hidden></a>
                                                    <select name="multiple-select" id="multiple-select" multiple="" class="form-control" style="height: 320px;display: inline">
                                                        <option disabled>Ratio &nbsp; ||&nbsp;&nbsp;&nbsp; Task Name</option>
                                                        <option disabled>-----------------------------------</option>
                                                    </select>
                                                    <div id="alert" class="col-12 col-md-9" style="margin-top: 5px;">
                                                        <small class="help-block form-text">After class creation, you can register the task.</small>
                                                    <button id ="addTask" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#mediumModal">
                                                        <i class="fa fa-dot-circle-o">Add</i>
                                                    </button>
                                                    <button id ="editTask" type="button" class="btn btn-primary btn-sm">
                                                        <i class="fa fa-dot-circle-o">Edit</i>
                                                    </button>
                                                        <button id ="delTask" type="button" class="btn btn-danger btn-sm">
                                                            <i class="fa fa-ban">Delete</i>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                            <button type="button" id="cancelClass" class="btn btn-secondary" style="float: right;">Go Back</button>
                                            <%--<button type="button" id="delClass" class="btn btn-danger" style="float: right;margin-right: 5px;">Delete</button>
                                            <button type="button" id="addClass" class="btn btn-success" style="float: right;margin-right: 5px;">Save</button>--%>

                                        </form>
                                        <form name="frm" method="POST">
                                            <input type="hidden" name="className" />
                                            <input type="hidden" name="sectionName" />
                                        </form>

                                    </div>

                                </div>
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
        <div class="modal-content" style="width: 50%;">
            <div class="modal-header">
                <h5 class="modal-title" id="mediumModalLabel">Medium Modal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-lg-6" style="max-width: 100%;">
                    <div class="card" style="margin-bottom: 0px;">
                        <div class="card-header">
                            <strong>Task</strong>
                            <small> Form</small>
                        </div>
                        <div class="card-body card-block">
                            <div class="form-group">
                                <label for="taskName" class=" form-control-label">Task name</label>
                                <input type="text" id="taskName" placeholder="Enter your Task name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="gradeRatio" class=" form-control-label">Task Rating Ratio</label>
                                <input type="text" id="gradeRatio" placeholder="0" class="form-control">
                                <small class="help-block form-text">Only numbers can be entered; all proportions must be summed up to 100%.</small>
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
                <button id="confirm" data-toggle="modal" data-target="#mediumModal" type="button" class="btn btn-primary">Confirm</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="mediumModal2" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="width: 50%;">
            <div class="modal-header">
                <h5 class="modal-title" id="mediumModalLabel2">Medium Modal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-lg-6" style="max-width: 100%;">
                    <div class="card" style="margin-bottom: 0px;">
                        <div class="card-header">
                            <strong>Task</strong>
                            <small> Form</small>
                        </div>
                        <div class="card-body card-block">
                            <div class="form-group">
                                <label for="taskName" class=" form-control-label">Task name</label>
                                <a id="modalTaskIdx" hidden></a>
                                <input type="text" id="taskName2" placeholder="Enter your Task name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="gradeRatio" class=" form-control-label">Task Rating Ratio</label>
                                <input type="text" id="gradeRatio2" placeholder="0" class="form-control">
                                <small class="help-block form-text">Only numbers can be entered; all proportions must be summed up to 100%.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="modal-footer">
                <button id="cancel2" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="confirm2" data-toggle="modal" data-target="#mediumModal2" type="button" class="btn btn-primary">Confirm</button>
            </div>
        </div>
    </div>
</div>
<script src="vendor/jquery-3.2.1.min.js"></script>
<script src="vendor/select2/select2.min.js"></script>
<script type="text/javascript" src="js/Page/setting_class.js"></script>
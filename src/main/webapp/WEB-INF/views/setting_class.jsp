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
                            <div class="col-lg-6" style="flex: 0 0 70%;max-width: 30%;">
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
                            </div>
                            <div class="col-lg-6" style="flex: 0 0 70%;max-width: 70%;">
                                <div class="card">
                                    <div class="card-header">
                                        <strong>Class</strong> Setting
                                    </div>
                                    <div class="card-body card-block">
                                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">

                                            <div class="row form-group">
                                                <div class="col col-md-3">
                                                    <label for="text-input1" class=" form-control-label">클래스 명</label>
                                                    <div id="classIdx" hidden>addClass</div>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <input type="text" id="text-input1" name="text-input" placeholder="Text" class="form-control">
                                                </div>
                                            </div>

                                            <div class="row form-group">

                                                <div class="col col-md-3">
                                                    <label for="select" class=" form-control-label">섹션 명</label>
                                                </div>

                                                <div class="col-12 col-md-9">
                                                    <select name="select" id="select" class="form-control">
                                                        <option value="0">Please select</option>
                                                        <option value="1">Chapter</option>
                                                        <option value="2">Week</option>
                                                        <option value="3">Page</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div class="row form-group">
                                                <div class="col col-md-3">
                                                    <label for="multiple-select" class=" form-control-label">과제 등록</label>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <input type="text" id="text-input2" name="text-input" placeholder="Text" class="form-control" disabled>
                                                    <a id="taskIdx" hidden></a>
                                                    <select name="multiple-select" id="multiple-select" multiple="" class="form-control" style="height: 164px;">
                                                    </select>
                                                    <div id="alert" class="col-12 col-md-9" style="margin-top: 5px;">
                                                        <small class="help-block form-text">클래스 생성 후 과제를 등록 할 수 있습니다.</small>
                                                    <button id ="addTask" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#mediumModal">
                                                        <i class="fa fa-dot-circle-o">Add</i>
                                                    </button>
                                                    <button id ="editTask" type="submit" class="btn btn-primary btn-sm">
                                                        <i class="fa fa-dot-circle-o">Edit</i>
                                                    </button>
                                                        <button id ="delTask" type="button" class="btn btn-danger btn-sm">
                                                            <i class="fa fa-ban">Delete</i>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                            <button type="button" class="btn btn-secondary" style="float: right;" onclick="location.href='setting'">Cancel</button>
                                            <button type="button" id="delClass" class="btn btn-danger" style="float: right;margin-right: 5px;">Delete</button>
                                            <button type="button" id="addClass" class="btn btn-success" style="float: right;margin-right: 5px;">Save</button>

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
                                <label for="taskName" class=" form-control-label">과제명</label>
                                <input type="text" id="taskName" placeholder="Enter your Task name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="gradeRatio" class=" form-control-label">과제 등급 비율</label>
                                <input type="text" id="gradeRatio" placeholder="0" class="form-control">
                                <small class="help-block form-text">숫자만 입력 가능하며, 모든 비율의 합이 100%이어야 합니다.</small>
                            </div>
                            <div class="row form-group">

                                    <div class="form-check">
                                        <div class="checkbox">
                                            <label for="ckDefault" class="form-check-label ">
                                                Default 과제 여부
                                            </label>
                                            <input type="checkbox" id="ckDefault" name="checkbox1" value="option1" class="form-check-input" style="
                                            margin-left: 5px;">
                                        </div>
                                    </div>
                            </div>
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


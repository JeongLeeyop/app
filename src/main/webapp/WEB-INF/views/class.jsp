
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
                                <div class="card" style="height: 94.52%;">
                                    <div class="card-header">
                                        <strong>Section</strong> List
                                        <h3 class="title-3"style="padding-top: 10px;padding-bottom: 5px;">${curClass.classSectionName}Page</h3>
                                    </div>
                                    <div class="card-body card-block" style="height: 431px;" >
                                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal" style="height: 100%;">
                                            <div class="row form-group" style="height: 87%;">
                                                <div class="col-12 col-md-9">
                                                    <select name="multiple-select" id="multiple-select" multiple="" class="form-control" style="height: 100%;width: 130%;">
                                                    </select>
                                                </div>
                                            </div>
                                            <div id="alert2" class="col-12 col-md-9" style="height: 10%;max-width: 120%;flex: 0 0 100%;">
                                                <button data-toggle="modal" data-target="#smallmodal2" id ="addSection" type="button" class="btn btn-primary btn-sm">
                                                    <i class="fa fa-dot-circle-o">Add</i>
                                                </button>
                                                <button id ="editSection" type="submit" class="btn btn-primary btn-sm">
                                                    <i class="fa fa-dot-circle-o">Edit</i>
                                                </button>
                                                <button id ="delSection" type="button" class="btn btn-danger btn-sm">
                                                    <i class="fa fa-ban">Delete</i>
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <!-- TOP CAMPAIGN-->
                                <div class="top-campaign">
                                    <div class="card-header" style="background-color: #fff;position: relative;bottom: 42px;right: 38px;border-bottom: none;">
                                        <strong>Task</strong> List </div>
                                    <div class="table-responsive" style="position: relative;bottom: 66px;">
                                        <table overflow : auto class="table table-top-campaign">
                                            <thead id = "taskList">
                                                <tr id = "taskListTr">
                                                    <th style="border-top: none;font-size: 0.38cm;padding-bottom: 21.5px;">
                                                        이름
                                                    </th>
                                                    <th style="border-top: none;" >
                                                        <div class="rs-select2--light rs-select2--sm">
                                                        <select class="js-select2" name="time">
                                                            <option selected="selected" value="2">과제 1</option>
                                                            <option value="">과제 2</option>
                                                            <option value="">과제 3</option>
                                                            <option value="">과제 4</option>
                                                            <option value="">과제 5</option>
                                                            <option value="">슬롯 삭제</option>
                                                        </select>
                                                            <div class="dropDownSelect2"></div></div>
                                                    </th>
                                                    <th style="border-top: none;">
                                                        <div class="rs-select2--light rs-select2--sm">
                                                        <select class="js-select2" name="time">
                                                            <option value="">과제 1</option>
                                                            <option selected="selected">과제 2</option>
                                                            <option value="">과제 3</option>
                                                            <option value="">과제 4</option>
                                                            <option value="">과제 5</option>
                                                            <option value="">슬롯 삭제</option>
                                                        </select>
                                                            <div class="dropDownSelect2"></div>
                                                    </th>
                                                    <th style="border-top: none;">
                                                        <div class="rs-select2--light rs-select2--sm">
                                                            <select class="js-select2" name="time">
                                                                <option value="">과제 1</option>
                                                                <option value="">과제 2</option>
                                                                <option selected="selected">과제 3</option>
                                                                <option value="">과제 4</option>
                                                                <option value="">과제 5</option>
                                                                <option value="">슬롯 삭제</option>
                                                            </select>
                                                            <div class="dropDownSelect2"></div>
                                                        </div>
                                                    </th>
                                                    <th style="border-top: none;border-bottom: none"><button class="au-btn au-btn-icon au-btn--green au-btn--small" style="height: 35px;width: 47px;">
                                                        <i class="zmdi zmdi-plus"></i></button></th>
                                                </tr>
                                            </thead>
                                            <tbody id="taskChart">
                                            <tr>
                                                <td>1. sample1</td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td hidden></td>
                                            </tr>
                                            <tr>
                                                <td>2. sample2</td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td hidden></td>
                                            </tr>
                                            <tr>
                                                <td>3. sample3</td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td><input type="text" placeholder="" class="form-control"></td>
                                                <td hidden></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button type="button" id="cancel" class="btn btn-secondary" style="float: right;margin-right: 5px;">Cancel</button>
                                    <button type="button" id="clearTask" class="btn btn-danger" style="float: right;margin-right: 5px;">Clear</button>
                                    <button type="button" id="saveTask" class="btn btn-success" style="float: right;margin-right: 5px;">Save</button>

                                </div>
                                <!--  END TOP CAMPAIGN-->
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <!-- DATA TABLE -->
                                <h3 class="title-5 m-b-25">data table
                                    <button type="button" class="btn btn-secondary mb-1" data-toggle="modal" data-target="#smallmodal" style="float: right;position: relative;right: 90px;">
                                        등급 반영 기준
                                    </button>
                                </h3>

                                <div class="table-responsive table-responsive-data2">
                                    <table class="table table-data2">
                                        <thead>
                                        <tr>
                                            <th>name</th>
                                            <th>과제1</th>
                                            <th>과제2</th>
                                            <th>과제3</th>
                                            <th>과제4</th>
                                            <th>과제5</th>
                                            <th>최종성적</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="tr-shadow">
                                            <td>Helen</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>30</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>90</td>
                                        </tr>
                                        <tr class="spacer"></tr>
                                        <tr class="tr-shadow">
                                            <td>Dorothy</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>30</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>90</td>
                                        </tr>
                                        <tr class="spacer"></tr>
                                        <tr class="tr-shadow">
                                            <td>Carol</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>30</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>90</td>
                                        </tr>
                                        <tr class="spacer"></tr>
                                        <tr class="tr-shadow">
                                            <td>Betty</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>30</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>90</td>
                                        </tr>
                                        <tr class="spacer"></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- END DATA TABLE -->
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
<div class="modal fade" id="smallmodal" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="smallmodalLabel">Grade Ratio</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-top-campaign">
                        <tbody>
                        <tr>
                            <td>Memory Verse</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Family Devotion</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Action Plan</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>7 Steps</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Reports</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Parent Action Plan</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Parent Prayer</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Parent School</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Attendance</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Parent Assignment</td>
                            <td>10%</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" data-toggle="modal" data-target="#smallmodal" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="smallmodal2" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel2" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="smallmodalLabel2">Section Name</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <label for="sectionName" class=" form-control-label" style="font-weight: bold">섹션명 입력</label>
                    <input type="text" id="sectionName" placeholder="${curClass}" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button id="addSectionOk" type="button" data-toggle="modal" data-target="#smallmodal2" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>

<script src="vendor/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/Page/class.js"></script>


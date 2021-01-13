
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

                            <%--
작업중
<div class="col-lg-6">
    <div class="card"style="height: 100%;">
        <div class="card-header">
            <strong>Section</strong> List
            <h3 class="title-3"style="padding-top: 10px;padding-bottom: 5px;">${curClass.className}</h3>
        </div>
        <div class="card-body">

            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false">Home</a>
                <a class="nav-link active show" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true">Menu 1</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Menu 2</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Menu 3</a>
            </div>

            <div class="row form-group" style="height: 87%;">
                <div class="col-12 col-md-9">
                    <select name="multiple-select" id="multiple-select" multiple="" class="form-control">
                    </select>
                </div>
            </div>
            <div id="alert2" class="col-12 col-md-9" style="height: 10%;max-width: 120%;flex: 0 0 100%;">
                <button data-toggle="modal" data-target="#smallmodal2" id ="addSection" type="button" class="btn btn-primary btn-sm">
                    <i class="fa fa-dot-circle-o">Add</i>
                </button>
                <button id ="editSection" type="button" class="btn btn-primary btn-sm">
                    <i class="fa fa-dot-circle-o">Edit</i>
                </button>
                <button id ="delSection" type="button" class="btn btn-danger btn-sm">
                    <i class="fa fa-ban">Delet~e</i>
                </button>
            </div>


        </div>
    </div>
</div>--%>

                            <div class="col-lg-6 sectionChart" style="width: 30%;flex: 0 0 30%;">
                                <div class="card" style="height: 100%;">
                                    <div class="card-header">
                                        <strong>Section</strong> List
                                        <h3 data-id="${authClass.authClassIdx}"class="title-3"style="padding-top: 10px;padding-bottom: 5px;">${authClass._class.className}</h3>
                                    </div>
                                    <div class="card-body card-block" style="height: 431px;" >
                                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal" style="height: 100%;">
                                            <div class="row form-group" style="height: 92%;">
                                                <div class="col-12 col-md-9">
                                                    <select name="multiple-select" id="multiple-select" multiple="" class="form-control">
                                                    </select>
                                                </div>
                                            </div>

                                    </div>
                                    <div id="alert2" class="user-data__footer">
                                        <button data-toggle="modal" data-target="#smallmodal2" id ="addSection" type="button" class="btn btn-primary btn-sm">
                                            <i class="fa ">Add</i>
                                        </button>
                                        <button id ="editSection" type="button" class="btn btn-success btn-sm">
                                            <i class="fa">Edit</i>
                                        </button>
                                        <button id ="delSection" type="button" class="btn btn-danger btn-sm">
                                            <i class="fa ">Delete</i>
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div class="col-lg-8 scoreChart">
                                <!-- TOP CAMPAIGN-->
                                <div class="top-campaign">
                                    <div class="card-header">
                                        <strong>Task</strong> List </div>
                                    <div class="table-responsive">
                                        <table overflow : auto class="table table-top-campaign">
                                            <thead id = "taskList">
                                                <tr id = "taskListTr">
                                                    <th style="border-top: none;font-size: 0.38cm;padding-bottom: 21.5px;padding-right: 12px;">
                                                        <div>Name</div>
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody id="taskChart">

                                            </tbody>
                                        </table>

                                </div>


                                <!--  END TOP CAMPAIGN-->
                            </div>

                                <button type="button" id = "addTaskBtn" class="au-btn au-btn-icon au-btn--green au-btn--small"><i class="zmdi zmdi-plus"></i></button>
                                <div class="user-data__footer class_button">
                                    <button type="button" id="saveTask" class="btn btn-success" >Save</button>
                                    <button type="button" id="clear" class="btn btn-danger">Clear</button>
                                    <button type="button" id="cancel" class="btn btn-secondary" >Go Back</button>
                                </div>

                        </div>
                        <div class="row" style="margin-top: 50px;width: 100%;margin-left: 3px;margin-right: 3%;">
                            <div class="col-md-12">
                                <!-- DATA TABLE -->
                                <h3 class="title-5 m-b-25">data table
                                    <button type="button" class="btn btn-secondary mb-1" data-toggle="modal" data-target="#smallmodal" style="float: right;position: relative;">
                                        Grade Chart
                                    </button>
                                </h3>

                                <div class="table-responsive table-responsive-data2">
                                    <table class="table table-data2" >
                                        <thead id="GradeList">
                                        <tr>
                                            <th>name</th>
                                        </tr>
                                        </thead>
                                        <tbody id="TotalGradeChart">
                                        </tbody>
                                    </table>
                                </div>
                                <!-- END DATA TABLE -->
                            </div>
                        </div>
                        <div class="row" style="width: 100%;">
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
                    <table id="gradeChart" class="table table-top-campaign"style="width: 100%;display: inline-table;">
                        <tbody>
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
                <div onsubmit="return false" class="table-responsive">
                    <label for="sectionName" class=" form-control-label" style="font-weight: bold">Please enter section name.</label>
                    <div hidden id="modalSectionIdx"></div>
                    <input hidden>
                    <input type="text" id="sectionName" onkeypress="if(event.keyCode == 13 ){SectionAdd();}" placeholder="<%--${curClass}--%>" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button id="addSectionOk" type="button" data-toggle="modal" data-target="#smallmodal2" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="largeModal" tabindex="-1" role="dialog" aria-labelledby="largeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document" style="max-width: 1000px;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="largeModalLabel">Large Modal</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                    <div class="col-lg-6">
                                        <div class="au-card m-b-30" style="padding: 0px;padding-right: 0px;">
                                            <div class="au-card-inner">
                                                <h3 class="title-2 m-b-20">Task Scores</h3>
                                                <canvas id="myChart"></canvas>
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

    <script src="vendor/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="js/Page/class.js"></script>


<!-- animsition overrides all click events on clickable things like a,
      since calendar doesn't add href's be default,
      it leads to odd behaviors like loading 'undefined'
      moving the class to menus lead to only the menu having the effect -->
            <!-- MAIN CONTENT-->
<%--selectbox--%>
<%--background: #befdc259;--%>
<%--border-radius: 0.35rem;--%>
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col" style="width: 70%;flex-basis: unset;flex-grow: 0;">
                              <div class="au-card">
                                <div id="calendar"></div>
                              </div>
                            </div><!-- .col -->
                            <div class="col-lg-3" <%--style="flex: 0 0 25%;max-width: 25%;"--%>>
                                <div class="au-card au-card--bg-blue au-card-top-countries m-b-30" style="height: 100%;">
                                    <div class="au-card-inner">
                                        <div class="table-responsive">
                                            <table class="table table-top-countries">
                                                <tbody id="studentList">
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="au-card-inner" style="width: 100%;">
                                            <div class="table-responsive" style="position: absolute;/* top: 50%; */bottom: 22px;width: 75%;max-width: 290px;">
                                        <button type="button" id="addAt" class="btn btn-success btn-sm" >Save<div hidden id="curDate"></div></button>
                                        <button type="button" id="delAt" class="btn btn-danger btn-sm">Delete</button>

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
<script src="vendor/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/Page/attendance.js"></script>
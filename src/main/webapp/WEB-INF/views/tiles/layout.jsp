<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
    <head>
        <tiles:insertAttribute name="link"/>
    </head>

    <body class="animsition">
        <div class="page-wrapper">
            <tiles:insertAttribute name="header"/>
            <tiles:insertAttribute name="content"/>
            </div>
        </div>
            <tiles:insertAttribute name="footer"/>
    </body>
</html>

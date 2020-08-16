<!DOCTYPE html>
<html lang="ko" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Test Error Page!</title>
    <link rel="stylesheet" th:href="@{/css/style.css}"></link>
</head>
<body>
<div class="errorPage"><span class="errorHead">Error!</span><br/>
    <p th:text="${'path: ' + path}"></p>
    <p th:text="${'status: ' + status}"></p>
    <p th:text="${'timestamp: ' + timestamp}"></p>
    <p th:text="${'error: ' + error}"></p>
    <p th:text="${'errors: ' + errors}"></p>
    <p th:text="${'exception: ' + exception}"></p>
    <p th:text="${'message: ' + message}"></p>
    <p th:text="${'trace: ' + trace}"></p></div>
</body>
</html>
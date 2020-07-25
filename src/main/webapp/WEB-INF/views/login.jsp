<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="author" content="Alex Andonie">

  <title>Matter - A material design dashboard built on top of bootstrap</title>
  <meta name="description" content="Matter is a material design system built on top of the latest version of bootstrap. It's released under MIT so you can do whatever you want with it.">

  <meta property="og:title" content="Matter - a material design bootstrap dashboard">
  <meta property="og:description" content="Matter is a material design system built on top of the latest version of bootstrap. It's released under MIT so you can do whatever you want with it.">
  <meta property="og:image" content='images/social-thumbnail.jpg'>
  <meta property="og:url" content="https://matter.alexandonie.com">
  <meta name="twitter:card" content="summary_large_image">

  <meta property="og:site_name" content="Matter - a material design bootstrap dashboard">
  <meta name="twitter:image:alt" content="Material design bootstrap dashboard">

  <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
</head>
<body>
  <div class="container py-5 vh-100 d-flex align-items-center justify-content-center">
    <div class="row w-100">
      <div class="col col-sm-9 col-md-7 col-lg-5 col-xl-4 mx-auto px-md-0">
        <div class="card overflow-hidden mb-6">
          <header class="bg-primary px-3 pb-3 pt-8">
            <h1 class="text-lg text-white mb-0">Matter</h1>
          </header>
          <div class="card-body pt-5 pb-8">
            <form action="#" method="POST">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email">
              </div> <!-- end of form-group -->
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password">
              </div> <!-- end of form-group -->

              <div class="d-flex align-items-center justify-content-between">
                <a href="#0" class="text-sm">Forgot your password?</a>
                <button type="button" class="btn btn-primary">Login</button>
              </div> <!-- end of d-flex -->
            </form>
          </div> <!-- end of card-body -->
          <div class="bg-primary pt-1"></div>
        </div> <!-- end of card -->
        <p class="text-center text-secondary mb-0">
          Don't have an account?
          <a href="/register" class="text-secondary">
            <u>Register here</u>
          </a>
        </p>
      </div> <!-- end of col -->
    </div> <!-- end of row -->
  </div> <!-- end of container -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.3.0/perfect-scrollbar.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js"></script>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=NodeList.prototype.forEach"></script>
</body>
</html>

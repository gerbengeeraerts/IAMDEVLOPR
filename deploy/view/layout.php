<!DOCTYPE html>
<html lang="en">
    <head>
        <title>IAMDEVLOPR | RAPID MODERN PHP FRAMEWORK</title>
        <meta charset="utf-8">
        <meta name="description" content="">
        <link rel="Shortcut Icon" type="image/ico" href="favicon.png">
        <link rel="stylesheet" href="css/screen.css" type="text/css" media="screen" />
    </head>
    <body>

    <?php if(!empty($_SESSION['info'])): ?><div class="container"><div class="alert alert-success"><?php echo $_SESSION['info'];?></div></div><?php endif; ?>
    <?php if(!empty($_SESSION['error'])): ?><div class="container"><div class="alert alert-danger"><?php echo $_SESSION['error'];?></div></div><?php endif; ?>
    <?php echo $content; ?>

    <script type="text/javascript" src="js/vendor/fallback/fallback.min.js"></script>
    <script type="text/javascript" src="js/script.dist.js"></script>
    </body>
</html>

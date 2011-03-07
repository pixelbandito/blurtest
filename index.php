<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <style type="text/css" href="css/style.css" /></style>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.js"></script>
</head>
<body>

<object></object>

<embed src="filterBlur.svg" width="300" height="100"
type="image/svg+xml"></embed>

<div class="header" style="filter:url(#blur);">

<h1 class="blur">This is an example of SVG filtered text</h1>

</div>

<?php
$pageToBlur = false;
if ($pageToBlur):
?>
<iframe class="blur" src="<?php echo $pageToBlur;?>"/>

<?php
endif;
?>

</body>
</html>

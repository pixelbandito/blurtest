$(function() {

	// EVENT HANDLERS

	$(".form-controls").on("click", ".btn", function() {
    console.log("click");
    var $screenTarget=$(".screen-options");
    var $blurrinessControl = $("#blurriness");
    var $graynessControl = $("#grayness");
    var blurriness = ( $blurrinessControl.val() ) ? $blurrinessControl.val() : "0";
    var grayness = $graynessControl.val();
    var style = "-webkit-filter: grayscale(" + grayness / 100 + ") blur(" + blurriness + "px)";
    console.log(style);
    $screenTarget.attr({
      "data-blur": blurriness,
      "data-gray": grayness
    }).css("-webkit-filter", "grayscale(" + grayness / 100 + ") blur(" + blurriness + "px)");
    return false;
	});



});

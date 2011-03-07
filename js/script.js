// Title: Blurtest
// Author: Chris Garcia
// Date: 4 March 2011

$().ready(function() {
    
    var $urlVar = "http://www.google.com";
    var $blurVar = 5;
    var $colorVar = "false";
    if ( getUrlVars()['url'] ) {
        $urlVar = unescape( getUrlVars()['url'] );
    }
    if ( getUrlVars()['blur'] ) {
        $blurVar = getUrlVars()['blur'];
    }
    if ( getUrlVars()['color'] ) {
        $colorVar = getUrlVars()['color'];
    }
    $( '#blurOptions .blurURL input[type="text"]' ).val( $urlVar );
    $ ( '#blurOptions .blurAmount select' ).val( $blurVar );
    if ( $colorVar == "true" ) {
        $( '#blurOptions .desaturate input[type=checkbox]' ).removeAttr( 'checked' );
    } else {
        $( '#blurOptions .desaturate input[type=checkbox]' ).attr( 'checked', true );
    }
    changeDesaturate( '#blurOptions .desaturate input[type=checkbox]' );
    changeBlur( '#blurOptions .blurAmount select' );
    loadIframe();
    
    if ( $( '#blurOptions .blurURL input[type="text"]' ).val() == "" || $( '#blurOptions .blurURL input[type="text"]' ).val() == $( '#blurOptions .blurURL input[type="text"]' ).attr("data-legend") ) {
        $( '#blurOptions .blurURL input[type="text"]' ).val( $( '#blurOptions .blurURL input[type="text"]' ).attr("data-legend") );
        $( '#blurOptions .blurURL input[type="text"]' ).addClass("default");
        $( "form#blurTestURL span.legend" ).hide();
    }
    if ( $( '#blurOptions .blurAmount select' ).val() == "0" ) {
        $("#blurredContent").removeClass("blur")
    } else {
        $("#blurredContent").addClass("blur");
    }
    if ( ! $( '#blurOptions .desaturate input[type=checkbox]' ).is( ":checked" ) ) {
        $("#desaturatedContent").removeClass("desaturate")
    } else {
        $("#desaturatedContent").addClass("desaturate");
    }
//    alert( $("#blurOptions").serialize() );

    $('#blurOptions .blurURL input[type="text"]').bind("blur", function() {
        if ( $(this).val() == "" || $(this).val() == $(this).attr("data-prefix") ) {
            $(this).val( $(this).attr("data-legend") );
            $(this).addClass("default");
        }
    });
    
    $('#blurOptions .blurURL input[type="text"]').bind("focus", function() {
        if ( $(this).val() == "" || $(this).val() == $(this).attr("data-legend") ) {
            $(this).val( $(this).attr("data-prefix") );
            $(this).removeClass("default");
        }
    });

    $( '#blurOptions .desaturate input[type=checkbox]' ).bind("change", function() {
        var desaturateTrigger = this;
        changeDesaturate( desaturateTrigger );
    });

    $( '#blurOptions .blurAmount select' ).bind("change", function() {
        var selectTrigger = this;
        changeBlur( selectTrigger );
    });

    $("#blurOptions").bind("submit", function() {
        var $colorVar="false"
        if ( $( '#blurOptions .desaturate input[type=checkbox]' ).is( ":checked" ) ) {
            $colorVar="false"
        } else {
            $colorVar="true"
        }
        
        var pathExtract = /(.*)(\?)/;
        var $urlStripped = pathExtract.exec( window.location.href )[1];
        var $newURL = $urlStripped + "?color=" + $colorVar + "&blur=" + $( '#blurOptions .blurAmount select' ).val() + "&url=" + escape( $( '#blurOptions .blurURL input[type="text"]' ).val() );
        window.location.href = $newURL;
        return false;
    });
    
    $( '#blurOptionsSwitch a.toggle' ).bind( 'click', function() {
        toggleDisplay();
    });

});

function validateThis( thisObj ) {
    return false;
}

function toggleDisplay() {
    if ( $('#blurOptions').is(':visible') ) {
        $( '.header' ).animate({'width': '36px'}, 'slow', function() {
            $('#blurOptions').hide('fast', function() {            
                $( '#blurOptionsSwitch .on' ).show(function() {
                    $( '#blurOptionsSwitch .off' ).hide(); 
                });
            });
        });
    } else {
        $( '#blurOptionsSwitch .off' ).show(function() {
            $( '#blurOptionsSwitch .on' ).hide(function() {
                $('#blurOptions').show('0', function() {
                    $( '.header' ).animate({'width': '100%'}, 'slow'); 
                });
            });
        });
    }
}

function loadIframe() {
    $pageToBlur=$('#blurOptions .blurURL input[type="text"]').val();
    if ( $pageToBlur ) {
        $('.main > iframe').attr("src", $pageToBlur)
    }
}

function changeBlur( selectTrigger ) {
    if ( $( selectTrigger ).val() == "0" ) {
        $("#blurredContent").removeClass("blur")
    } else {
        $("#blurredContent").addClass("blur");
    }
    if ( $("feGaussianBlur").attr("stdDeviation") != $( selectTrigger ).val() ) {
        $("feGaussianBlur").attr("stdDeviation", $( selectTrigger ).val() );
    }
}

function changeDesaturate( desaturateTrigger ) {
    if ( ! $( desaturateTrigger ).is( ":checked" ) ) {
        $("#desaturatedContent").removeClass("desaturate")
    } else {
        $("#desaturatedContent").addClass("desaturate");
    }
}
// Read a page's GET URL variables and return them as an associative array.
// Found on http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
// by Uzbekjon
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//提示显示框
function HintToast(hint) {
    var $hintToast = $('#hintToast');
    $('#hintToast .weui-toast__content').html(hint);
    $hintToast.fadeIn(500);
    setTimeout(function() {
        $hintToast.fadeOut(500);
    }, 1000);
}

//提示
function MsgToast(msg) {
    var $msgToast = $('#msgToast');
    $('#msgToast .weui-toast__content').html(msg);
    $msgToast.fadeIn(500);
    setTimeout(function() {
        $msgToast.fadeOut(500);
    }, 500);
}
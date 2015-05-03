
function popupAvoid(){    
    $(".cashPopup").show();
    // Assign the command to execute and the number of seconds to wait
    var strCmd = "$('.cashPopup').hide()";
    var waitseconds = 1;

    // Calculate time out period then execute the command
    var timeOutPeriod = waitseconds * 1000;
    var hideTimer = setTimeout(strCmd, timeOutPeriod);
}

$(document).ready(function(){
    $("body").append("<div class='cashPopup'><span>-50</span></div>");
    $(".cashPopup").hide();
    
    $(".container").mouseenter(function(){
        console.log(this);    
    });
});
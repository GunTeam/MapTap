
function popupAvoid(penalty){
    document.getElementById('cashPenaltyText').innerHTML = "-"+penalty;
    $(".cashPopup").show();
    // Assign the command to execute and the number of seconds to wait
    var strCmd = "$('.cashPopup').hide()";
    var waitseconds = 1;

    // Calculate time out period then execute the command
    var timeOutPeriod = waitseconds * 1000;
    var hideTimer = setTimeout(strCmd, timeOutPeriod);
}

function popupReward(reward){
    document.getElementById('cashRewardText').innerHTML = "+"+reward;
    $(".cashPopup").show();
    // Assign the command to execute and the number of seconds to wait
    var strCmd = "$('.cashPopup').hide()";
    var waitseconds = 1;

    // Calculate time out period then execute the command
    var timeOutPeriod = waitseconds * 1000;
    var hideTimer = setTimeout(strCmd, timeOutPeriod);
}

$(document).ready(function(){
    $("body").append("<div class='cashPopup'><span id='cashPenaltyText'></span></div>");
    $("body").append("<div class='cashPopup'><span id='cashRewardText'></span></div>");

    $(".cashPopup").hide();
    
    console.log($("table").html());
    
    $("table").mouseenter(onHover);
});
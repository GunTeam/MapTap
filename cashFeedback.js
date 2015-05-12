function playSound(soundID){
    if( localStorage.getItem("soundsOn")){
        $(soundID)[0].play();
    }
}
    
function popupAvoid(penalty){
    document.getElementById('cashPenaltyText').innerHTML = "-"+penalty;
    $(".penaltyPopup").show();
    playSound("#clickedAvoid");
    // Assign the command to execute and the number of seconds to wait
    var strCmd = "$('.cashPopup').hide()";
    var waitseconds = 1;

    // Calculate time out period then execute the command
    var timeOutPeriod = waitseconds * 1000;
    var hideTimer = setTimeout(strCmd, timeOutPeriod);
}

function popupReward(reward){
    document.getElementById('cashRewardText').innerHTML = "+"+reward;
    $(".rewardPopup").show();
    playSound("#reachedDestination");
    // Assign the command to execute and the number of seconds to wait
    var strCmd = "$('.cashPopup').hide()";
    var waitseconds = 1;

    // Calculate time out period then execute the command
    var timeOutPeriod = waitseconds * 1000;
    var hideTimer = setTimeout(strCmd, timeOutPeriod);
}

function mouseEnterCountry(country){
    $('.countryLabelText').html(country);
    $(".countryLabel").show();
}

function mouseLeaveCountry(country){
    $(".countryLabel").hide();
}

$(document).ready(function(){
    $("body").append("<div class='cashPopup penaltyPopup'><span id='cashPenaltyText'></span></div>");
    $("body").append("<div class='cashPopup rewardPopup'><span id='cashRewardText'></span></div>");
    $("body").append("<div class='countryLabel'><span class='countryLabelText'></span></div>");

    $(".cashPopup").hide();
        
});
function playSound(soundID){
    if( localStorage.getItem("soundsOn") === "true"){
        $(soundID)[0].play();
    }
}
    
function popupAvoid(penalty){
    document.getElementById('cashPenaltyText').innerHTML = "-"+penalty;
    $(".penaltyPopup").show();
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
    // Assign the command to execute and the number of seconds to wait
    var strCmd = "$('.cashPopup').hide()";
    var waitseconds = 1;

    // Calculate time out period then execute the command
    var timeOutPeriod = waitseconds * 1000;
    var hideTimer = setTimeout(strCmd, timeOutPeriod);
}

function popupLevelup(){
    document.getElementById('levelUpText').innerHTML = 'Level Up!';
    $(".levelupPopup").show();
    $("#reachedDestination")[0].play();
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
    $("body").append("<div class='cashPopup levelupPopup'><span id='levelUpText'></span></div>");
    $("body").append("<div class='countryLabel'><span class='countryLabelText'></span></div>");

    $(".cashPopup").hide();
        
});
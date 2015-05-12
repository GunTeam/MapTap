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
    
        var p = $(".pulsate");
      for(var i=0; i<3; i++) {
        p.animate({opacity: 0.5, "font-size": "150px"}, 500, 'linear')
         .animate({opacity: 1, "font-size": "100px"}, 500, 'linear');
      }
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
    
    var p = $(".pulsate");
      for(var i=0; i<3; i++) {
        p.animate({opacity: 0.5, "font-size": "150px"}, 500, 'linear')
         .animate({opacity: 1, "font-size": "100px"}, 500, 'linear');
      }
}

function popupLevelup(){
    document.getElementById('levelUpText').innerHTML = 'Level Up!';
    $(".levelupPopup").show();
    playSound("#reachedDestination");
    // Assign the command to execute and the number of seconds to wait
    var strCmd = "$('.cashPopup').hide()";
    var waitseconds = 1;

    // Calculate time out period then execute the command
    var timeOutPeriod = waitseconds * 1000;
    var hideTimer = setTimeout(strCmd, timeOutPeriod);
        var p = $(".pulsate");
      for(var i=0; i<3; i++) {
        p.animate({opacity: 0.5, "font-size": "150px"}, 500, 'linear')
         .animate({opacity: 1, "font-size": "100px"}, 500, 'linear');
      }
}

function mouseEnterCountry(country){
    $('.countryLabelText').html(country);
    $(".countryLabel").show();
}

function mouseLeaveCountry(country){
    $(".countryLabel").hide();
}

$(document).ready(function(){
    $("body").append("<div class='cashPopup penaltyPopup pulsate'><span id='cashPenaltyText'></span></div>");
    $("body").append("<div class='cashPopup rewardPopup pulsate'><span id='cashRewardText'></span></div>");
    $("body").append("<div class='cashPopup levelupPopup pulsate'><span id='levelUpText'></span></div>");
    $("body").append("<div class='countryLabel'><span class='countryLabelText'></span></div>");

    $(".cashPopup").hide();
        
});
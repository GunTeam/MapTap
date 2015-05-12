function playSound(soundID){
    if( localStorage.getItem("soundsOn") === "True"){
        $(soundID)[0].play();
    }
}

$(document).ready(function(){
    
    if(!localStorage.soundsOn){
        localStorage.setItem("soundsOn", true);
    }
    if(!localStorage.TutorialPlayed){
        localStorage.setItem("TutorialOn", false);
    }
    
    $("a").on("click",function(){
        playSound("#menuSelect");    
    });
    
    
    $('#settingsModal').on('hidden.bs.modal', function () {
        localStorage.setItem("soundsOn", $('#soundsOn').prop('checked'));
        localStorage.setItem("TutorialOn", $('#tutorialOn').prop('checked'));
    })
});
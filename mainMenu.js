function playSound(soundID){
    if( localStorage.getItem("soundsOn") === "true"){
        $(soundID)[0].play();
    }
}

$(document).ready(function(){
    
    if(!localStorage.soundsOn){
        localStorage.setItem("soundsOn", "true");
    }
    if(!localStorage.TutorialPlayed){
        localStorage.setItem("TutorialOn", "false");
    }
    
    $(".settingsButton").on("click", function(){        
        if(localStorage.getItem("soundsOn") === "true"){
            $("#soundsOn").addClass("active");
            $("#soundsOn").prop("checked","checked");   
        }
        else{
            $("#soundsOff").addClass("active");
            $("#soundsOff").prop("checked","checked");           
        }

        if(localStorage.getItem("TutorialOn") === "true"){
            $("#tutorialOn").addClass("active");
            $("#tutorialOn").prop("checked","checked");   
        }
        else{
            $("#tutorialOff").addClass("active");
            $("#tutorialOff").prop("checked","checked"); 
        }
    });

    
    $("a").on("click",function(){
        playSound("#menuSelect");    
    });
    
    $('#settingsModal').on('hidden.bs.modal', function () {
        localStorage.setItem("soundsOn", $('#soundsOn').prop('checked'));
        localStorage.setItem("TutorialOn", $('#tutorialOn').prop('checked'));
    })

});

$('#settingsModal').on('hidden.bs.modal', function () {
    localStorage.setItem("soundsOn", $('#soundsOn').prop('checked'));
    localStorage.setItem("TutorialOn", $('#tutorialOn').prop('checked'));
})

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
            $("#soundsOn").parent().addClass("active");
            $("#soundsOn").prop("checked","checked"); 
            $("#soundsOff").parent().removeClass("active");
            $("#soundsOff").prop("checked","unchecked");  
        }
        else{
            $("#soundsOff").parent().addClass("active");
            $("#soundsOff").prop("checked","checked"); 
            $("#soundsOn").parent().removeClass("active");
            $("#soundsOn").prop("checked","unchecked");  
        }

        if(localStorage.getItem("TutorialOn") === "true"){
            $("#tutorialOn").parent().addClass("active");
            $("#tutorialOn").prop("checked","checked");   
            $("#tutorialOff").parent().removeClass("active");
            $("#tutorialOff").prop("checked","unchecked"); 
        }
        else{
            $("#tutorialOff").parent().addClass("active");
            $("#tutorialOff").prop("checked","checked"); 
            $("#tutorialOn").parent().removeClass("active");
            $("#tutorialOn").prop("checked","unchecked"); 
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

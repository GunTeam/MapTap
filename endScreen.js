
function playSound(soundID){
    if( localStorage.getItem("soundsOn") === "true"){
        $(soundID)[0].play();
    }
}

$(document).ready(function(){
    playSound("#gameOver");
    
    var yourScore = localStorage.getItem("yourScore");
    $("#YourScore").html("Your Score: " + yourScore);
    
    var bestScore = localStorage.getItem("bestScore")
    if(bestScore>0){
        $("#BestScore").html("Best Score: " + bestScore);
    }
    else{
        $("#BestScore").html("Best Score: " + 0);
    }

});
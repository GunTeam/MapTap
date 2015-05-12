$(document).ready(function(){
    $("#gameOver")[0].play();
    
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
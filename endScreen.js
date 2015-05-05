$(document).ready(function(){
    var yourScore = localStorage.getItem("yourScore");
    $("#YourScore").html("Your Score: " + yourScore);
});
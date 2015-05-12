
var mapTap = (function() {
    var exports = {};

    var currentBordering = [];

    var countryToIndexMap = {};

    google.load("visualization", "1.0", {
        packages: ["geochart"]
    });
    google.setOnLoadCallback(completelyDraw);
    
    //randomized avoid country list
    var countriesToAvoid = [];
    
    //Make a map so that when given a country, we know what entry of dataCountries it corresponds to
    for (var dataCountryInd = 1; dataCountryInd < dataCountries.length; dataCountryInd++) {
        var thisCountry = dataCountries[dataCountryInd][0];
        countryToIndexMap[thisCountry] = dataCountryInd;
    }
    
    function completelyDraw() {
        drawRegionsMap();
                
        // Assign the command to execute and the number of seconds to wait
        var strCmd = "identifyCountry()";
        var waitseconds = 1;

        // Calculate time out period then execute the command
        var timeOutPeriod = waitseconds * 1000;
        var hideTimer = setTimeout(strCmd, timeOutPeriod);
    }

    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(dataCountries);

        var options = {
            region: '002',
            colorAxis: {
                colors: [pathColor, borderColor, borderingColor, traderLocationColor, defaultColor]
            },
            datalessRegionColor: '#ffffff',
            defaultColor: '#aaaaaa',
            tooltip: {
                trigger: "none"
            }
        };

        var chart = new google.visualization.GeoChart(document.getElementById('mapDiv'));
        chart.draw(data, options);

        google.visualization.events.addListener(chart, 'select', mapClickHandler);

        function mapClickHandler() {
            playSound("#selectCountry");
            var selection = chart.getSelection();
            var index = selection[0].row + 1;
            var country = dataCountries[index][0];
            if (borderDictionary[currentCountry].indexOf(country) >= 0) {
                addCountryToPath(country, index);
            }
        }
    }
    
    function addCountryToPath(country, index){
        
        $(".countryLabel").hide();
        
        var color = traderLocationColor;

        currentCountry = country;
        currentCountryIndex = index;
        
        if (goalCountry === country) {
            $(".countryTableBody").empty();
            currentLevel++;
            console.log('currentLevel mod 4 = '+currentLevel%4);
            if (currentLevel%4 == 0){
                
                playSound("#levelUp");
                popupLevelup();
                
                avoidPenalty += 10;
                cashReward += 5;
                $("#levelStar1").attr("src","starOutline.png");
                $("#levelStar2").attr("src","starOutline.png");
                $("#levelStar3").attr("src","starOutline.png");
            } else {
                $("#levelStar"+(currentLevel%4)).attr("src","starFill.png");
            }
            
            popupReward(cashReward);
            
            currentCash += cashReward;
            
            score += cashReward;
            $("#scoreHeader>h1").html("Score: " + score);

            resetGame();
            dataCountries[currentCountryIndex][1] = traderLocationColorIndex;

            completelyDraw();


            document.getElementById('levelLabel').innerHTML = "Level "+ Math.floor(currentLevel/4 + 1);
            getNewObjective();
        } 
        
        numCountries += 1;
        
        if ($.inArray(country, countriesToAvoid) != -1) {
            color = borderColor;
            currentCash -= avoidPenalty;
            dataCountries[index][1] = avoidColorIndex;
            popupAvoid(avoidPenalty);
        } else {
            currentCash -= 5;
            dataCountries[index][1] = traderLocationColorIndex;
        }
        document.getElementById('cashInteger').innerHTML = '$' + currentCash + ' Remaining';

        //clear the last bordering highlights
        for (var pastBorderingCountryIndex in currentBordering) {
            var borderingCountry = currentBordering[pastBorderingCountryIndex];
            var indexInDataCountries = countryToIndexMap[borderingCountry];
            if (dataCountries[indexInDataCountries][1] !== traderLocationColorIndex && dataCountries[indexInDataCountries][1] !== avoidColorIndex && dataCountries[indexInDataCountries][1] !== pathColorIndex) {
                dataCountries[indexInDataCountries][1] = defaultColorIndex;
            }
        }

        currentBordering = [];

        for (var borderingCountryIndex in borderDictionary[currentCountry]) {
            var borderingCountry = borderDictionary[currentCountry][borderingCountryIndex];
            currentBordering.push(borderingCountry);

            var indexInDataCountries = countryToIndexMap[borderingCountry];

            if (dataCountries[indexInDataCountries][1] !== traderLocationColorIndex && dataCountries[indexInDataCountries][1] !== avoidColorIndex && dataCountries[indexInDataCountries][1] !== pathColorIndex) {
                dataCountries[indexInDataCountries][1] = borderingColorIndex;
            }
            else if(dataCountries[indexInDataCountries][1] === traderLocationColorIndex) {
                dataCountries[indexInDataCountries][1] = pathColorIndex;
            }
        }
        
        if (currentCash <= 0) {
            onGameEnd();
        } else{

            completelyDraw()
            
            var countryFirstWord = country.split(/[ ,-]+/)[0];
            var visitedString = "<tr><td>"+numCountries+".</td><td class = 'visited"+countryFirstWord+"' id = country" + numCountries + " style='color:" + color + "'> " + country + "</td></tr>";
            $(".countryTableBody").prepend(visitedString);


            for(var i = 1; i <numCountries; i++){
                $("#country"+i).css("background-color",pathColor);
                $("#country"+i).css("color","black");
            }
        }
    }
    
    function resetGame() {
        
        for(var resetIndex = 1; resetIndex < dataCountries.length; resetIndex++){
            dataCountries[resetIndex][1] = defaultColorIndex;
        }
        
        //need to set one random unreachable country as the upperbound index:
        dataCountries[countryToIndexMap['Ceuta']][1] = pathColorIndex;

        
        numCountries = 0;
    }

    function View(div) {

        div.append("<div class = 'container-fluid well'>"
            +   "<div class = 'row-fluid'>"              
            +       "<div class = 'container mapContainer'>"
            +           "<div id = 'mapDiv'>"
            +           "</div>"
            +           '<canvas id="traderCanvas"> </canvas>'
            +       "</div>"
            +   "<div class = 'column column1'>"
            +       "<div class = 'row-fluid'>"
            +           "<div id='scoreHeader'><h1>Score: 0</h1></div>"
            +           "<h2 id='cashInteger' style='color:green'></h2>"
            +           "<div class = 'countries_visited'>"
            +               "<table class = 'countryTable'><thead></thead><tbody class = 'countryTableBody'></tbody></table>"       
            +           "</div>"
            +       "</div>"
            +   "</div>"       
            +   "<div class = 'column column2'>"
            +           "<div class = 'objectivesTab'>"
            +           "</div>"
            +           "<div class = 'destinationTab'>"
            +           "</div>"
            +           "<div class = 'avoidTab'>"
            +           "</div>"
            +   "</div>"     
            +   "</div>"
            + "<div class='whiteCover'></div>"
            +"</div>");

        
    };

    var setup = function(div) {
        var view = View(div);
        exports.view = view;
        
        $("body").append($("<div id='dummyPathColor' style='display:none;color:"+pathColor+"'></div>"));
        $("body").append($("<div id='dummyAvoidColor' style='display:none;color:"+borderColor+"'></div>"));
        $("body").append($("<div id='dummyDefaultColor' style='display:none;color:"+defaultColor+"'></div>"));
        $("body").append($("<div id='dummyBorderingColor' style='display:none;color:"+borderingColor+"'></div>"));
        $("body").append($("<div id='dummyTraderLocationColor' style='display:none;color:"+traderLocationColor+"'></div>"));
        
        $("body").append($("<div id='dummyWhiteColor' style='display:none;color:"+whiteColor+"'></div>"));
        newGame();
    };
    
    function createLevelHeader() {
        $(".objectivesTab").empty();
        var levelHeader = "<div id='levelHeader'><h1 id='levelLabel'>Level "+(Math.floor(currentLevel/4)+1)+"</h1><img src='starOutline.png' id='levelStar1' class='levelStar'><img src='starOutline.png' id='levelStar2' class='levelStar'><img src='starOutline.png' id='levelStar3' class='levelStar'></div>";
        $(".objectivesTab").append(levelHeader);
    }
    
    function getNewObjective(){
        
        var endCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        var endCountry = dataCountries[endCountryIndex][0];

        while (endCountry === currentCountry || (islands.indexOf(endCountry)>= 0) ) {
            endCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
            endCountry = dataCountries[endCountryIndex][0];
        }
        
        goalCountry = endCountry;
        
        $(".destinationTab").empty();
        $(".destinationTab").append("<h2>Destination</h2>");
        var objectiveString = "<div class='objectives'><p><span style='color:" + goalColor + "'>" + endCountry + "</span></p></div>";
        $(".destinationTab").append(objectiveString);
        
        $(".avoidTab").empty();
        $(".avoidTab").append("<h2>Avoid</h2>");
        var avoidIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        countriesToAvoid = [];
        
        for (var i = 0;i < numberOfAvoidCountries; i++){
            var avoidCountry = dataCountries[avoidIndex][0];
            while (avoidCountry === endCountry || countriesToAvoid.indexOf(avoidCountry) >= 0 || islands.indexOf(avoidCountry)>=0){
                avoidIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
                avoidCountry = dataCountries[avoidIndex][0];
            }
            countriesToAvoid.push(avoidCountry);
        }
        
        for (var countryToAvoidIndex in countriesToAvoid) {
            var countryToAvoid = countriesToAvoid[countryToAvoidIndex];
            var avoidString = "<p><span style='color:" + borderColor + "'>" + countryToAvoid + "</span></p>";
            $(".avoidTab").append(avoidString);
        }

    }

    var newGame = function() {        
        score = 0;
        resetGame();
        
        $(".countries_visited").prepend("<h1>Traveled to: </h1>");
        $(".cash").prepend("<h1 style='color:green'>$</h1>");
        $(".avoidTab").append("<h1>Avoid</h1>");
        
        currentCash = startingCash;
        document.getElementById('cashInteger').innerHTML = currentCash+" Remaining";
        
        var newCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        currentCountry = dataCountries[newCountryIndex][0];
        
        while ((islands.indexOf(currentCountry)>= 0)) {
            newCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
            currentCountry = dataCountries[newCountryIndex][0];
        }
        
        currentCountryIndex = newCountryIndex;
        dataCountries[newCountryIndex][1] = traderLocationColorIndex;
        countriesVisited = [currentCountry];

        addCountryToPath(currentCountry, newCountryIndex);
        
        getNewObjective();
        createLevelHeader();
        
    }
    
    
    function onGameEnd(){
        
        localStorage.setItem("yourScore", score);
        
        if(localStorage.getItem("bestScore") < score){
            localStorage.setItem("bestScore", score);
        }
        
        window.location.href = "endScreen.html";     
    }

    exports.setup = setup;

    return exports;
}());

    function onHover(){
        var countryIndex = $(this).index();
        popupCountry(countryIndex)
    }

    function onMouseEnter(){
        $(".highlightedCountry").removeClass("highlightedCountry");
        var countryIndex = $(this).index();
        var country = googleIndexing[countryIndex];
        mouseEnterCountry(country); //dataCountries[countryIndex][0]
        
        var countryLabelPosition = $(this).position();
        countryLabelPosition.top += 30;
        countryLabelPosition.left += 60;
        $(".countryLabel").css(countryLabelPosition);
        
        var countryFirstWord = country.split(/[ ,-]+/)[0];
        $(".visited"+countryFirstWord).addClass("highlightedCountry");
    }

    function onMouseLeave(){
        var countryIndex = $(this).index();
        mouseLeaveCountry(countryIndex);
    }

    function identifyCountry(){
        $("path").each(function(){
            var color = $(this).css("fill"); 
            if(color !== $("#dummyDefaultColor").css("color") && color !== $("#dummyWhiteColor").css("color") && color !== $("#dummyBorderingColor").css("color")){
                $(this).mouseenter(onMouseEnter);
//                $(this).mouseleave(onMouseLeave);
            }
        })
    }
    
    var modalPages = ['modalPage1','modalPage2','modalPage3','modalPage4','backModalButton','nextModalButton'];
    var page = 0;


    function overlay() {
        el = document.getElementById("overlay");
        el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
        for (var i = 0; i < modalPages.length; i++){
            document.getElementById(modalPages[i]).style.visibility = 'hidden';
        }
    }
        
    function prevModal() {
        if (page == 1){
            document.getElementById("backModalButton").style.visibility = 'hidden';    
        }
        document.getElementById(modalPages[page]).style.visibility = 'hidden';
        page--;
        document.getElementById(modalPages[page]).style.visibility = 'visible';

    }
        
    function nextModal() {
        if (page == 0){
            document.getElementById("backModalButton").style.visibility = 'visible';    
        }
        document.getElementById(modalPages[page]).style.visibility = 'hidden';
        page++;
        document.getElementById(modalPages[page]).style.visibility = 'visible';
        if (page == 4){
            overlay();
        } 
        
        localStorage.setItem("TutorialOn", false);
    }

    function playSound(soundID){
        if( localStorage.getItem("soundsOn") === "true"){
            $(soundID)[0].play();
        }
    }

$(document).ready(function() {
    playSound("#menuSelect");
    $('.maptap').each(function() {
        mapTap.setup($(this));
        $(this).css("position", "absolute");
    });
    
    el = document.getElementById("overlay");
    el.style.visibility = "visible";
    
    if( localStorage.getItem("TutorialOn") === 'false'){
        $("#overlay").hide();
    }
});



var mapTap = (function() {
    var exports = {};

    var currentBordering = [];

    var countryToIndexMap = {};

    var borderDictionary = {
        "Algeria": ["Morocco", "Western Sahara", "Mauritania", "Mali", "Niger", "Tunisia", "Libya"],
        "Angola": ["Democratic Republic of the Congo", "Zambia", "Namibia"],
        "Benin": ["Togo", "Burkina Faso", "Niger", "Nigeria"],
        "Botswana": ["Namibia", "Zimbabwe", "South Africa"],
        "Burkina Faso": ["Mali", "Niger", "Benin", "Togo", "Ghana", "Cote d\'Ivoire"],
        "Burundi": ["Rwanda", "Tanzania", "Democratic Republic of the Congo"],
        "Cameroon": ["Republic of the Congo", "Gabon", "Equatorial Guinea", "Nigeria", "Chad", "Central African Republic"],
        "Canary Islands": ["Western Sahara", "Morocco"],
        "Cape Verde": ["Mauritania", "Senegal"],
        "Central African Republic": ["Republic of the Congo", "Cameroon", "Chad", "Sudan", "South Sudan", "Democratic Republic of the Congo"],
        "Ceuta": ["Morocco"],
        "Chad": ["Niger", "Libya", "Cameroon", "Central African Republic", "Sudan"],
        "Comoros": ["Madagascar", "Mozambique"],
        "Cote d\'Ivoire": ["Guinea", "Liberia", "Mali", "Burkina Faso", "Ghana"],
        "Democratic Republic of the Congo": ["Uganda", "Rwanda", "Burundi", "Zambia", "Angola", "Republic of the Congo", "Central African Republic", "South Sudan", "Tanzania"],
        "Djibouti": ["Eritrea", "Ethiopia", "Somalia"],
        "Egypt": ["Libya", "Sudan"],
        "Equatorial Guinea": ["Gabon", "Cameroon"],
        "Eritrea": ["Sudan", "Ethiopia", "Djibouti"],
        "Ethiopia": ["Djibouti", "Somalia", "Kenya", "South Sudan", "Sudan", "Eritrea"],
        "Gabon": ["Equatorial Guinea", "Cameroon", "Republic of the Congo"],
        "Gambia": ["Senegal"],
        "Ghana": ["Cote d\'Ivoire", "Togo", "Burkina Faso"],
        "Guinea": ["Senegal", "Sierra Leone", "Liberia", "Cote d\'Ivoire", "Mali", "Guinea-Bissau"],
        "Guinea-Bissau": ["Senegal", "Guinea"],
        "Kenya": ["Uganda", "Tanzania", "Somalia", "Ethiopia", "South Sudan"],
        "Lesotho": ["South Africa"],
        "Liberia": ["Sierra Leone", "Guinea", "Cote d\'Ivoire"],
        "Libya": ["Tunisia", "Algeria", "Niger", "Chad", "Egypt", "Sudan"],
        "Madagascar": ["Mozambique", "Comoros"],
        "Madeira": [],
        "Malawi": ["Tanzania", "Zambia", "Mozambique"],
        "Mali": ["Algeria", "Niger", "Burkina Faso", "Cote d\'Ivoire", "Guinea", "Senegal", "Mauritania"],
        "Mauritania": ["Western Sahara", "Mali", "Algeria", "Senegal", "Cape Verde"],
        "Mauritius": [],
        "Mayotte": [],
        "Melilla": [],
        "Morocco": ["Canary Islands", "Western Sahara", "Algeria", "Ceuta"],
        "Mozambique": ["Comoros", "Madagascar", "Malawi", "Tanzania", "South Africa", "Zimbabwe", "Zambia"],
        "Namibia": ["Botswana", "South Africa", "Angola", "Zambia", "Zimbabwe"],
        "Niger": ["Mali", "Algeria", "Libya", "Chad", "Nigeria", "Benin", "Burkina Faso"],
        "Nigeria": ["Niger", "Benin", "Cameroon"],
        "Republic of the Congo": ["Gabon", "Cameroon", "Central African Republic", "Democratic Republic of the Congo"],
        "Réunion": [],
        "Rwanda": ["Uganda", "Tanzania", "Burundi", "Democratic Republic of the Congo"],
        "Saint Helena": [],
        "São Tomé and Principe": [],
        "Senegal": ["Gambia", "Mauritania", "Mali", "Guinea-Bissau", "Guinea", "Cape Verde"],
        "Seychelles": [],
        "Sierra Leone": ["Guinea", "Liberia"],
        "Somalia": ["Ethiopia", "Kenya", "Djibouti"],
        "South Africa": ["Lesotho", "Swaziland", "Botswana", "Namibia", "Zimbabwe", "Mozambique"],
        "South Sudan": ["Sudan", "Ethiopia", "Kenya", "Uganda", "Democratic Republic of the Congo", "Central African Republic"],
        "Sudan": ["Egypt", "Libya", "Chad", "Eritrea", "Ethiopia", "South Sudan", "Central African Republic"],
        "Swaziland": ["South Africa", "Mozambique"],
        "Tanzania": ["Kenya", "Burundi", "Rwanda", "Uganda", "Malawi", "Zambia", "Mozambique", "Democratic Republic of the Congo"],
        "Togo": ["Ghana", "Burkina Faso", "Benin"],
        "Tunisia": ["Algeria", "Libya"],
        "Uganda": ["South Sudan", "Kenya", "Rwanda", "Democratic Republic of the Congo", "Tanzania"],
        "Western Sahara": ["Canary Islands", "Morocco", "Mauritania"],
        "Zambia": ["Angola", "Democratic Republic of the Congo", "Tanzania", "Malawi", "Mozambique", "Zimbabwe", "Namibia"],
        "Zimbabwe": ["Zambia", "Botswana", "South Africa", "Mozambique", "Namibia"]
    };

    google.load("visualization", "1.0", {
        packages: ["geochart"]
    });
    google.setOnLoadCallback(completelyDraw);
    
    //randomized avoid country list
    var countriesToAvoid = [];
    
    var avoidIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
    for (var i = 0;i < numberOfAvoidCountries; i++){
        while (countriesToAvoid.indexOf(dataCountries[avoidIndex][0]) >= 0){
            avoidIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        }
        countriesToAvoid.push(dataCountries[avoidIndex][0]);
    }

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
            
            if (currentLevel%4 == 0){
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
            color = avoidColor;
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
                $("#country"+i).css("color",pathColor);
            }
        }
    }
    
    function resetGame() {
        
        dataCountries = [
            ['Country', 'Latitude'],
            ['Algeria', defaultColorIndex],
            ['Angola', defaultColorIndex],
            ['Benin', defaultColorIndex],
            ['Botswana', defaultColorIndex],
            ['Burkina Faso', defaultColorIndex],
            ['Burundi', defaultColorIndex],
            ['Cameroon', defaultColorIndex],
            ['Canary Islands', defaultColorIndex],
            ['Cape Verde', defaultColorIndex],
            ['Central African Republic', defaultColorIndex],
            ['Ceuta', pathColorIndex],
            ['Chad', defaultColorIndex],
            ['Comoros', defaultColorIndex],
            ['Cote d\'Ivoire', defaultColorIndex],
            ['Democratic Republic of the Congo', defaultColorIndex],
            ['Djibouti', defaultColorIndex],
            ['Egypt', defaultColorIndex],
            ['Equatorial Guinea', defaultColorIndex],
            ['Eritrea', defaultColorIndex],
            ['Ethiopia', defaultColorIndex],
            ['Gabon', defaultColorIndex],
            ['Gambia', defaultColorIndex],
            ['Ghana', defaultColorIndex],
            ['Guinea', defaultColorIndex],
            ['Guinea-Bissau', defaultColorIndex],
            ['Kenya', defaultColorIndex],
            ['Lesotho', defaultColorIndex],
            ['Liberia', defaultColorIndex],
            ['Libya', defaultColorIndex],
            ['Madagascar', defaultColorIndex],
            ['Malawi', defaultColorIndex],
            ['Mali', defaultColorIndex],
            ['Mauritania', defaultColorIndex],
            ['Morocco', defaultColorIndex],
            ['Mozambique', defaultColorIndex],
            ['Namibia', defaultColorIndex],
            ['Niger', defaultColorIndex],
            ['Nigeria', defaultColorIndex],
            ['Republic of the Congo', defaultColorIndex],
            ['Rwanda', defaultColorIndex],
            ['Senegal', defaultColorIndex],
            ['Sierra Leone', defaultColorIndex],
            ['Somalia', defaultColorIndex],
            ['Sudan', defaultColorIndex],
            ['South Africa', defaultColorIndex],
            ['South Sudan', defaultColorIndex],
            ['Swaziland', defaultColorIndex],
            ['Tanzania', defaultColorIndex],
            ['Togo', defaultColorIndex],
            ['Tunisia', defaultColorIndex],
            ['Uganda', defaultColorIndex],
            ['Western Sahara', defaultColorIndex],
            ['Zambia', defaultColorIndex],
            ['Zimbabwe', defaultColorIndex]
        ];
        
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
//            +           "<h2>Cash Remaining</h2>"    
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

        while (endCountry === currentCountry || (countriesToAvoid.indexOf(endCountry)>= 0) || (islands.indexOf(endCountry)>= 0) ) {
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
            while (countriesToAvoid.indexOf(avoidCountry) >= 0 || islands.indexOf(avoidCountry)>=0){
                avoidIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
                avoidCountry = dataCountries[avoidIndex][0];
            }
            countriesToAvoid.push(avoidCountry);
        }
        
        for (var countryToAvoidIndex in countriesToAvoid) {
            var countryToAvoid = countriesToAvoid[countryToAvoidIndex];
            var avoidString = "<p><span style='color:" + avoidColor + "'>" + countryToAvoid + "</span></p>";
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
        
        while ((countriesToAvoid.indexOf(currentCountry)>= 0) || (islands.indexOf(currentCountry)>= 0)) {
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
        countryLabelPosition.top += 10;
        countryLabelPosition.left += 20;
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
        
        localStorage.setItem("TutorialPlayed", true);
    }



$(document).ready(function() {
    $('.maptap').each(function() {
        mapTap.setup($(this));
        $(this).css("position", "absolute");
    });
    
    el = document.getElementById("overlay");
    el.style.visibility = "visible";
    
    if( localStorage.getItem("TutorialPlayed") ){
        $("#overlay").hide();
    }
});


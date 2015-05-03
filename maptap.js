var mapTap = (function() {
    var exports = {};
    var africanCountries = [];
    var continents;
    var areas;

    var currentCountry;
    var goalCountry;
    var secondaryGoalCountry;
    var currentCash;
    var startingCash = 155;

    var pathColor = '#5522cc';
    var borderColor = '#cc0000';
    var defaultColor = '#aaaaaa';
    var borderingColor = '#ccdddd';
    var goalColor = '#0C6E30';
    var traderLocationColor = '#E60EE6';
    var avoidColor = 'red';
    var defaultColorIndex = 4;
    var avoidColorIndex = 1;
    var pathColorIndex = 0;
    var traderLocationColorIndex = 3;
    var borderingColorIndex = 2;
    var numberOfAvoidCountries = 4;

    var countriesVisited = [];
    
    var numCountries = 0;

    var dataCountries = [
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
        ['Ceuta', 0],
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
    google.setOnLoadCallback(drawRegionsMap);
    
    //randomized avoid country list
    var countriesToAvoid = [];
    
    var avoidIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
    for (var i = 0;i < numberOfAvoidCountries; i++){
        while (countriesToAvoid.indexOf(dataCountries[avoidIndex][0]) >= 0){
            avoidIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        }
        countriesToAvoid.push(dataCountries[avoidIndex][0]);
    }
    

    console.log(countriesToAvoid);

    

    //Make a map so that when given a country, we know what entry of dataCountries it corresponds to
    for (var dataCountryInd = 1; dataCountryInd < dataCountries.length; dataCountryInd++) {
        var thisCountry = dataCountries[dataCountryInd][0];
        countryToIndexMap[thisCountry] = dataCountryInd;
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
        
        numCountries += 1;
        
        var color = 'rgb(230, 14, 230)';

        currentCountry = country;
        if ($.inArray(country, countriesToAvoid) != -1) {
            color = avoidColor;
            currentCash -= 50;
            dataCountries[index][1] = avoidColorIndex;
            popupAvoid();
        }
        else{
            currentCash -= 5;
            dataCountries[index][1] = traderLocationColorIndex;
        }
        document.getElementById('cashInteger').innerHTML = '$' + currentCash;

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
        
        
        if (goalCountry === country) {
            onWin();
        } else{
            
            if (currentCash <= 0) {
                document.getElementById('cashInteger').innerHTML ='$' + 0;
                onLose();    
            }
            else{
                
                if (currentCash < 50) {
                    $("#objectiveStar3").attr("src","starOutline.png");
                }

                drawRegionsMap()

                if (secondaryGoalCountry === country) {
                    $("#objectiveStar2").attr("src","starFill.png");
                }

                var visitedString = "<tr><td>"+numCountries+".</td><td id = country" + numCountries + " style='color:" + color + "'> " + country + "</td></tr>";
    //            $("#countryLabel").remove();
                $(".countryTableBody").prepend(visitedString);


                for(var i = 1; i <numCountries; i++){
                    $("#country"+i).css("color",pathColor);
                }
            }
        }
        
    }
    
    function drawCashLabel(lostCash){
        var canvas = document.getElementById("traderCanvas");
        var ctx = canvas.getContext("2d");   
        
    }

    function onLose() {
        if (confirm("You ran out of goods! Try again?") == true) {
            newGame();
        }
    }

    function onWin() {
        $("#objectiveStar1").attr("src","starFill.png");
        if (confirm("You won! Try again?") == true) {
            newGame();
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

        $(".objectivesTab").empty();
        $(".avoidTab").empty();
        $(".countryTableBody").empty();

//        $(".objectivesTab").append("<h1>Objective</h1>");
        $(".avoidTab").append("<h1>Avoid</h1>");

        currentCash = startingCash;
        document.getElementById('cashInteger').innerHTML = currentCash;
        numCountries = 0;
    }

    function Model() {

    };

    function View(div, model) {

        div.append("<div class = 'container-fluid well'>"
            +   "<div class = 'row-fluid'>"              
            +       "<div class = 'container mapContainer'>"
            +           "<div id = 'mapDiv'>"
            +           "</div>"
            +           '<canvas id="traderCanvas"> </canvas>'
            +       "</div>"
            +   "<div class = 'column column1'>"
            +       "<div class = 'row-fluid'>"
//            +           "<div class = 'cash'>"
            +               "<h1 id='cashInteger' style='color:green'></h1>"
//            +           "</div>"
            +           "<div class = 'countries_visited'>"
            +               "<table class = 'countryTable'><thead></thead><tbody class = 'countryTableBody'></tbody></table>"       
            +           "</div>"
            +       "</div>"
            +   "</div>"       
            +   "<div class = 'column column2'>"
            +           "<div class = 'objectivesTab'>"
            +           "</div>"
            +           "<div class = 'avoidTab'>"
            +           "</div>"
            +   "</div>"     
            +   "</div>"
            + "<div class='whiteCover'></div>"
            +"</div>");
        

        $(".countries_visited").prepend("<h1>Traveled to: </h1>");
        $(".cash").prepend("<h1 style='color:green'>$</h1>");
        $(".avoidTab").append("<h1>Avoid</h1>");
        
    };



    var setup = function(div) {
        var model = Model();
        var view = View(div, model);
        exports.view = view;
        exports.model = model;
        newGame();
    };

    var newGame = function() {
        
        resetGame();

        var newCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        while ((countriesToAvoid.indexOf(dataCountries[newCountryIndex][0])>= 0)) {
            newCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        }
        
        currentCountry = dataCountries[newCountryIndex][0];
        dataCountries[newCountryIndex][1] = traderLocationColorIndex;
        countriesVisited = [currentCountry];

        addCountryToPath(currentCountry, newCountryIndex);

        var endCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        while (endCountryIndex === newCountryIndex || (countriesToAvoid.indexOf(dataCountries[endCountryIndex][0])>= 0)) {
            endCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        }
        var endCountry = dataCountries[endCountryIndex][0];
        goalCountry = endCountry;
        
        var secondaryCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        while (secondaryCountryIndex === newCountryIndex || secondaryCountryIndex === endCountryIndex || (countriesToAvoid.indexOf(dataCountries[secondaryCountryIndex][0])>= 0)) {
            secondaryCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        }
        var secondaryCountry = dataCountries[secondaryCountryIndex][0];
        secondaryGoalCountry = secondaryCountry;

//        var objectiveString = "<div class='row'><div class='span2'><img src='starOutline.png' height='15px'></div><div class='span4'><p>Starting at <span style='color:" + pathColor + "'>" + newCountry + "</span>, try to get to <span style='color:" + goalColor + "'>" + endCountry + "</span></p></div></div>";
        var objectiveString = "<div class='objectives'><img src='starOutline.png' id='objectiveStar1'><p>Go to <span style='color:" + goalColor + "'>" + endCountry + "</span></div>";
        $(".objectivesTab").append(objectiveString);
        var secondaryObjectiveString = "<div class='objectives'><img src='starOutline.png' id='objectiveStar2'><p>Stop by <span style='color:" + goalColor + "'>" + secondaryCountry + "</span></p></div>";
        $(".objectivesTab").append(secondaryObjectiveString);
        var moneyObjective = "<div class='objectives'><img src='starFill.png' id='objectiveStar3'><p>Have <span style='color:" + goalColor + "'>$50</span> remaining</p></div>";
        $(".objectivesTab").append(moneyObjective);
        
        
        for (var countryToAvoidIndex in countriesToAvoid) {
            var countryToAvoid = countriesToAvoid[countryToAvoidIndex];
            var avoidString = "<p><span style='color:" + avoidColor + "'>" + countryToAvoid + "</span></p>";
            $(".avoidTab").append(avoidString);
        }

    }

    exports.setup = setup;

    return exports;
}());

$(document).ready(function() {
    $('.maptap').each(function() {
        mapTap.setup($(this));
        $(this).css("position", "absolute");
    });

});


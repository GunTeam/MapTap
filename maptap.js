var mapTap = (function() {
    var exports = {};
    var africanCountries = [];
    var continents;
    var areas;

    var currentCountry;
    var goalCountry;
    var secondaryGoalCountry;
    var currentCash;
    var startingCash = 125;

    var pathColor = '#5522cc';
    var borderColor = '#cc0000';
    var defaultColor = '#aaaaaa';
    var borderingColor = '#ccdddd';
    var goalColor = '#0C6E30';
    var traderLocationColor = '#E60EE6';
    var avoidColor = 'red';
    var defaultColorIndex = 0;
    var avoidColorIndex = 1;
    var pathColorIndex = 2;
    var traderLocationColorIndex = 3;
    var borderingColorIndex = 4;

    var countriesVisited = [];

    var dataCountries = [
        ['Country', 'Latitude'],
        ['Algeria', 0],
        ['Angola', 0],
        ['Benin', 0],
        ['Botswana', 0],
        ['Burkina Faso', 0],
        ['Burundi', 0],
        ['Cameroon', 0],
        ['Canary Islands', 0],
        ['Cape Verde', 0],
        ['Central African Republic', 0],
        ['Ceuta', 0],
        ['Chad', 0],
        ['Comoros', 0],
        ['Cote d\'Ivoire', 0],
        ['Democratic Republic of the Congo', 0],
        ['Djibouti', 0],
        ['Egypt', 0],
        ['Equatorial Guinea', 0],
        ['Eritrea', 0],
        ['Ethiopia', 0],
        ['Gabon', 0],
        ['Gambia', 0],
        ['Ghana', 0],
        ['Guinea', 0],
        ['Guinea-Bissau', 0],
        ['Kenya', 0],
        ['Lesotho', 0],
        ['Liberia', 0],
        ['Libya', 0],
        ['Madagascar', 0],
        ['Malawi', 0],
        ['Mali', 0],
        ['Mauritania', 0],
        ['Morocco', 0],
        ['Mozambique', 0],
        ['Namibia', 0],
        ['Niger', 0],
        ['Nigeria', 0],
        ['Republic of the Congo', 0],
        ['Rwanda', 0],
        ['Senegal', 0],
        ['Sierra Leone', 0],
        ['Somalia', 0],
        ['Sudan', 0],
        ['South Africa', 0],
        ['South Sudan', 0],
        ['Swaziland', 0],
        ['Tanzania', 0],
        ['Togo', 0],
        ['Tunisia', 0],
        ['Uganda', 0],
        ['Western Sahara', 0],
        ['Zambia', 0],
        ['Zimbabwe', 0]
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

    var countriesToAvoid = ['Comoros', 'Senegal', 'Zambia', 'Kenya'];

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
                colors: [defaultColor, borderColor, pathColor , traderLocationColor, borderingColor]
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
        
        var color = 'rgb(230, 14, 230)';

        currentCountry = country;
        if ($.inArray(country, countriesToAvoid) != -1) {
            color = avoidColor;
            currentCash -= 50;
            document.getElementById('cashInteger').innerHTML = currentCash;
                dataCountries[index][1] = avoidColorIndex;

        }
        else{
            currentCash -= 5;
            document.getElementById('cashInteger').innerHTML = currentCash;
                dataCountries[index][1] = traderLocationColorIndex;

        }
        

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
        } else {
            drawRegionsMap()

            var visitedString = "<h2 id='countryLabel' style='color:" + color + "'>" + country + "</h2>";
//            $(".countries_visited").append(visitedString);
            $("#countryLabel").remove();
            $(".countries_visited").append(visitedString);
            
        }
        
    }

    function onLose() {
        if (confirm("You ran out of goods! Try again?") == true) {
            newGame();
        }
    }

    function onWin() {
        if (confirm("You won! Try again?") == true) {
            newGame();
        }
    }

    function resetGame() {
        dataCountries = [
            ['Country', 'Latitude'],
            ['Algeria', 0],
            ['Angola', 0],
            ['Benin', 0],
            ['Botswana', 0],
            ['Burkina Faso', 0],
            ['Burundi', 0],
            ['Cameroon', 0],
            ['Canary Islands', 0],
            ['Cape Verde', 0],
            ['Central African Republic', 0],
            ['Ceuta', 0],
            ['Chad', 0],
            ['Comoros', 0],
            ['Cote d\'Ivoire', 0],
            ['Democratic Republic of the Congo', 0],
            ['Djibouti', 0],
            ['Egypt', 0],
            ['Equatorial Guinea', 0],
            ['Eritrea', 0],
            ['Ethiopia', 0],
            ['Gabon', 0],
            ['Gambia', 0],
            ['Ghana', 0],
            ['Guinea', 0],
            ['Guinea-Bissau', 0],
            ['Kenya', 0],
            ['Lesotho', 0],
            ['Liberia', 0],
            ['Libya', 0],
            ['Madagascar', 0],
            ['Malawi', 0],
            ['Mali', 0],
            ['Mauritania', 0],
            ['Morocco', 0],
            ['Mozambique', 0],
            ['Namibia', 0],
            ['Niger', 0],
            ['Nigeria', 0],
            ['Republic of the Congo', 0],
            ['Rwanda', 0],
            ['Senegal', 0],
            ['Sierra Leone', 0],
            ['Somalia', 0],
            ['Sudan', 0],
            ['South Africa', 0],
            ['South Sudan', 0],
            ['Swaziland', 0],
            ['Tanzania', 0],
            ['Togo', 0],
            ['Tunisia', 0],
            ['Uganda', 0],
            ['Western Sahara', 0],
            ['Zambia', 0],
            ['Zimbabwe', 0]
        ];

        $(".objectivesTab").empty();
        $(".countries_visited").empty();
        $(".avoidTab").empty();

        $(".countries_visited").append("<h1>You are in</h1>");
        $(".objectivesTab").append("<h1>Objective</h1>");
        $(".avoidTab").append("<h1>Avoid</h1>");

        currentCash = startingCash;
        document.getElementById('cashInteger').innerHTML = currentCash;

    }

    function Model() {

    };

    function View(div, model) {

        div.append("<div class = 'container-fluid well'>"
            +   "<div class = 'row-fluid'>"              
            +       "<div class = 'container mapContainer'>"
            +           "<div id = 'mapDiv'>"
            +           "</div>"
            +       "</div>"
            +   "<div class = 'column column1'>"
            +       "<div class = 'row-fluid'>"
            +           "<div class = 'cash'>"
            +               "<p id='cashInteger'>125</p>"
            +           "</div>"
            +           "<div class = 'countries_visited'>"
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
            +"</div>");
        

        $(".cash").prepend("<h1>Cash Remaining</h1>");
        $(".countries_visited").append("<h1>You are in</h1>");
        $(".objectivesTab").append("<h1>Objective</h1>");
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
        var newCountry = dataCountries[newCountryIndex][0];
        currentCountry = newCountry;
        dataCountries[newCountryIndex][1] = pathColorIndex;
        countriesVisited = [newCountry];

        addCountryToPath(newCountry, newCountryIndex);

        var endCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        while (endCountryIndex === newCountryIndex) {
            endCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        }
        var endCountry = dataCountries[endCountryIndex][0];
        goalCountry = endCountry;
        
        var secondaryCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        while (secondaryCountryIndex === newCountryIndex || secondaryCountryIndex === endCountryIndex) {
            secondaryCountryIndex = Math.floor(Math.random() * (dataCountries.length - 1)) + 1;
        }
        var secondaryCountry = dataCountries[secondaryCountryIndex][0];
        secondaryGoalCountry = secondaryCountry;

//        var objectiveString = "<div class='row'><div class='span2'><img src='starOutline.png' height='15px'></div><div class='span4'><p>Starting at <span style='color:" + pathColor + "'>" + newCountry + "</span>, try to get to <span style='color:" + goalColor + "'>" + endCountry + "</span></p></div></div>";
        var objectiveString = "<div class='row'><div class='span2'><img src='starOutline.png' height='15px'></div><div class='span4'><p>Go to <span style='color:" + goalColor + "'>" + endCountry + "</span></p></div></div>";
        $(".objectivesTab").append(objectiveString);

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
    });

});


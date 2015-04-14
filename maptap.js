var mapTap = (function () {
    var exports = {};
    var africanCountries = [];
    var continents;
    var areas;
    
    var currentCountry;
    
    var pathColor = '#5522cc';
    var borderColor = '#cc0000';
    var defaultColor = '#ffffff';
    var goalColor = '#0C6E30';
    var avoidColor = 'red';
    
    var dataCountries = [
          ['Country',   'Latitude'],
          ['Algeria', 0], ['Angola', 0], ['Benin', 0], ['Botswana', 0],
          ['Burkina Faso', 0], ['Burundi', 0], ['Cameroon', 0],
          ['Canary Islands', 0], ['Cape Verde', 0],
          ['Central African Republic', 0], ['Ceuta', 0], ['Chad', 0],
          ['Comoros', 0], ['Cote d\'Ivoire', 0],
          ['Democratic Republic of the Congo', 0], ['Djibouti', 0],
          ['Egypt', 0], ['Equatorial Guinea', 0], ['Eritrea', 0],
          ['Ethiopia', 0], ['Gabon', 0], ['Gambia', 0], ['Ghana', 0],
          ['Guinea', 0], ['Guinea-Bissau', 0], ['Kenya', 0],
          ['Lesotho', 0], ['Liberia', 0], ['Libya', 0], ['Madagascar', 0],
          ['Madeira', 0], ['Malawi', 0], ['Mali', 0], ['Mauritania', 0],
          ['Mauritius', 0], ['Mayotte', 0], ['Melilla', 0],
          ['Morocco', 0], ['Mozambique', 0], ['Namibia', 0],
          ['Niger', 0], ['Nigeria', 0], ['Republic of the Congo', 0],
          ['Réunion', 0], ['Rwanda', 0], ['Saint Helena', 0],
          ['São Tomé and Principe', 0], ['Senegal', 0],
          ['Seychelles', 0], ['Sierra Leone', 0], ['Somalia', 0],
          ['Sudan', 0], ['South Africa', 0], ['South Sudan', 0],
          ['Swaziland', 0], ['Tanzania', 0], ['Togo', 0], ['Tunisia', 0],
          ['Uganda', 0], ['Western Sahara', 0], ['Zambia', 0],
          ['Zimbabwe', 0]
        ];
    
        var borderDictionary = {
            "Algeria":["Morocco","Western Sahara","Mauritania","Mali","Niger","Tunisia","Libya"],
            "Angola":["Democratic Republic of the Congo","Zambia","Namibia"],
            "Benin":["Togo","Burkina Faso","Niger","Nigeria"],
            "Botswana":["Namibia","Zimbabwe","South Africa"],
            "Burkina Faso":["Mali","Niger","Benin","Togo","Ghana","Cote d'Ivoire"],
            "Burundi":["Rwanda","Tanzania","Democratic Republic of the Congo"],
            "Cameroon":["Republic of the Congo","Gabon","Equatorial Guinea","Nigeria","Chad","Central African Republic"],
            "Canary Islands":["Western Sahara","Morocco"],
            "Cape Verde":["Mauritania","Senegal"],
            "Central African Republic":["Republic of the Congo","Cameroon","Chad","Sudan","South Sudan", "Democratic Republic of the Congo"],
            "Ceuta":["Morocco"],
            "Chad":["Niger","Libya","Cameroon","Central African Republic","Sudan"],
            "Comoros":["Madagascar","Mozambique"],
            "Cote d'Ivoire":["Guinea","Liberia","Mali","Burkina Faso","Ghana"],
            "Democratic Republic of the Congo":["Uganda","Rwanda","Burundi","Zambia","Angola","Republic of the Congo","Central African Republic","South Sudan"],
            "Djibouti":["Eritrea","Ethiopia","Somalia"],
            "Egypt":["Libya","Sudan"],
            "Equatorial Guinea":["Gabon","Cameroon"],
            "Eritrea":["Sudan","Ethiopia","Djibouti"],
            "Ethiopia":["Djibouti","Somalia","Kenya","South Sudan","Sudan"],
            "Gabon":["Equatorial Guinea","Cameroon","Republic of the Congo"],
            "Gambia":["Senegal"],
            "Ghana":["Cote d’Ivoire","Togo","Burkina Faso"],
            "Guinea":["Senegal","Sierra Leone","Liberia","Ivory Coast","Mali","Guinea-Bissau"],
            "Guinea-Bissau":["Senegal","Guinea"],
            "Kenya":["Uganda","Tanzania","Somalia","Ethiopia","South Sudan"],
            "Lesotho":["South Africa"],
            "Liberia":["Sierra Leone", "Guinea","Cote d’Ivoire"],
            "Libya":["Tunisia","Algeria","Niger","Chad","Egypt","Sudan"],
            "Madagascar":["Mozambique","Comoros"],
            "Madeira":[],
            "Malawi":["Tanzania","Zambia","Mozambique"],
            "Mali":["Algeria","Niger","Burkina Faso","Cote d’Ivoire","Guinea","Senegal","Mauritania"],
            "Mauritania":["Western Sahara","Mali","Algeria","Senegal","Cape Verde"],
            "Mauritius":[],
            "Mayotte":[],
            "Melilla":[],
            "Morocco":["Canary Islands","Western Sahara","Algeria","Ceuta"],
            "Mozambique":["Comoros","Madagascar","Malawi","Tanzania","South Africa","Zimbabwe","Zambia"],
            "Namibia":["Botswana","South Africa","Angola","Zambia","Zimbabwe"],
            "Niger":["Mali","Algeria","Libya","Chad","Nigeria","Benin","Burkina Faso"],
            "Nigeria":["Niger","Benin","Cameroon"],
            "Republic of the Congo":["Gabon","Cameroon","Central African Republic","Democratic Republic of the Congo"],
            "Réunion":[],
            "Rwanda":["Uganda","Tanzania","Burundi","Democratic Republic of the Congo"],
            "Saint Helena":[],
            "São Tomé and Principe":[],
            "Senegal":["Gambia","Mauritania","Mali","Guinea-Bissau","Guinea","Cape Verde"],
            "Seychelles":[],
            "Sierra Leone":["Guinea","Liberia"],
            "Somalia":["Ethiopia","Kenya","Djibouti"],
            "South Africa":["Lesotho","Swaziland","Botswana","Namibia","Zimbabwe","Mozambique"],
            "South Sudan":["Sudan","Ethiopia","Kenya","Uganda","Democratic Republic of the Congo","Central African Republic"],
            "Sudan":["Egypt","Libya","Chad","Eritrea","Ethiopia","South Sudan","Central African Republic"],
            "Swaziland":["South Africa","Mozambique"],
            "Tanzania":["Kenya","Burundi","Rwanda","Uganda","Malawi","Zambia","Mozambique"],
            "Togo":["Ghana","Burkina Faso","Benin"],
            "Tunisia":["Algeria","Libya"],
            "Uganda":["South Sudan","Kenya","Rwanda","Democratic Republic of the Congo","Tanzania"],
            "Western Sahara":["Canary Islands","Morocco","Mauritania"],
            "Zambia":["Angola","Democratic Republic of the Congo","Tanzania","Malawi","Mozambique","Zimbabwe","Namibia"],
            "Zimbabwe":["Zambia","Botswana","South Africa","Mozambique","Namibia"]
    };
    
    google.load("visualization", "1.0", {packages:["geochart"]});
    google.setOnLoadCallback(drawRegionsMap);
    
    var countriesToAvoid = ['Comoros','Senegal','Zambia', 'Kenya'];
    
    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(dataCountries);
        
        var options = {
            region: '002',
            colorAxis: {colors: [defaultColor, borderColor, pathColor]},
            datalessRegionColor: '#ffffff',
            defaultColor: '#ffffff',
            tooltip : {trigger : "none"}
        };
        
        var chart = new google.visualization.GeoChart(document.getElementById('mapDiv'));
        chart.draw(data, options);        
        
        google.visualization.events.addListener(chart, 'select', mapClickHandler);
    
        function mapClickHandler(){
            var selection = chart.getSelection();
            var index = selection[0].row + 1;
            var country = dataCountries[index][0];
            if (borderDictionary[currentCountry].indexOf(country)>=0){
                currentCountry = country;
                dataCountries[index][1] = 1;


                var color = "black";

                if($.inArray(country, countriesToAvoid) != -1){
                    color = avoidColor; 
                    dataCountries[index][1] = .5;

                }
                drawRegionsMap()


                var visitedString = "<p style='color:"+color+"'>"+country+"</p>";
                $(".countries_visited").append(visitedString);    
            }
        }
    }

    function Model(){
        
//        $.getJSON('countries.json', function(data) {
//            for(var i = 0; i < data.length; i ++){
//                if( data[i].ContinentName === "Africa"){
//                    africanCountries.push(data[i]);    
//                }
//            }
//        });
        
//        /**
//         * Define country codes and which continent they belong to
//         */
//        continents = {
//                africa       : [ "AO","BF","BI","BJ","BW","CD","CF","CG","CI","CM","DJ","DZ","EG","ER","ET","GA","GH","GM","GN","GQ","GW","KE","LR","LS","LY","MA","MG","ML","MR","MW","MZ","NA","NE","NG","RW","SD","SL","SN","SO","SS","SZ","TD","TG","TN","TZ","UG","ZA","ZM","ZW","EH","KM","GO","JU","SH","ST","YT","BV","CV","SC" ],
//                asia         : [ "AE","AF","BD","BN","BT","CN","ID","IL","IN","IQ","IR","JO","JP","KG","KH","KP","KR","KW","KZ","LA","LB","LK","MM","MN","MY","NP","OM","PH","PK","PS","QA","SA","SY","TH","TJ","TL","TM","TW","UZ","VN","YE","HK","MV","BH","SG" ],
//                europe       : [ "AL","AM","AT","AZ","BA","BE","BG","BY","CH","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GE","GR","HR","HU","IE","IS","IT","LT","LU","LV","MD","ME","MK","NL","NO","PL","PT","RO","RS","SE","SI","SJ","SK","TR","UA","RU","VA","MT","MC","XK","LI","IM","GI","FO","AD","AX","GG","SM" ],
//                northAmerica : [ "BS","BZ","CA","CR","CU","DO","GL","GT","HN","HT","JM","MX","NI","PA","PR","SV","US","AG","AW","BB","BL","GD","KN","LC","MQ","TC","VG","AI","BM","DM","PM","GP","KY","MF","MS","SX","TT","VC","VI","BQ","CW" ],
//                southAmerica : [ "AR","BO","BR","CL","CO","EC","FK","GF","GY","PE","PY","SR","UY","VE","GS" ],
//                oceania      : [ "AS","AU","BN","CC","CX","FJ","FM","GU","HM","IO","KI","MH","MO","MP","MU","NC","NF","NR","NU","NZ","PG","PW","RE","SB","TF","TK","TL","TO","TV","VU","WF","WS","CK","PF","PN" ]
//            };
//
//        /**
//         * Format areas array for all continents
//         */
//        areas = [];
//        for ( var x in continents["africa"] ) {
//            areas.push( {
//              id: continents["africa"][x],
//              groupId: "africa"
//            } );
//        }

    };
    
    function View(div, model){
        
        div.append("<div class = 'container-fluid well'>"
            +   "<div class = 'row-fluid'>"
            +   "<div class = 'col-md-3'>"
            +       "<div class = 'row-fluid'>"
            +           "<div class = 'cash'>" 
            +           "</div>"
            +           "<div class = 'countries_visited'>"
            +           "</div>"
            +       "</div>"
            +   "</div>"                     
            +   "<div class = 'col-md-6'>"
            +       "<div class = 'container mapContainer'>"
            +           "<div id = 'mapDiv'>"
            +           "</div>"
            +       "</div>"
            +   "</div>"   
            +   "<div class = 'col-md-3'>"
            +           "<div class = 'objectivesTab'>"
            +           "</div>"
            +           "<div class = 'avoidTab'>"
            +           "</div>"
            +   "</div>"     
            +   "</div>"
            +"</div>");
        
        $(".cash").append("<h1>Cash Remaining</h1>");
        $(".countries_visited").append("<h1>Countries Visited</h1>");
        $(".objectivesTab").append("<h1>Objective</h1>");
        $(".avoidTab").append("<h1>Avoid</h1>");
        
//        var map = AmCharts.makeChart("mapDiv", {
//
//            "type": "map",
//            "theme": "none",
//            "pathToImages": "http://www.amcharts.com/lib/3/images/",
//
//            "dataProvider": {
//                "map": "worldHigh",
//                "getAreasFromMap": false,
//                "areas": areas
//            },
//            "areasSettings": {
//                "autoZoom": false,
//                "selectable": true,
//                "rollOverColor": "#CC0000",
//                "selectedColor": "#CC0000"
//            }
//        });


//        var obj = map.selectedObject;
//        map.addListener( "clickMapObject", function ( event ) {
//          console.log(map.selectedObject);
//            map.selectedObject
//        } );
    };
    
    
    
    var setup = function (div) {
        var model = Model();
        var view = View(div, model);        
        exports.view = view;
        exports.model = model;
        
        newGame();
    };
    
    var newGame = function(){
        var newCountryIndex = Math.floor(Math.random()*(dataCountries.length-1))+1;
        var newCountry = dataCountries[newCountryIndex][0];
        currentCountry = newCountry;
        dataCountries[newCountryIndex][1] = 1;
        
        var endCountryIndex = Math.floor(Math.random()*(dataCountries.length-1))+1;
        while(endCountryIndex === newCountryIndex){
            endCountryIndex = Math.floor(Math.random()*(dataCountries.length-1))+1;
        }
        var endCountry = dataCountries[endCountryIndex][0];
        
        var objectiveString = "<p>Starting at <span style='color:"+pathColor+"'>"+newCountry+"</span>, try to get to <span style='color:"+goalColor+"'>"+endCountry+"</span></p>";
        $(".objectivesTab").append(objectiveString);   
        
        for(var countryToAvoidIndex in countriesToAvoid){
            var countryToAvoid = countriesToAvoid[countryToAvoidIndex];
            var avoidString = "<p><span style='color:"+avoidColor+"'>"+countryToAvoid+"</span></p>";
            $(".avoidTab").append(avoidString);   
        }
        
        drawRegionsMap()
    }
    
    exports.setup = setup;
    
    return exports;
}());

$(document).ready(function(){
    $('.maptap').each(function () {
        mapTap.setup($(this));
    });

});
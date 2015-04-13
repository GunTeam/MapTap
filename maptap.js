var mapTap = (function () {
    var exports = {};
    var africanCountries = [];
    var continents;
    var areas;
    
    google.load("visualization", "1.0", {packages:["geochart"]});
    google.setOnLoadCallback(drawRegionsMap);
    
    var dataCountries = [
          ['Country',   'Latitude'],
          ['Algeria', null], ['Angola', null], ['Benin', null], ['Botswana', null],
          ['Burkina Faso', null], ['Burundi', null], ['Cameroon', null],
          ['Canary Islands', null], ['Cape Verde', null],
          ['Central African Republic', null], ['Ceuta', null], ['Chad', null],
          ['Comoros', null], ['Cote d\'Ivoire', null],
          ['Democratic Republic of the Congo', null], ['Djibouti', null],
          ['Egypt', null], ['Equatorial Guinea', null], ['Eritrea', null],
          ['Ethiopia', null], ['Gabon', 0], ['Gambia', null], ['Ghana', null],
          ['Guinea', null], ['Guinea-Bissau', null], ['Kenya', 0],
          ['Lesotho', null], ['Liberia', null], ['Libya', null], ['Madagascar', null],
          ['Madeira', null], ['Malawi', null], ['Mali', null], ['Mauritania', null],
          ['Mauritius', null], ['Mayotte', null], ['Melilla', null],
          ['Morocco', null], ['Mozambique', null], ['Namibia', null],
          ['Niger', null], ['Nigeria', null], ['Republic of the Congo', null],
          ['Réunion', null], ['Rwanda', null], ['Saint Helena', null],
          ['São Tomé and Principe', null], ['Senegal', null],
          ['Seychelles', null], ['Sierra Leone', null], ['Somalia', null],
          ['Sudan', null], ['South Africa', null], ['South Sudan', null],
          ['Swaziland', null], ['Tanzania', null], ['Togo', null], ['Tunisia', null],
          ['Uganda', null], ['Western Sahara', null], ['Zambia', null],
          ['Zimbabwe', null]
        ];
    
    var countriesToAvoid = ['Comoros','Senegal','Zambia', 'Kenya'];
    
    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(dataCountries);
        
        var options = {
            region: '002',
            colorAxis: {colors: ['#ffffff']},
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
            
            var color = "black";
            
            if($.inArray(country, countriesToAvoid) != -1){
                color = "red";    
            }
            
            var visitedString = "<p style='color:"+color+"'>"+country+"</p>";
            $(".countries_visited").append(visitedString);    
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
        
        /**
         * Define country codes and which continent they belong to
         */
        continents = {
                africa       : [ "AO","BF","BI","BJ","BW","CD","CF","CG","CI","CM","DJ","DZ","EG","ER","ET","GA","GH","GM","GN","GQ","GW","KE","LR","LS","LY","MA","MG","ML","MR","MW","MZ","NA","NE","NG","RW","SD","SL","SN","SO","SS","SZ","TD","TG","TN","TZ","UG","ZA","ZM","ZW","EH","KM","GO","JU","SH","ST","YT","BV","CV","SC" ],
                asia         : [ "AE","AF","BD","BN","BT","CN","ID","IL","IN","IQ","IR","JO","JP","KG","KH","KP","KR","KW","KZ","LA","LB","LK","MM","MN","MY","NP","OM","PH","PK","PS","QA","SA","SY","TH","TJ","TL","TM","TW","UZ","VN","YE","HK","MV","BH","SG" ],
                europe       : [ "AL","AM","AT","AZ","BA","BE","BG","BY","CH","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GE","GR","HR","HU","IE","IS","IT","LT","LU","LV","MD","ME","MK","NL","NO","PL","PT","RO","RS","SE","SI","SJ","SK","TR","UA","RU","VA","MT","MC","XK","LI","IM","GI","FO","AD","AX","GG","SM" ],
                northAmerica : [ "BS","BZ","CA","CR","CU","DO","GL","GT","HN","HT","JM","MX","NI","PA","PR","SV","US","AG","AW","BB","BL","GD","KN","LC","MQ","TC","VG","AI","BM","DM","PM","GP","KY","MF","MS","SX","TT","VC","VI","BQ","CW" ],
                southAmerica : [ "AR","BO","BR","CL","CO","EC","FK","GF","GY","PE","PY","SR","UY","VE","GS" ],
                oceania      : [ "AS","AU","BN","CC","CX","FJ","FM","GU","HM","IO","KI","MH","MO","MP","MU","NC","NF","NR","NU","NZ","PG","PW","RE","SB","TF","TK","TL","TO","TV","VU","WF","WS","CK","PF","PN" ]
            };

        /**
         * Format areas array for all continents
         */
        areas = [];
        for ( var x in continents["africa"] ) {
            areas.push( {
              id: continents["africa"][x],
              groupId: "africa"
            } );
        }

    };
    
    function View(div, model){
        
        div.append("<div class = 'container-fluid well'>"
            +   "<div class = 'row-fluid'>"
            +   "<div class = 'col-md-3'>"
            +       "<div class = 'row-fluid'>"
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
            +   "</div>"     
            +   "</div>"
            +"</div>");
        
        $(".countries_visited").append("<h1>Countries Visited</h1>");
        $(".objectivesTab").append("<h1>Objective</h1>");
        
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
    };
    
    exports.setup = setup;
    
    return exports;
}());

$(document).ready(function(){
    $('.maptap').each(function () {
        mapTap.setup($(this));
    });

});
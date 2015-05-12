    var continents;
    var areas;

    var currentCountryIndex;
    var currentCountry;
    var goalCountry;
    var secondaryGoalCountry;
    var currentCash;
    var startingCash = 155;

    var pathColor = '#98DB89';
    var borderColor = '#D94756'; //avoid color don't ask me why
    var defaultColor = '#dddddd';
    var borderingColor = '#f8fac8';
    var goalColor = '#0C6E30';
    var traderLocationColor = 'green';//'#E60EE6';
    var whiteColor = '#ffffff';
    var avoidColor = 'red';
    var defaultColorIndex = 4;
    var avoidColorIndex = 1;
    var pathColorIndex = 0;
    var traderLocationColorIndex = 3;
    var borderingColorIndex = 2;
   
    var numberOfAvoidCountries = 2;
    var currentLevel = 0;
    var avoidPenalty = 30;
    var cashReward = 25;

    var countriesVisited = [];
    var countriesToAvoid = [];

    var numCountries = 0;

    var score = 0;

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

    var googleIndexing = {
        556: "Morocco",
        536: "Algeria",
        582: "Tunisia",
        555: "Libya",
        539: "Egypt",
        571: "Sudan",
        542: "Eritrea",
        535: "Djibouti",
        543: "Ethiopia",
        575: "Somalia",
        551: "Kenya",
        586: "Tanzania",
        564: "Mozambique",
        563: "Malawi",
        559: "Madagascar",
        589: "South Africa",
        578: "Swaziland",
        592: "Lesotho",
        524: "Botswana",
        565: "Namibia",
        520: "Angola",
        590: "Zambia",
        591: "Zimbabwe",
        525: "Democratic Republic Of The Congo",
        587: "Uganda",
        569: "Rwanda",
        522: "Burundi",
        576: "South Sudan",
        526: "Central African Republic",
        579: "Chad",
        529: "Cameroon",
        549: "Equatorial Guinea",
        544: "Gabon",
        567: "Nigeria",
        523: "Benin",
        580: "Togo",
        545: "Ghana",
        528: "Cote d 'Ivoire",
        554: "Liberia",
        573: "Sierra Leone",
        547: "Guinea",
        550: "Guinea Bissau",
        574: "Senegal",
        546: "Gambia",
        561: "Mauritania",
        540: "Western Sahara",
        560: "Mali",
        521: "Burkina Faso",
        566: "Niger",
        527: "Republic of the Congo"
    };

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

    var islands = ["Ceuta", "Cape Verde", "Canary Islands", "Comoros"];
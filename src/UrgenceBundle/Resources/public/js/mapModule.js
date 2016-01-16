var mapModule = (function() {
    
    function init(map_id) {
        var map = initMap(map_id);
        return map;
    };
    
    function initMap(map_id) {
        L.mapbox.accessToken = 'pk.eyJ1IjoiY3BpZ25vbi1oYWNrYXRob24iLCJhIjoiY2lqZ3lsa2tkMDAwbnZ3bHcyaHRkNW11aiJ9.As9ZnOACkGzvktaRkLndrA';
        var map = L.mapbox.map(map_id, 'mapbox.streets')
            .addControl(L.mapbox.geocoderControl('mapbox.places', {autocomplete: true})).setView([48.89668, 2.3185], 16);
        
        return map;
    };
    
    function addFakeData(map) {
        // Ajout de markers
        for(i = 0; i < 10; i++) {
            var rlat = Math.random()/1000;
            var rlong = Math.random()/1000;
            L.mapbox.featureLayer({
                // this feature is in the GeoJSON format: see geojson.org
                // for the full specification
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    // coordinates here are in longitude, latitude order because
                    // x, y is the standard for GeoJSON and many formats
                    coordinates: [
                      2.3185+rlong,
                      48.89668+rlat
                    ]
                },
                properties: {
                    title: 'Peregrine Espresso',
                    description: '1718 14th St NW, Washington, DC',
                    // one can customize markers by adding simplestyle properties
                    // https://www.mapbox.com/guides/an-open-platform/#simplestyle
                    'marker-size': 'large',
                    'marker-color': '#DB1616',
                    'marker-symbol': 'marker'
                }
            }).addTo(map);
        }
        
        // Ajout d'une zone de type 'Cercle'
        // Define circle options
        // http://leafletjs.com/reference.html#circle
        var circle_options = {
            color: '#db1616',      // Stroke color
            opacity: 1,         // Stroke opacity
            weight: 10,         // Stroke weight
            fillColor: '#FF8585',  // Fill color
            fillOpacity: 0.6    // Fill opacity
        };

        var circle = L.circle([48.89668, 2.3185], 200, circle_options).addTo(map);
        
        // Ajout d'une zone de type 'Polygone'
        // Create array of lat,lon points.
        var line_points = [
            [48.89782, 2.32278],
            [48.89781, 2.32572],
            [48.8968, 2.32757],
            [48.89566, 2.32656],
            [48.89534, 2.32443],
            [48.89782, 2.32278]
        ];

        // Define polyline options
        // http://leafletjs.com/reference.html#polyline
        var polyline_options = {
            color: '#000'
        };

        // Defining a polygon here instead of a polyline will connect the
        // endpoints and fill the path.
        // http://leafletjs.com/reference.html#polygon
        var polyline = L.polyline(line_points, polyline_options).addTo(map);
    };
    
    return {
        init: init,
        addFakeData: addFakeData
    };
})();
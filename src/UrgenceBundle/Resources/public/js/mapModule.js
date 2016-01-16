var mapModule = (function() {
    
    function init() {
        initMap();
    };
    
    function initMap() {
        L.mapbox.accessToken = 'pk.eyJ1IjoiY3BpZ25vbi1oYWNrYXRob24iLCJhIjoiY2lqZ3lsa2tkMDAwbnZ3bHcyaHRkNW11aiJ9.As9ZnOACkGzvktaRkLndrA';
        var map = L.mapbox.map('map', 'mapbox.streets')
            .addControl(L.mapbox.geocoderControl('mapbox.places', {autocomplete: true})).setView([48.89668, 2.3185], 17);
        
        map.on('mousemove', function(e) {
            window[e.type].innerHTML = e.containerPoint.toString() + ', ' + e.latlng.toString();
        });
        addFakeData(map);
    };
    
    function addFakeData(map) {
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
    };
    
    return {
        init: init
    };
})();
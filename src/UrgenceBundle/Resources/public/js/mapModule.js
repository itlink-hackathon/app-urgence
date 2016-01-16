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
    
    return {
        init: init
    };
})();
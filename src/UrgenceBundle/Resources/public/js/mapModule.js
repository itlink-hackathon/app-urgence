var mapModule = (function() {
    
    function init() {
        L.mapbox.accessToken = 'pk.eyJ1IjoiY3BpZ25vbi1oYWNrYXRob24iLCJhIjoiY2lqZ3lsa2tkMDAwbnZ3bHcyaHRkNW11aiJ9.As9ZnOACkGzvktaRkLndrA';
        L.mapbox.map('map', 'mapbox.streets');
    };
    
    return {
        init: init
    };
})();
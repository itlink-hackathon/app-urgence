var mapModule = (function() {
    
    function init(map_id) {
        var map = new google.maps.Map(document.getElementById(map_id), {
        center: {lat: 48.89668, lng: 2.3185},
        zoom: 8
        });
        return map;
    };
    
    return {
        init: init
    };
})();
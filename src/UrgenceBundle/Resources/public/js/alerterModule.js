var alerterModule = (function() {
    
    var map_enabled;
    
    function init(map) {
        enableDisableObtenirPositionBtn();
        disableMap(map);
        
        $("input[type=radio][name=position-group]").change(function() {
           enableDisableObtenirPositionBtn();
           enableDisableMap(map);
        });
        
        var myLayer = L.mapbox.featureLayer().addTo(map);
        initGeolocation(map, myLayer);
        
        map.on('click', function(e) {
            if (map_enabled) {
                map.panTo(e.latlng);
                setPosition(map, myLayer, e);
            }
        });
    };
    
    function enableDisableObtenirPositionBtn() {
        if (!$("#obtenir-position-radio").is(":checked")) {
            $("#obtenir-position-btn").prop("disabled", true);
        } else {
            $("#obtenir-position-btn").prop("disabled", false);
        }
    };
    
    function enableDisableMap(map) {
        if ($("#map-position-btn").is(":checked") && navigator.geolocation) {
            enableMap(map);
        } else {
            disableMap(map);
        }
    };
    
    function enableMap(map) {
        // Enable drag and zoom handlers.
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.keyboard.enable();

        // Disable tap handler, if present.
        if (map.tap) map.tap.enable();
        map_enabled = true;
    };
    
    function disableMap(map) {
        // Disable drag and zoom handlers.
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.keyboard.disable();

        // Disable tap handler, if present.
        if (map.tap) map.tap.disable();
        map_enabled = false;
    };
    
    function initGeolocation(map, myLayer) {
        if (!navigator.geolocation) {
            $("geolocate-error-msg-container").innerHTML = "La géolocalisation n'est pas disponible.";
        } else {
            $("#obtenir-position-btn").click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                map.locate(); 
            });
        }
        
        // Once we've got a position, zoom and center the map
        // on it, and add a single marker.
        map.on('locationfound', function(e) {
            map.fitBounds(e.bounds);
            setPosition(map, myLayer, e);
        });

        // If the user chooses not to allow their location
        // to be shared, display an error message.
        map.on('locationerror', function() {
            $("geolocate-error-msg-container").innerHTML = "La position n'a pas pu être déterminée";
        });
    };
    
    function setPosition(map, myLayer, e) {
        myLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'title': 'Ma position',
                'marker-color': '#ff8888',
                'marker-symbol': 'star'
            }
        });

        $("#alert_longPos").val(e.latlng.lng);
        $("#alert_latPos").val(e.latlng.lat);
    };
    
    return {
      init: init
    };
    
})();
var alerterModule = (function() {
    
    var map_enabled;
    var markers;
    
    function init(map) {
        markers = [];
        enableDisableObtenirPositionBtn();
        disableMap(map);
        
        $("input[type=radio][name=position-group]").change(function() {
           enableDisableObtenirPositionBtn();
           enableDisableMap(map);
        });
        
        initGeolocation(map);
        
        map.addListener('click', function(e) {
            if (map_enabled) {
                cleanMarkers();
                setPosition(e.latLng, map);
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
        map.setOptions({draggable: true, zoomControl: true, scrollwheel: true, disableDoubleClickZoom: false});
        map_enabled = true;
    };
    
    function disableMap(map) {
        // Disable drag and zoom.
        map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
        map_enabled = false;
    };
    
    function initGeolocation(map) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
            
              $("#obtenir-position-btn").click(function(e) {
                    var latLng = new google.maps.LatLng(pos.lat, pos.lng);
                    cleanMarkers();
                    setPosition(latLng, map);
                    map.setZoom(17);
              });
            }, function() {
              handleLocationError(true, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
          }
    };
    
    function handleLocationError(browserHasGeolocation, pos) {
      var infoWindow = new google.maps.InfoWindow({map: map});
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Erreur: La géolocalisation a échouée.' :
                            'Erreur: Votre navigateur ne supporte pas la géolocalisation.');
    };
    
    function setPosition(latLng, map) {
       var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        $("#alert_latPos").val(latLng.lat);
        $("#alert_longPos").val(latLng.lng);
        markers.push(marker);
        map.panTo(latLng);
    };
    
    function cleanMarkers() {
      for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    };
    
    return {
      init: init
    };
    
})();
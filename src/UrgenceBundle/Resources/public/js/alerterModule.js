var alerterModule = (function() {
    
    var map_enabled;
    var markers;
    
    function init(map) {
        markers = [];
        var geolocationActive = initGeolocation(map);
        
        if (!geolocationActive) {
            enableDisableUIControls(map);
        }
        
        $("input[type=radio][name=position-group]").change(function() {
           enableDisableObtenirPositionBtn();
           enableDisableMap(map);
        });
        
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
            
              geolocate(map, pos);
              $("#obtenir-position-radio").prop("checked", true);
              enableDisableUIControls(map);
              $("#obtenir-position-btn").click(function(e) {
                    initGeolocation(map);
              });
              return true;
            }, function() {
              handleLocationError(true, map.getCenter());
              return false;
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
            return false;
          }
    };
    
    function geolocate(map, pos) {
        var latLng = new google.maps.LatLng(pos.lat, pos.lng);
        cleanMarkers();
        setPosition(latLng, map);
        map.setZoom(17);
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
        loadDoc(latLng.lat(), latLng.lng());
        map.panTo(latLng);
    };
    
    function cleanMarkers() {
      for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    };
    
    function enableDisableUIControls(map) {
        enableDisableObtenirPositionBtn();
        enableDisableMap(map);
    };

    function loadDoc(lat, lng) {
        console.log(lat);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //document.getElementById("demo").innerHTML = xhttp.responseText;
                var response = JSON.parse(xhttp.responseText);
                console.log(response["results"]);
                if(response["status"] == "OK") {
                    document.getElementById("adresse-container").innerHTML = response["results"][0]["formatted_address"];
                }
            }
        };
        xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat +","+ lng +"&key=AIzaSyBspTNgVFapTrsO_xYRY5Zzbx1nfDJPVXg", true);
        xhttp.send();
    }
    
    return {
      init: init
    };
    
})();
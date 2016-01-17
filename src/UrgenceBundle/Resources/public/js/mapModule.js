var mapModule = (function() {
    
    var markers = [];
    
    function init(map_id) {
        var map = new google.maps.Map(document.getElementById(map_id), {
        center: {lat: 48.89668, lng: 2.3185},
        zoom: 8
        });
        return map;
    };
    
    function loadData(map) {
       var array = [];
       $.getJSON(BASE_URL + '/all-alerts', function(data) {
           var items = data.features;
           $.each(items, function(index, value) {
               var data = [];
               // On récupère les coordonnées
               var coordinates = value["geometry"]["coordinates"];
               data["lng"] = coordinates[0];
               data["lat"] = coordinates[1];
               // On récupère les propriétés
               var properties = value["properties"];
               data["title"] = properties["title"];
               data["description"] = properties["description"];
                if (!containsMarker(data.title)) {
                    addMarker(map, data, array);
               }
           });
           cleanMarkers();
           for(var i = 0; i < array.length; i++) {
               array[i]["obj"].setMap(map);
           }
           markers = array;
           console.log(markers.length);
       });
    };
    
    function addMarker(map, data, array) {
        var latLng = new google.maps.LatLng(data.lat, data.lng);
        var contentString = getInfoWindowContent(data);
        var infowindow = new google.maps.InfoWindow({
            content: contentString  
        });
        var marker = new google.maps.Marker({
                position: latLng,
                title:"marker"+markers.length
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        array.push({"title" : data.title, "obj": marker});
    };
    
    function containsMarker(title) {
        var found = false;
        for(var i = 0; i < markers.length; i++) {
            if (markers[i].title == data.title) {
                found = true;
                break;
            }
        }
        return found;
    };
    
    function getInfoWindowContent(data) {
        return "<table style='width=100%;'>"
            + "<tr>"
            + "<td>"+ data.title +"</td>"
            + "</tr>"
            + "<tr>"
            + "<td>"+ data.description +"</td>"
            + "</tr>"
            + "</table>"
    };
    
    function cleanMarkers() {
      for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    };
    
    return {
        init: init,
        loadData: loadData
    };
})();
var mapModule = (function() {
    
    var markers = [];
    var markersData = [];
    var cpt = 0;
    
    function init(map_id) {
        var map = new google.maps.Map(document.getElementById(map_id), {
        center: {lat: 48.89668, lng: 2.3185},
        zoom: 8
        });
        return map;
    };
    
    function loadData(map) {
       var array = [];
       var arrayData = [];
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
               if (properties["other-data"] !== null && properties["other-data"] != undefined) {
                   data["nom"] = properties["other-data"]["lastname"];
                   data["prenom"] = properties["other-data"]["firstname"];
                   data["heure"] = properties["other-data"]["timestamp_alerte"];
                   data["age"] = properties["other-data"]["age"];
                   data["sexe"] = properties["other-data"]["genre"];
                   data["severity"] = properties["other-data"]["severity"];
               }
               switch(data["severity"]) {
                   case "Critique": data["color"] = "black";
                                    break;
                   case "Majeure": data["color"] = "red";
                                    break;
                   case "Mineure" : data["color"] = "yellow";
                                    break;
                   default: data["color"] = "green";
               }
               if (!containsMarker(data.title)) {
                    addMarker(map, data, array);
                    arrayData.push(data);
               }
           });
           markers = markers.concat(array);
           setInfoPanel(arrayData);
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
        marker.setMap(map);
        array.push({"title" : data.title, "obj": marker});
    };
    
    function containsMarker(title) {
        var found = false;
        for(var i = 0; i < markers.length; i++) {
            if (markers[i].title == title) {
                found = true;
                break;
            }
        }
        return found;
    };
    
    function getInfoWindowContent(data) {
        return "<table style='width=100%;'>"
            + "<tr>"
            + "<td><strong>"+ data.prenom + " " + data.nom +"</strong></td>"
            + "</tr>"
            + "<tr>"
            + "<td>Lancée à "+ data.heure.date.toString().substring(11).substring(0,8) +"</td>"
            + "</tr>"
            + "<tr>"
            + "<td>Type : " + data.severity + "</td>"
            + "<tr>"
            + "<td>" + data.description + "</td>"
            + "</tr>"
            + "</table>"
    };
    
    function cleanMarkers() {
      for(var i = 0; i < markers.length; i++) {
        markers[i]["obj"].setMap(null);
      }
      markers = [];
    };
    
    function setInfoPanel(arrayData) {
        $.each(arrayData, function(index, data) {
            cpt++;
            $(".cards-container").append(getCard(cpt, data));
            $('#card-'+cpt).paperCollapse();
        });
    };
    
    function getCard(index, properties) {
        var genreStr = (properties.sexe == 'M') ? '<i class="fa fa-mars"></i> Masculin' : '<i class="fa fa-venus"></i> Féminin';
        return '<div id="card-'+index+'" class="collapse-card '+properties.color+'">'
             + '<div class="title"> <strong><i class="fa fa-user"></i> - '+ properties.prenom + ' ' + properties.nom +'</strong> </div>'
             +  '<div class="body">'
             +  '<form role="form">'
             +  '<div class="form-group">'
             +  '<label for="nom">Nom : </label>'
             +  '<p id="nom" class="form-control-static">'+properties.nom+'</p>'
             +  '</div>'
             +  '<div class="form-group">'
             +      '<label for="prenom">Prénom : </label>'
             +      '<p id="prenom" class="form-control-static">'+properties.prenom+'</p>'
             +   '</div>'
             + '<div class="form-group">'
             +     '<label for="age">Âge : </label>'
             +     '<p id="age" class="form-control-static">'+properties.age+'</p>'
             + '</div>'
             + '<div class="form-group">'
             +     '<label for="sexe">Genre : </label>'
             +     '<p id="sexe" class="form-control-static">'+genreStr+'</p>'
             + '</div>'
             + '<div class="form-group">'
             + '<label for="pos">Localisation : </label>'
             + '<p id="pos" class="form-control-static">('+properties.lat+', '+properties.lng+')</p>'
             + '</div>'
             + '<div class="form-group">'
             + '<label for="heure">Heure de l\'alerte : </label>'
             + '<p id="heure" class="form-control-static">'+properties.heure.date.toString().substring(11).substring(0,8)+'</p>'
             + '</div>'
             + '<div class="form-group">'
             + '<label for="heure">Description : </label>'
             + '<p id="heure" class="form-control-static">'+properties.description+'</p>'
             + '</div>'
             + '</form>'
             + '</div>'
             + '</div>';
    };
    
    return {
        init: init,
        loadData: loadData
    };
})();
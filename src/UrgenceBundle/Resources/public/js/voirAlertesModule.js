var voirAlertesModule = (function() {
    
    var cards = [];
    
    function setInfoPanel(items) {
        $.each(items, function(index, item) {
            $("")
        });
    };
    
    function containsCard(title) {
        var found = false;
        for(var i = 0; i < cards.length; i++) {
            if (cards[i].title == title) {
                found = true;
                break;
            }
        }
        return found;
    };
    
    function getCard(properties) {
        return '<div class="collapse-card '+properties.color+'">'
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
             +     '<label for="sexe">Sexe : </label>'
             +     '<p id="sexe" class="form-control-static">'+properties.sexe+'</p>'
             + '</div>'
             + '<div class="form-group">'
             + '<label for="pos">Localisation : </label>'
             + '<p id="pos" class="form-control-static">('+properties.pos.lat+', '+properties.pos.lng+')</p>'
             + '</div>'
             + '<div class="form-group">'
             + '<label for="heure">Heure de l\'alerte : </label>'
             + '<p id="heure" class="form-control-static">'+new Date(properties.heure).toLocaleTimeString()+'</p>'
             + '</div>'
             + '</form>'
             + '</div>'
             + '</div>';
    };
    
})();
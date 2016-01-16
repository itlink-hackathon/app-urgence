var alerterModule = (function() {
    
    function init() {
        enableDisableOtenirPositionBtn();
        
        $("input[type=radio][name=position-group]").change(function() {
           enableDisableOtenirPositionBtn();
        });
    };
    
    function enableDisableOtenirPositionBtn() {
        if (!$("#obtenir-position-radio").is(":checked")) {
            $("#obtenir-position-btn").prop("disabled", true);
        } else {
            $("#obtenir-position-btn").prop("disabled", false);
        }
    };
    
    return {
      init: init  
    };
    
})();
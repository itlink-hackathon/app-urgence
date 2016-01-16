var commonModule = (function() {
    
    function init() {
        $(document).ready(function() {
            $('a[href="' + this.location.pathname + '"]').parent().addClass('active');
        });
    };
    
    return {
        init: init
    }
})();
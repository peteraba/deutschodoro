// Start the main app logic.
define(
    ['settings'],
    function(settings) {
        function init() {
            if (!settings.isReady()) {
                setTimeout(function(){init();}, 100);
            } else {
                settings.init();
            }
        }

        init();

        return {
            indexAction: function(){}
        }
    }
);

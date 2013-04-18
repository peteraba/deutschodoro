// Start the main app logic.
define(
    ['app'],
    function(app) {
        function init() {
            if (!app.isReady()) {
                setTimeout(function(){checkLoading();}, 100);
            } else {
                app.run();
            }
        }

        init();

        return {
            indexAction: function(){}
        }
    }
);

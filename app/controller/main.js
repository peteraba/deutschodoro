// Start the main app logic.
define(
    ['app', 'helper/dom'],
    function(app, dom) {
        function init() {
            if (!app.isReady()) {
                setTimeout(function(){init();}, 100);
            } else {
                app.run();

                if (typeof chrome != 'undefined' && typeof chrome.alarm != 'undefined') {
                    websiteFix();
                }
            }
        }

        function websiteFix() {
            var settingLink = dom.get('<a href="settings.html">Settings</a>'), listItem = dom.get('<li />');

            listItem.append(settingLink);

            dom.getCached('#south ul').append(listItem);
        }

        init();

        return {
            indexAction: function(){}
        }
    }
);

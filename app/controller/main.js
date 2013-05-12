// Start the main app logic.
define(
    ['app', 'base/gui'],
    function(app, gui) {
        function init() {
            if (!app.isReady()) {
                setTimeout(function(){init();}, 100);
            } else {
                app.run();

                if (!chrome || !chrome.alarm) {
                    websiteFix();
                }
            }
        }

        function websiteFix() {
            var settingLink = $('<a href="settings.html">Settings</a>'), listItem = $('<li />');

            listItem.append(settingLink);

            gui.getDom('#south ul').append(listItem);
        }

        init();

        return {
            indexAction: function(){}
        }
    }
);

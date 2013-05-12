// Start the main app logic.
define(
    ['settings', 'base/gui'],
    function(settings, gui) {
        function init() {
            if (!settings.isReady()) {
                setTimeout(function(){init();}, 100);
            } else {
                settings.init();

                if (!chrome || !chrome.alarm) {
                    websiteFix();
                }
            }
        }

        function websiteFix() {
            var settingLink = $('<a href="index.html">Back to main</a>'), listItem = $('<li />');

            listItem.append(settingLink);

            gui.getDom('#south ul').append(listItem);
        }

        init();

        return {
            indexAction: function(){}
        }
    }
);

// Start the main app logic.
define(
    ['settings', 'helper/dom'],
    function(settings, dom) {
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
            var settingLink = dom.get('<a href="index.html">Back to main</a>'), listItem = dom.get('<li />');

            listItem.append(settingLink);

            dom.getCached('#south ul').append(listItem);
        }

        init();

        return {
            indexAction: function(){}
        }
    }
);

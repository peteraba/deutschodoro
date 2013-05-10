define(
    ['gui', 'options', 'vendor/jquery', 'vendor/underscore'],
    function(gui, options, $, _){

        function buildMainOptions(event) {
            var html;

            html = 'buildMainOptions';

            event.preventDefault();

            gui.displaySettingsPage(html);
        }

        function buildAddNoun(event) {
            var html;

            html = 'buildAddNoun';

            event.preventDefault();

            gui.displaySettingsPage(html);
        }

        function buildAddVerb(event) {
            var html;

            html = 'buildAddVerb';

            event.preventDefault();

            gui.displaySettingsPage(html);
        }

        function buildAddWord(event) {
            var html;

            html = 'buildAddWord';

            event.preventDefault();

            gui.displaySettingsPage(html);
        }

        function buildDictionary(event) {
            var html;

            html = 'buildDictionary';

            event.preventDefault();

            gui.displaySettingsPage(html);
        }

        function init() {
            gui.getDom('#mainOptions').click(buildMainOptions);
            gui.getDom('#addNoun').click(buildAddNoun);
            gui.getDom('#addVerb').click(buildAddVerb);
            gui.getDom('#addWord').click(buildAddWord);
            gui.getDom('#dictionary').click(buildDictionary);
        }

        function isReady(){
            if (gui.isReady()) {
                return true;
            }
            return false;
        }

        return {
            isReady: isReady,
            init: init
        };
    }
);
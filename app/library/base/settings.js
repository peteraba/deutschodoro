define(
    ['base/gui', 'settings/dictionary', 'settings/addNoun', 'settings/addVerb', 'settings/addWord', 'settings/mainOptions'],
    function(gui, dictionarySettings, addNounSettings, addVerbSettings, addWordSettings, mainOptionsSettings){

        function buildDictionary(event) {
            event.preventDefault();

            gui.displayPage(dictionarySettings.render());
        }

        function buildAddNoun(event) {
            event.preventDefault();

            gui.displayPage(addNounSettings.render());
        }

        function buildAddVerb(event) {
            event.preventDefault();

            gui.displayPage(addVerbSettings.render());
        }

        function buildAddWord(event) {
            event.preventDefault();

            gui.displayPage(addWordSettings.render());
        }

        function buildMainOptions(event) {
            event.preventDefault();

            gui.displayPage(mainOptionsSettings.render());
        }

        function init() {
            gui.getDom('#mainOptions').click(buildMainOptions).click();
            /*gui.getDom('#addNoun').click(buildAddNoun);
            gui.getDom('#addVerb').click(buildAddVerb);
            gui.getDom('#addWord').click(buildAddWord);*/
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
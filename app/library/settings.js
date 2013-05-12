define(
    ['base/gui', 'settings/dictionary', 'settings/addNoun', 'settings/addVerb', 'settings/addWord', 'settings/mainOptions'],
    function(gui, dictionarySettings, addNounSettings, addVerbSettings, addWordSettings, mainOptionsSettings){

        function buildDictionary(event) {
            event.preventDefault();

            gui.displayPage(dictionarySettings.render());
        }

        function buildMainOptions(event) {
            event.preventDefault();

            gui.displayPage(mainOptionsSettings.render());
        }

        function init() {
            gui.getDom('#mainOptions').click(buildMainOptions).click();
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
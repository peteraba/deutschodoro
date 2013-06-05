define(
    ['helper/dom', 'base/gui', 'settings/dictionary', 'settings/addNoun', 'settings/addVerb', 'settings/addWord', 'settings/mainOptions'],
    function(dom, gui, dictionarySettings, addNounSettings, addVerbSettings, addWordSettings, mainOptionsSettings){

        function buildDictionary(event) {
            event.preventDefault();

            gui.displayPage(dictionarySettings.render());
        }

        function buildMainOptions(event) {
            event.preventDefault();

            gui.displayPage(mainOptionsSettings.render());
        }

        function init() {
            dom.getCached('#mainOptions').click(buildMainOptions).click();
            dom.getCached('#dictionary').click(buildDictionary);
        }

        function isReady(){
            return gui.isReady();
        }

        return {
            isReady: isReady,
            init: init
        };
    }
);
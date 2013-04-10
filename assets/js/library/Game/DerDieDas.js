d3.game.derDieDas = (function($, _){
    var wordFinder = null;

    /**
     *
     * @param {Object} newWordFinder
     * @return {Object}
     */
    function setWordFinder(newWordFinder) {
        wordFinder = newWordFinder;

        return d3.game.derDieDas;
    }

    /**
     *
     * @return {Object}
     */
    function getWordFinder() {
        if (null == wordFinder) {
            wordFinder = d3.wordFinder;
        }

        return wordFinder;
    }

    /**
     *
     * @return {Boolean}
     */
    function create() {
        return true;
    }

    return {
        create: create,
        importance: 100,
        setWordFinder: setWordFinder
    };
})(jQuery, _);
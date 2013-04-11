d3.game.wordToEnglish = (function($, _){
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

    /**
     *
     * @return {String}
     */
    function getHtml() {
        var html = [];

        return html.join('');
    }

    /**
     *
     * @param {String} answer
     * @return {Boolean}
     */
    function checkResult(answer) {
        return false;
    }

    /**
     *
     * @return {Array}
     */
    function getUsedWords() {
        return [pickedWord];
    }

    return {
        create: create,
        getHtml: getHtml,
        checkResult: checkResult,
        getUsedWords: getUsedWords,
        importance: 100,
        setWordFinder: setWordFinder
    };
})(jQuery, _);
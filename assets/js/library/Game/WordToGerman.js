d3.game.wordToGerman = (function($, _){
    var wordFinder = null, question = '';

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

        html.push('<h1>Word to German</h1>');
        html.push('<p>What is the translation of `' + question + '`?</p>');
        html.push('<ul>');
        html.push('</ul>');

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
d3.game.derDieDas = (function($, _){
    var wordFinder = null, pickedWord = null;

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
        pickedWord = getWordFinder().getWord({type:"noun"});

        return true;
    }

    /**
     *
     * @return {String}
     */
    function getHtml() {
        var html = [];

        html.push('<h1>Der, die, das</h1>');
        html.push('<p>What is the article of `' + pickedWord.german + '`?</p>');
        html.push('<ul>');
        html.push('<li><label for="der">der <input type="radio" name="article" value="der" id="der"></label></li>');
        html.push('<li><label for="die">die <input type="radio" name="article" value="die" id="die"></label></li>');
        html.push('<li><label for="das">das <input type="radio" name="article" value="das" id="das"></label></li>');
        html.push('</ul>');

        return html.join('');
    }

    /**
     *
     * @param {String} answer
     * @return {Boolean}
     */
    function checkResult(answer) {
        return (pickedWord.article == answer);
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
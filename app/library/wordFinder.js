d3.wordFinder = (function($, _){
    var dictionary = null, stat = null;

    /**
     *
     * @return {Object}
     */
    function getDictionary() {
        if (null === dictionary) {
            dictionary = d3.dictionary;
        }

        return dictionary;
    }

    /**
     *
     * @param {Object} newDictionary
     * @return {Object}
     */
    function setDictionary(newDictionary) {
        dictionary = newDictionary;

        return d3.app;
    }

    /**
     *
     * @return {Object}
     */
    function getStat() {
        if (null === stat) {
            stat = d3.stat;
        }

        return stat;
    }

    /**
     *
     * @param {Object} newStat
     * @return {Object}
     */
    function setStat(newStat) {
        stat = newStat;

        return d3.app;
    }

    /**
     *
     * @param {Object} searchData
     * @return {Object|Boolean}
     */
    function getWord(searchData) {
        var wordList = getDictionary().findWords(searchData);

        return wordList ? getStat().pickWord(wordList) : false;
    }

    return {
        setDictionary: setDictionary,
        setStat: setStat,
        getWord: getWord
    };
})(jQuery, _);
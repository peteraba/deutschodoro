d3.dictionary = (function($, _, dict){
    var level, dictionary = dict, usedDictionary, MAX_LEVEL = 99;

    /**
     *
     * @param {Number} newLevel
     * @return {Object} this
     */
    function setLevel(newLevel) {
        if (newLevel < 1 || newLevel > MAX_LEVEL) {
            newLevel = MAX_LEVEL;
        }

        level = newLevel;

        usedDictionary = {};
        _.each(dictionary, function(word){
            if (typeof word.level !== 'undefined' && word.level <= newLevel) {
                usedDictionary[word.hash] = word;
            }
        });

        return d3.dictionary;
    }

    /**
     * @param {Array} dict
     * @return {Object} this
     */
    function setDictionary(dict) {
        dictionary = dict;

        setLevel(level);

        return d3.dictionary;
    }

    /**
     *
     * @return {Object}
     */
    function getDictionary() {
        return usedDictionary;
    }

    setLevel(MAX_LEVEL);

    return {
        setLevel: setLevel,
        setDictionary: setDictionary,
        getDictionary: getDictionary
    };
})(jQuery, _, typeof dict == 'undefined' ? {} : dict);
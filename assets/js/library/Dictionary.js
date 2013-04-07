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

    /**
     *
     * @param {String} word
     * @param {String} expression
     * @param {String} key
     * @return {Boolean}
     */
    function checkItemKey(word, expression, key) {
        var arrayResult;

        if (typeof word[key] == 'undefined') {
            return false;
        } else if (_.isArray(word[key])) {
            arrayResult = false;
            _.every(word[key], function(element){
                if (element == expression) {
                    arrayResult = true;
                    return false;
                }
                return true;
            });
            return arrayResult;
        }

        return word[key] == expression;
    }

    /**
     *
     * @param {String} word
     * @param {Object} searchData
     * @return {Boolean}
     */
    function checkItem(word, searchData) {
        var found = true;

        _.every(searchData, function(value, key) {
            if (!checkItemKey(word, value, key)) {
                found = false;
                return false;
            }
            return true;
        });

        return found;
    }

    /**
     *
     * @param {Object} searchData
     * @return {Array}
     */
    function findWords(searchData) {
        var results = {};

        _.each(getDictionary(), function(word, key) {
            if (checkItem(word, searchData)) {
                results[key] = word;
            }
        });

        return results;
    }

    setLevel(MAX_LEVEL);

    return {
        setLevel: setLevel,
        setDictionary: setDictionary,
        getDictionary: getDictionary,
        findWords: findWords
    };
})(jQuery, _, typeof dict == 'undefined' ? {} : dict);
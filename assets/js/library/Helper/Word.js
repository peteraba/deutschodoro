d3.helper.word = (function($, _){

    /**
     * Example 'ausgezeichnet', [['ie', 'ei], 'a', ['e', et']] --> 20
     *
     * @param {String} word
     * @param {Array} charSets
     * @return {Boolean}
     */
    function findLastChars(word, charSets) {
        var result = false;

        word = word.toLowerCase();

        _.every(charSets, function(charSet){
            var foundIndices = [];

            charSet = _.isArray(charSet) ? charSet : [charSet];

            _.each(charSet, function(chars){
                var index = word.lastIndexOf(chars.toLowerCase());

                if (index >= 0) {
                    foundIndices.push(index);
                }
            });

            if (foundIndices.length > 0) {
                result = _.max(foundIndices);
                return false;
            }

            return true;
        });

        return result;
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
     * @param {Array} dict
     * @param {Object} searchData
     * @return {Boolean|Object}
     */
    function findFirstWord(dict, searchData) {
        var result = false;

        _.every(dict, function(word) {
            if (checkItem(word, searchData)) {
                result = word;
                return false;
            }
            return true;
        });

        return result;
    }

    /**
     *
     * @param {Array} dict
     * @param {Object} searchData
     * @return {Object}
     */
    function findRandomWord(dict, searchData) {
        var results = [];

        _.each(dict, function(word) {
            if (checkItem(word, searchData)) {
                results.push(word);
            }
        });

        if (results.length) {
            return results[_.random(results.length - 1)];
        }

        return false;
    }

    return {
        findLastChars: findLastChars,
        findFirstWord: findFirstWord,
        findRandomWord: findRandomWord
    };
})(jQuery, _);
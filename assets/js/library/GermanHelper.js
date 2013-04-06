d3.germanHelper = (function($, _){
    /**
     *
     * @param {String} word
     * @return {String}
     */
    function umlauter(word) {
        var indexToChange, charToChange, newChar, result, charSet;

        charSet = [['au'], ['a', 'o', 'u']];

        indexToChange = d3.wordHelper.findLastChars(word, charSet);

        charToChange = word.substr(indexToChange, 1);

        switch (charToChange) {
            case 'a':
                newChar = 'ä';
                break;
            case 'o':
                newChar = 'ö';
                break;
            case 'u':
                newChar = 'ü';
                break;
            case 'A':
                newChar = 'Ä';
                break;
            case 'O':
                newChar = 'Ö';
                break;
            case 'U':
                newChar = 'Ü';
                break;
            default:
                newChar = '';
        }

        result = '';
        if (indexToChange > 0) {
            result = word.substr(0, indexToChange) + newChar + word.substr(indexToChange + 1);
        } else if (indexToChange == 0) {
            result = newChar + word.substr(1);
        }

        return result;
    }

    /**
     *
     * @param {String} base
     * @param {String} modified
     * @return {*}
     */
    function modifyWord(base, modified) {
        if (modified == '' || modified == '–') {
            return false;
        }
        if (modified.substr(0, 1) == '~') {
            return base + modified.substr(1);
        }
        if (modified.substr(0, 1) == '⍨') {
            return umlauter(base) + modified.substr(1);
        }

        return modified;
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
        modifyWord: modifyWord,
        findFirstWord: findFirstWord,
        findRandomWord: findRandomWord
    };
})(jQuery, _);
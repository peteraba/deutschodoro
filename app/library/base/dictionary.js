define(
    ['base/options', 'vendor/underscore'],
    function(options, _){
        var minLevel, usedDictionary = {}, MAX_LEVEL = 99, rawDictionary;

        function getDictionary() {
            return usedDictionary;
        }

        /**
         *
         * @param {Number} newMinLevel
         * @return {Object} this
         */
        function setMinLevel(newMinLevel) {
            if (newMinLevel < 1 || newMinLevel > MAX_LEVEL) {
                newMinLevel = MAX_LEVEL;
            }

            minLevel = newMinLevel;

            usedDictionary = {};
            _.each(rawDictionary.dict, function(word){
                if (typeof word.level !== 'undefined' && word.level <= newMinLevel) {
                    usedDictionary[word.hash] = word;
                }
            });
        }

        /**
         *
         * @param {String} word
         * @param {String} expression
         * @param {String} key
         * @return {Boolean}
         */
        function checkItemKey(word, expression, key) {
            var arrayResult, negate;

            if (typeof word[key] == 'undefined') {
                return false;
            } else if (_.isArray(word[key])) {
                arrayResult = false;
                _.every(word[key], function(element){
                    negate = element[0]=='!';

                    if (negate) {
                        expression = expression.substr(1);
                    }

                    if (!negate && element == expression || negate && element != expression) {
                        arrayResult = true;
                        return false;
                    }
                    return true;
                });
                return arrayResult;
            }

            negate = expression[0]=='!';
            if (negate) {
                expression = expression.substr(1);
            }

            return negate ? word[key] != expression : word[key] == expression;
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
         * @param {Number} minLevel
         * @param {Number} maxLevel
         * @return {Array}
         */
        function findWords(searchData, minLevel, maxLevel) {
            var results = {};

            maxLevel = typeof maxLevel!='undefined' ? maxLevel : 10;

            _.each(usedDictionary, function(word, key) {
                if (word.level >= minLevel && word.level <= maxLevel && checkItem(word, searchData)) {
                    results[key] = word;
                }
            });

            return results;
        }

        rawDictionary = options.getRawDictionary();
        setMinLevel(MAX_LEVEL);

        return {
            setMinLevel: setMinLevel,
            findWords: findWords,
            getDictionary: getDictionary
        };
    }
);
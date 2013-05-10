define(
    ['options', 'vendor/underscore'],
    function(options, _){
        var level, usedDictionary = {}, MAX_LEVEL = 99, rawDictionary;

        function getDictionary() {
            return usedDictionary;
        }

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
            _.each(rawDictionary.dict, function(word){
                if (typeof word.level !== 'undefined' && word.level <= newLevel) {
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
         * @param {String} level
         * @return {Boolean}
         */
        function checkItem(word, searchData, level) {
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
         * @param {Number} level
         * @return {Array}
         */
        function findWords(searchData, level) {
            var results = {};

            _.each(usedDictionary, function(word, key) {
                if (word.level >= level && checkItem(word, searchData, level)) {
                    console.log(word.level, level, word);
                    results[key] = word;
                }
            });

            return results;
        }

        rawDictionary = options.getRawDictionary();
        setLevel(MAX_LEVEL);

        return {
            setLevel: setLevel,
            findWords: findWords,
            rawDictionary: rawDictionary.dict,
            getDictionary: getDictionary
        };
    }
);
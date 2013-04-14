define(
    ['dict/dict', 'vendor/underscore'],
    function(rawDictionary){
        var level, usedDictionary, MAX_LEVEL = 99;

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
            _.each(rawDictionary, function(word){
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

            _.each(usedDictionary, function(word, key) {
                if (checkItem(word, searchData)) {
                    results[key] = word;
                }
            });

            return results;
        }

        setLevel(MAX_LEVEL);

        return {
            setLevel: setLevel,
            findWords: findWords,
            rawDictionary: rawDictionary,
            getDictionary: function(){return rawDictionary;}
        };
    }
);
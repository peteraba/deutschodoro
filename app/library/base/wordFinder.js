define(
    ['base/dictionary', 'base/stat', 'vendor/underscore'],
    function(dictionary, stat, _){

        /**
         *
         * @param {Object} searchData
         * @param {Number} minLevel
         * @param {Number} maxLevel
         * @return {Object|Boolean}
         */
        function getWord(searchData, minLevel, maxLevel) {
            var wordList;

            minLevel = typeof minLevel=='undefined' ? 1 : minLevel;
            maxLevel = typeof maxLevel=='undefined' ? 10 : maxLevel;

            wordList = dictionary.findWords(searchData, minLevel, maxLevel);

            return _.size(wordList) ? stat.pickWord(wordList) : false;
        }

        /**
         *
         * @param {Object} searchData
         * @param {Array} skipGermanWords
         * @param {Number} minLevel
         * @param {Number} maxLevel
         * @return {Object|Boolean}
         */
        function getRandomWord(searchData, skipGermanWords, minLevel, maxLevel) {
            var wordList, wordArray, pickedWord = null, maxTries, tryCount = 0;

            minLevel = typeof minLevel=='undefined' ? 1 : minLevel;
            maxLevel = typeof maxLevel=='undefined' ? 10 : maxLevel;
            skipGermanWords = typeof skipGermanWords == 'undefined' ? [] : skipGermanWords;

            wordList = dictionary.findWords(searchData, minLevel, maxLevel);
            wordArray = _.toArray(wordList);

            if (wordArray.length == 0) {
                return false;
            }

            maxTries = wordArray.length * 100;
            do {
                tryCount++;
                pickedWord = wordArray[_.random(wordArray.length-1)];
            }
            while (skipGermanWords.indexOf(pickedWord.german) > -1 && tryCount < maxTries);

            return tryCount < maxTries ? pickedWord : false;
        }

        return {
            getWord: getWord,
            getRandomWord: getRandomWord
        };
    }
);
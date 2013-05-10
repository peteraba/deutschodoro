define(
    ['dictionary', 'stat', 'vendor/underscore'],
    function(dictionary, stat, _){

        /**
         *
         * @param {Object} searchData
         * @param {Number} level
         * @return {Object|Boolean}
         */
        function getWord(searchData, level) {
            var wordList;

            level = typeof level=='undefined' ? 1 : level;

            wordList = dictionary.findWords(searchData, level);

            return _.size(wordList) ? stat.pickWord(wordList) : false;
        }

        /**
         *
         * @param {Object} searchData
         * @param {Array} skipGermanWords
         * @param {Number} level
         * @return {Object|Boolean}
         */
        function getRandomWord(searchData, skipGermanWords, level) {
            var wordList, wordArray, pickedWord = null, maxTries, tryCount = 0;

            level = typeof level=='undefined' ? 1 : level;
            skipGermanWords = typeof skipGermanWords == 'undefined' ? [] : skipGermanWords;
            wordList = dictionary.findWords(searchData, level);
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
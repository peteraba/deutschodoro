define(
    ['dictionary', 'stat', 'vendor/underscore'],
    function(dictionary, stat, _){

        /**
         *
         * @param {Object} searchData
         * @return {Object|Boolean}
         */
        function getWord(searchData) {
            var wordList = dictionary.findWords(searchData);

            return _.size(wordList) ? stat.pickWord(wordList) : false;
        }

        /**
         *
         * @param {Object} searchData
         * @param {Array} skipGermanWords
         * @return {Object|Boolean}
         */
        function getRandomWord(searchData, skipGermanWords) {
            var wordList, wordArray, pickedWord = null, maxTries, tryCount = 0;

            skipGermanWords = typeof skipGermanWords == 'undefined' ? [] : skipGermanWords;
            wordList = dictionary.findWords(searchData);
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
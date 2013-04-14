define(
    ['dictionary', 'stat'],
    function(dictionary, stat){

        /**
         *
         * @param {Object} searchData
         * @return {Object|Boolean}
         */
        function getWord(searchData) {
            var wordList = dictionary.findWords(searchData);

            return wordList ? stat.pickWord(wordList) : false;
        }

        return {
            getWord: getWord
        };
    }
);
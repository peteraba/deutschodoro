define(
    ['vendor/underscore'],
    function(){
        var data = {}, storage = null, ts = null, DATA_KEY = 'stats';

        /**
         *
         * @param {Object} newStorage
         * @return {Object}
         */
        function setStorage(newStorage) {
            storage = newStorage;
        }

        /**
         *
         * @return {Object}
         */
        function getStorage() {
            if (null === storage) {
                if (typeof localStorage == 'undefined') {
                    storage = {getItem: function(){}, setItem: function(){}};
                } else {
                    storage = localStorage;
                }
            }

            return storage;
        }

        /**
         *
         * @return {Number}
         */
        function getTimestamp() {
            if (null === ts) {
                ts = Math.round((new Date()).getTime() / 1000);
            }

            return ts;
        }

        /**
         *
         * @return {Number} newTs
         */
        function setTimestamp(newTs) {
            ts = newTs;
        }

        /**
         *
         * @return {Object}
         */
        function loadData() {
            var jsonData;

            jsonData = getStorage().getItem(DATA_KEY);
            data = JSON.parse(jsonData);
        }

        /**
         *
         * @param {Object} newData
         * @return {Object}
         */
        function setData(newData) {
            data = newData;
        }

        /**
         *
         * @return {Object}
         */
        function saveData() {
            getStorage().setItem(DATA_KEY, JSON.stringify(data));
        }

        /**
         *
         * @param {Object} hashes
         * @param {Boolean} result
         * @return {*}
         */
        function saveResult(hashes, result) {
            var ts = getTimestamp();

            result = result > 0 ? 1 : 0;

            _.each(hashes, function(hash){
                if (typeof data[hash] == 'undefined') {
                    data[hash] = [[result, ts]];
                } else {
                    data[hash].unshift([result, ts]);

                    if (data[hash].length > 10) {
                        data[hash] = data[hash].slice(0, 10);
                    }
                }
            });

            return saveData();
        }

        /**
         *
         * @param {Object} hash
         * @return {Number}
         */
        function getWordScore(hash) {
            var score = 0, timePenalty = 100, ts = getTimestamp(), multiplier, word;

            if (typeof data[hash] != 'undefined') {
                word       = data[hash];
                multiplier = _.size(word);

                _.each(word, function(wordStat){
                    if (wordStat[0] == 1) {
                        score += multiplier;
                    } else {
                        score -= multiplier;
                    }
                });

                timePenalty = Math.floor((ts - word[word.length-1][1]) / 86400);
                timePenalty = Math.min(timePenalty, 100);
            }

            return score - timePenalty;
        }

        /**
         *
         * @param {Object} wordList
         * @return {Object}
         */
        function pickWord(wordList) {
            var hashes = [], lowestScore = Number.MAX_VALUE, randomHash;

            _.each(wordList, function(word, hash) {
                var score = getWordScore(hash);

                if (score == lowestScore) {
                    hashes.push(hash);
                } else if (score < lowestScore) {
                    lowestScore = score;
                    hashes = [hash];
                }
            });

            if (hashes.length == 0) {
                return false;
            }

            randomHash = hashes[_.random(hashes.length-1)];

            return wordList[randomHash];
        }

        loadData();

        return {
            setStorage: setStorage,
            setData: setData,
            setTimestamp: setTimestamp,
            saveResult: saveResult,
            pickWord: pickWord,
            DATA_KEY: DATA_KEY
        };
    }
);
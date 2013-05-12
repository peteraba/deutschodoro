define(
    ['base/logger', 'vendor/underscore'],
    function(logger, _){
        var data = {}, storage = null, ts = null, DATA_KEY = 'stats', totalScore;

        /**
         *
         * @param {Object} newStorage
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

        function setTimestamp(newTs) {
            ts = newTs;
        }

        function loadData() {
            var jsonData;

            logger.debug('LOAD_DATA');
            jsonData = getStorage().getItem(DATA_KEY);
            data = jsonData ? JSON.parse(jsonData) : {};
            logger.debug(data);
        }

        /**
         *
         * @param {Object} newData
         */
        function setData(newData) {
            data = newData;
        }

        function saveData() {
            logger.debug('SAVE_DATA');
            getStorage().setItem(DATA_KEY, JSON.stringify(data));
            logger.debug(data);
        }

        /**
         *
         * @param {Array} hashes
         * @param {Boolean} result
         * @return {*}
         */
        function saveResult(hashes, result) {
            var ts = getTimestamp();

            result = result > 0 ? 1 : 0;

            _.each(hashes, function(hash){
                if (typeof data[hash] == 'undefined') {
                    logger.debug('New result hash: ' + hash);
                    data[hash] = [[result, ts]];
                } else {
                    logger.debug('Add result to hash: ' + hash);
                    data[hash].unshift([result, ts]);

                    if (data[hash].length > 10) {
                        data[hash] = data[hash].slice(0, 10);
                    }
                }
                if (data[hash].length > 2) {
                    logger.debug(data[hash]);
                }
            });

            return saveData();
        }

        /**
         *
         * @param {String} hash
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

            return score - timePenalty + 100;
        }

        /**
         *
         * @param {String} hash
         * @return {Array}
         */
        function getWordStat(hash) {
            var result = [0, 0], wordData;

            if (typeof data[hash] != 'undefined') {
                wordData = data[hash];

                _.each(wordData, function(wordStat){
                    if (wordStat[0] == 1) {
                        result[0]++;
                    }
                    result[1]++;
                });
            }

            return result;
        }

        /**
         *
         * @param {Object} wordList
         * @return {Object}
         */
        function pickWord(wordList) {
            var hashes = [], lowestScore = Number.MAX_VALUE, randomHash;

            totalScore = 0;

            _.each(wordList, function(word, hash) {
                var score = getWordScore(hash);

                if (score == lowestScore) {
                    hashes.push(hash);
                } else if (score < lowestScore) {
                    lowestScore = score;
                    hashes = [hash];
                }

                totalScore += score;
            });

            totalScore = Math.round(totalScore / _.size(wordList));

            if (hashes.length == 0) {
                return false;
            }

            randomHash = hashes[_.random(hashes.length-1)];

            return wordList[randomHash];
        }

        /**
         *
         * @returns {Number}
         */
        function getTotalScore() {
            return totalScore;
        }

        /**
         *
         * @param {Object} wordList
         * @returns {Array}
         */
        function getStats(wordList) {
            var allStats = [], i;

            _.each(wordList, function(word, hash) {
                var wordStat = getWordStat(hash), roundedStat;

                if (wordStat[1] > 0) {
                    roundedStat = Math.floor(wordStat[0] / wordStat[1] * 10);
                    if (typeof allStats[roundedStat] == 'undefined') {
                        allStats[roundedStat] = 1;
                    } else {
                        allStats[roundedStat] += 1;
                    }
                }
            });

            return allStats;
        }

        //logger.setLogLevel(logger.DEBUG);
        loadData();

        return {
            setStorage: setStorage,
            setData: setData,
            setTimestamp: setTimestamp,
            saveResult: saveResult,
            pickWord: pickWord,
            getTotalScore: getTotalScore,
            getStats: getStats,
            DATA_KEY: DATA_KEY
        };
    }
);
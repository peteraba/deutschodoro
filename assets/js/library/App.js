d3.app = (function($, _){
    var importances, games = null, dictionary = null, stat = null;

    /**
     *
     * @return {Object}
     */
    function getGames() {
        if (null === games) {
            games = d3.game;
        }

        return games;
    }

    /**
     *
     * @param {Object} tmpGames
     * @return {Object}
     */
    function setGames(tmpGames) {
        games = tmpGames;

        return d3.app;
    }

    /**
     *
     * @return {Object}
     */
    function getDictionary() {
        if (null === dictionary) {
            dictionary = d3.dictionary;
        }

        return dictionary;
    }

    /**
     *
     * @param {Object} newDictionary
     * @return {Object}
     */
    function setDictionary(newDictionary) {
        dictionary = newDictionary;

        return d3.app;
    }

    /**
     *
     * @return {Object}
     */
    function getStat() {
        if (null === stat) {
            stat = d3.stat;
        }

        return stat;
    }

    /**
     *
     * @param {Object} newStat
     * @return {Object}
     */
    function setStat(newStat) {
        stat = newStat;

        return d3.app;
    }

    /**
     *
     * @return {Number}
     */
    function getGamesSum() {
        var result;
        importances = {};

        _.each(d3.game, function(game, key){
            importances[key] = game.importance;
        });

        result = _.reduce(importances, function(memo, importance){return memo + importance;}, 0);

        return result;
    }

    /**
     *
     * @return {Boolean|Object}
     */
    function getRandomGame() {
        var sum, rand, game = null;

        sum = getGamesSum();
        rand = _.random(sum);
        
        _.every(importances, function(value, key){
            rand = rand - value;
            if (rand <= 0) {
                game = key;
                return false;
            }
            return true;
        });

        if (game) {
            return d3.game[game];
        }

        return false;
    }

    /**
     *
     * @param {Object} searchData
     * @return {Object|Boolean}
     */
    function getWord(searchData) {
        var wordList = getDictionary().findWords(searchData);

        return wordList ? getStat().pickWord(wordList) : false;
    }

    /**
     *
     * @return {Boolean}
     */
    function run() {
        var game = getRandomGame();

        if (game) {
            return game.create();
        }

        return false;
    }

    return {
        run: run,
        setGames: setGames,
        setDictionary: setDictionary,
        setStat: setStat,
        getWord: getWord
    };
})(jQuery, _);
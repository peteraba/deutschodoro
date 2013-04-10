d3.app = (function($, _){
    var importances, games = null;

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
     * @return {Number}
     */
    function getGamesSum() {
        var result;
        importances = {};

        _.each(getGames(), function(game, key){
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
        setGames: setGames
    };
})(jQuery, _);
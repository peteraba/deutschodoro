d3.app = (function($, _){
    var importances, games;

    function getGames() {
        if (!games) {
            games = d3.game;
        }
        return games;
    }

    function setGames(tmpGames) {
        games = tmpGames;
    }

    function getGamesSum() {
        var result;
        importances = {};

        _.each(d3.game, function(game, key){
            importances[key] = game.importance;
        });

        result = _.reduce(importances, function(memo, importance){return memo + importance;}, 0);

        return result;
    }

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

    function run() {
        var game = getRandomGame();

        if (game) {
            return game.run();
        }

        return false;
    }

    return {
        run: run,
        setGames: setGames
    };
})(jQuery, _);
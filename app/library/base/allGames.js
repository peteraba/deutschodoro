define(
    ['base/options', 'game/derDieDas', 'game/pluralize', 'game/wordToEnglish', 'game/wordToGerman'],
    function(options, derDieDas, pluralize, wordToEnglish, wordToGerman){
        var enabledGames = {}, gameOptions, games, minLevel, maxLevel;

        games = {
            derDieDas: derDieDas,
            pluralize: pluralize,
            wordToEnglish: wordToEnglish,
            wordToGerman: wordToGerman
        };

        minLevel = Math.max(1, Math.min(parseInt(options.get('minLevel', 1)), 10));
        maxLevel = Math.max(minLevel, Math.min(parseInt(options.get('maxLevel', 1)), 10));

        _.each(games, function(game, name){
            var validImportance;

            gameOptions = options.get(name, {importance: 100});

            if (gameOptions && typeof gameOptions.importance != 'undefined') {
                game.setImportance(gameOptions.importance);
            } else {
                game.setImportance(0);
            }

            game.setMinLevel(minLevel);
            game.setMaxLevel(maxLevel);

            enabledGames[name] = game;
        });

        return enabledGames;
    }
);
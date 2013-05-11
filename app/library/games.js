define(
    ['options', 'game/derDieDas', 'game/pluralize', 'game/wordToEnglish', 'game/wordToGerman'],
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

            gameOptions = options.get(name);

            if (gameOptions && gameOptions.importance && gameOptions.importance > 0) {
                validImportance = Math.max(0, Math.min(parseInt(gameOptions.importance), 999));

                game.setImportance(validImportance);

                game.setMinLevel(minLevel);
                game.setMaxLevel(maxLevel);

                enabledGames[name] = game;
            } else if (!gameOptions) {
                enabledGames[name] = game;
            }
        });

        return enabledGames;
    }
);
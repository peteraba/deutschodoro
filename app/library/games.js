define(
    ['options', 'game/derDieDas', 'game/pluralize', 'game/wordToEnglish', 'game/wordToGerman'],
    function(options, derDieDas, pluralize, wordToEnglish, wordToGerman){
        var enabledGames = {}, gameOptions, games, level;

        games = {
            derDieDas: derDieDas,
            pluralize: pluralize,
            wordToEnglish: wordToEnglish,
            wordToGerman: wordToGerman
        };

        level = Math.max(0, Math.min(parseInt(options.get('level', 1)), 3));

        _.each(games, function(game, name){
            var validImportance;

            gameOptions = options.get(name);

            if (gameOptions && gameOptions.importance && gameOptions.importance > 0) {
                validImportance = Math.max(0, Math.min(parseInt(gameOptions.importance), 1000));

                game.setImportance(validImportance);
                game.setLevel(level);

                enabledGames[name] = game;
            } else if (!gameOptions) {
                enabledGames[name] = game;
            }
        });

        return enabledGames;
    }
);
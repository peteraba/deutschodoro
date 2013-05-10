define(
    ['options', 'game/derDieDas', 'game/pluralize', 'game/wordToEnglish', 'game/wordToGerman'],
    function(options, derDieDas, pluralize, wordToEnglish, wordToGerman){
        var enabledGames = {}, gameOptions, games;

        games = {
            derDieDas: derDieDas,
            pluralize: pluralize,
            wordToEnglish: wordToEnglish,
            wordToGerman: wordToGerman
        };

        _.each(games, function(game, name){
            gameOptions = options.get(name);

            if (gameOptions && gameOptions.importance && gameOptions.importance > 0) {
                game.setImportance(gameOptions.importance);

                enabledGames[name] = game;
            } else if (true) {
                enabledGames[name] = game;
            }
        });

        return enabledGames;
    }
);
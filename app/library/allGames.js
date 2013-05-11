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

            gameOptions = options.get(name, {importance: 100});

            if (gameOptions && typeof gameOptions.importance != 'undefined') {
                game.setImportance(gameOptions.importance);
            } else {
                game.setImportance(0);
            }

            game.setLevel(level);

            enabledGames[name] = game;
        });

        return enabledGames;
    }
);
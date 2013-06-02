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

        function init() {
            minLevel = Math.max(1, Math.min(parseInt(options.get('minLevel', 1)), 10));
            maxLevel = Math.max(minLevel, Math.min(parseInt(options.get('maxLevel', 1)), 10));

            _.each(games, function(game, name){
                var validImportance;

                gameOptions = options.get(name);

                if (gameOptions) {
                    if (typeof gameOptions.importance == 'undefined' || isNaN(gameOptions.importance)) {
                        gameOptions.importance = 100;
                    }
                    validImportance = Math.max(0, Math.min(parseInt(gameOptions.importance), 999));

                    game.setImportance(validImportance);

                    game.setMinLevel(minLevel);
                    game.setMaxLevel(maxLevel);

                    if (validImportance > 0) {
                        enabledGames[name] = game;
                    }
                } else if (!gameOptions) {
                    enabledGames[name] = game;

                    game.setMinLevel(minLevel);
                    game.setMaxLevel(maxLevel);
                }
            });
        }

        function getEnabledGames() {
            return enabledGames;
        }

        function getAllGames() {
            return games;
        }

        init();

        return {
            getEnabledGames: getEnabledGames,
            getAllGames: getAllGames
        };
    }
);
define(
    ['gui', 'games', 'stat', 'vendor/jquery', 'vendor/underscore'],
    function(gui, games, stat, $){
        var importances, currentGame, currentAnswer, canReRun = false;

        /**
         *
         * @return {Number}
         */
        function getGamesSum() {
            var result;

            importances = {};

            _.each(games, function(game, key){
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
                return games[game];
            }

            return false;
        }

        /**
         *
         * @return {Boolean|Object}
         */
        function run() {
            var game = getRandomGame(), html, submit;

            canReRun = false;
            currentGame = game;
            currentAnswer = null;

            if (game && game.create()) {
                html = $(game.getHtml());
                $('#submit', html).click(checkResult);
                gui.displayGame(html);
            }

            return game;
        }

        function checkResult(event) {
            var radioBtns, answer;

            event.preventDefault();

            radioBtns = $('.options input');
            answer = $('span', radioBtns.filter(':checked').parent());
            currentAnswer = answer;

            if (answer.length) {
                radioBtns.attr('disabled', true);
                if (currentGame.checkResult(answer.text())) {
                    handleSuccess(answer);
                } else {
                    handleFailure(answer);
                }
            }
        }

        function handleFailure(answer) {
            var hashes = [];

            _.each(currentGame.getUsedWords(), function(word){
                hashes.push(word.hash);
            });

            answer.addClass('failure');

            stat.saveResult(hashes, false);

            reRun();
        }

        function handleSuccess(answer) {
            var hashes = [];

            _.each(currentGame.getUsedWords(), function(word){
                hashes.push(word.hash);
            });

            answer.addClass('success');

            stat.saveResult(hashes, true);

            reRun();
        }

        function reRun() {
            canReRun = true;
            setTimeout(function(){
                if (canReRun) {
                    run();
                }
            }, 3000);
        }

        function isReady(){
            return gui.isReady();
        }

        return {
            run: run,
            isReady: isReady
        };
    }
);
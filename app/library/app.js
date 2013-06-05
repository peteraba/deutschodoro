define(
    [
        'base/gui',
        'base/games',
        'base/stat',
        'base/timer',
        'base/dictionary',
        'base/logger',
        'helper/dom',
        'vendor/underscore',
        'base/keybinding'
    ],
    function(gui, games, stat, timer, dictionary, logger, dom, _){
        var importanceList, currentGame, currentAnswer, canReRun = false, enabledGames;

        function init() {
            enabledGames = games.getEnabledGames();
        }

        /**
         *
         * @return {Number}
         */
        function getGamesSum() {
            var result;

            importanceList = {};

            _.each(enabledGames, function(game, key){
                importanceList[key] = game.getImportance();
            });

            result = _.reduce(importanceList, function(memo, importance){return parseInt(memo) + parseInt(importance);}, 0);

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

            _.every(importanceList, function(value, key){
                rand = rand - value;
                if (rand <= 0) {
                    game = key;
                    return false;
                }
                return true;
            });

            if (game) {
                return enabledGames[game];
            }

            return false;
        }

        /**
         *
         * @return {Boolean|Object}
         */
        function run() {
            var game, msg;

            timer.start('game.init');
            game = getRandomGame();

            canReRun = false;
            currentGame = game;
            currentAnswer = null;

            if (game) {
                if (game.create()) {
                    displayGame(game);
                } else {
                    msg = [
                        'Word for game was not found. Check your dictionary and settings.',
                        'Is your minimum skill level too high for your dictionary?'
                    ].join('<br />');
                    displayMsg(msg);
                }
            } else {
                msg = [
                    'Game was not loaded. Check your settings.',
                    'Do you have games with probability over 0?'
                ].join('<br />');
                displayMsg(msg);
            }

            timer.end('game.init');

            return game;
        }

        function displayMsg(msg) {
            var html, htmlTemplate, retryBtn;

            htmlTemplate = [
                '<div>',
                '<h1>Error</h1>',
                '<p>',
                msg,
                '</p>',
                '<p id="retry"><button>Retry</button></p>',
                '</div>'
            ];

            html = dom.get(htmlTemplate.join(''));

            dom.get('#retry', html).click(function(){
                run();
            });

            gui.displayPage(html);
        }

        /**
         *
         * @param {Object} game
         */
        function displayGame(game) {
            var html = dom.get(game.getHtml());

            dom.get('#submit', html).click(checkResult);

            timer.start('game.display');
            gui.displayGame(html);
            gui.addRaters(game.getHash());
            gui.displayHelp(game.getHelp(), game.getUsedWords());
            timer.end('game.display');
        }

        /**
         *
         * @param {Object} event
         */
        function checkResult(event) {
            var radioBtns, answer;

            event.preventDefault();

            radioBtns = dom.get('#answerOptions input');
            answer = dom.get('span', radioBtns.filter(':checked').parent());
            currentAnswer = answer;

            if (answer.length) {
                radioBtns.attr('disabled', true);
                if (currentGame.checkResult(answer.text())) {
                    handleSuccess(answer);
                } else {
                    handleFailure(answer, radioBtns);
                }
            }

            updateStats();
        }

        /**
         *
         * @param {Object} answer
         * @param {Object} radioBtns
         */
        function handleFailure(answer, radioBtns) {
            var hashes = [], rightAnswer, i, span;

            _.each(currentGame.getUsedWords(), function(word){
                hashes.push(word.hash);
            });

            answer.closest('label, .label').addClass('failure');

            rightAnswer = currentGame.getAnswer();
            for (i = 0; i < radioBtns.length; i++) {
                span = dom.get('span', radioBtns.eq(i).parent());
                if (span.text() == rightAnswer) {
                    span.closest('label, .label').addClass('rightAnswer');
                    break;
                }
            }

            stat.saveResult(hashes, false);

            gui.showErrorReportBtn();

            reRun();
        }

        /**
         *
         * @param {Object} answer
         */
        function handleSuccess(answer) {
            var hashes = [];

            _.each(currentGame.getUsedWords(), function(word){
                hashes.push(word.hash);
            });

            answer.closest('label, .label').addClass('success');

            stat.saveResult(hashes, true);

            reRun();
        }

        function updateStats() {
            var dict, stats;

            dict = dictionary.getDictionary();
            stats = stat.getStats(dict);

            gui.updateStats(stats);
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
            if (gui.isReady()) {
                updateStats();
                return true;
            }
            return false;
        }

        init();

        return {
            run: run,
            isReady: isReady
        };
    }
);
define(
    ['vendor/jquery'],
    function($){
        var ready = false,
            $doc = $(document),
            $window = $(window),
            domCache = {},
            eastPanes = ['#help', '#stat'];

        function init(){
            $('#helpToggler').click(function() {
                toggle(eastPanes, 0);
            });
            $('#statToggler').click(function() {
                toggle(eastPanes, 1);
            });
            $('#feedback').click(newWindow);

            ready = true;
        }

        function getDom(selector) {
            if (!domCache[selector]) {
                domCache[selector] = $(selector);
            }
            return domCache[selector];
        }

        function isReady() {
            return ready;
        }

        function displayGame(html) {
            if (isReady()) {
                getDom('#center').empty().append(html);
            }
        }

        function newWindow(e){
            var url = $(this).attr('href');

            e.preventDefault();

            window.open(url, 'deutschodoro-help');
        }

        function displayHelp(gameHelp, words) {
            var html = [], east;
            if (isReady()) {
                html.push('<h2>Help</h2>');
                html.push(getGameHelpHtml(gameHelp));
                html.push(getDictionaryHelpHtml(words));

                east = getDom('#help').empty().append(html.join(''));
                $('a', east).click(newWindow);
            }
        }

        function getGameHelpHtml(gameHelp) {
            var html = [];

            if (gameHelp) {
                html.push('<h3>Game help</h3>');
                html.push('<p>' + gameHelp + '</p>');

                return '<div class="game-help">' +  html.join('') + '</div>';
            }

            return '';
        }

        function getDictionaryHelpHtml(words) {
            var i, html = [], german;

            if (words.length) {
                for (i = 0; i < words.length; i++) {
                    german = words[i].german;
                    html.push('<h3>Word #' + (i+1) + '</h3>');
                    html.push('<ul>');
                    html.push('<li><a href="http://en.wiktionary.org/wiki/' + german + '#German">wiktionary.org</a></li>');
                    html.push('<li><a href="http://dict.leo.org/#/search=' + german + '&searchLoc=1&resultOrder=basic&multiwordShowSingle=on">leo.org</a></li>');
                    html.push('<li><a href="http://de.thefreedictionary.com/' + german + '">thefreedictionary.com</a></li>');
                    html.push('<li><a href="http://www.duden.de/suchen/dudenonline/' + german + '#German">duden.de</a></li>');
                    html.push('<li><a href="http://www.canoo.net/services/Controller?input=' + german + '&service=inflection">canoo.net</a></li>');
                    html.push('</ul>');
                }

                return '<div class="dictionary-help">' +  html.join('') + '</div>';
            }

            return '';
        }

        function toggle(selectors, toggleIndex) {
            var i;

            if (getDom(selectors[toggleIndex]).is(':visible')) {
                getDom(selectors[toggleIndex]).hide();
            } else {
                for (i = 0; i < selectors.length; i++) {
                    getDom(selectors[i]).hide();
                }

                getDom(selectors[toggleIndex]).show();
            }
        }

        function resize(){
            var width;

            width = Math.min(300, Math.floor($doc.width()/4));

            getDom('.ui-layout-eas').width(width);
        }

        function updateScore(score) {
            if (isReady()) {
                //getDom('#help').empty().append('<p>Score: ' + score + '</p>');
            }
        }

        $doc.ready(function(){
            init();
            $window.resize();
        });

        $window.resize(resize);

        return {
            isReady: isReady,
            displayGame: displayGame,
            displayHelp: displayHelp,
            updateScore: updateScore
        }
    }
);
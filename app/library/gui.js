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

        function displaySettingsPage(html) {
            east = getDom('#center').empty().append(html);
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

        function updateStats(stats) {
            var html = [], totalScore = 0, totalCount = 0, percentage;

            html.push('<table>');

            html.push('<thead>');
            html.push('<tr><th>hit rate</th><th>count</th></tr>');
            html.push('</thead>');

            html.push('<tbody>');
            if (isReady()) {
                _.each(stats, function(value, index){
                    percentage = (index * 10);
                    percentage = percentage==100 ? percentage : (percentage + ' - ' + (percentage + 10))
                    html.push('<tr><td>' + percentage + '%</td><td>' + value + '</td></tr>');
                    totalScore += (value * 10 * index);
                    totalCount += value;
                });
            }
            html.push('</tbody>');

            if (totalCount) {
                percentage = Math.floor(totalScore / totalCount * 100) / 100;
                html.push('<tfoot>');
                html.push('<tr><th>' + percentage + '%</th><th>' + totalCount + '</th></tr>');
                html.push('</tfoot>');
            }

            html.push('</table>');

            getDom('#stat').html(html.join(''));
        }

        function showErrorReportBtn(game, questions, answer) {
            var errorReportBtn;

            errorReportBtn = $('<a id="report" href="">Report a problem</a>')
                .attr('href', 'https://groups.google.com/forum/#!forum/deutschodoro')
                .click(newWindow);

            errorReportBtn.insertAfter('#submit');
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
            showErrorReportBtn: showErrorReportBtn,
            updateStats: updateStats,
            displaySettingsPage: displaySettingsPage,
            getDom: getDom
        }
    }
);
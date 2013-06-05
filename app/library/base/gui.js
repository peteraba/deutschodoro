define(
    ['helper/dom', 'helper/ajax'],
    function(dom, ajaxHelper){
        var ready = false,
            $doc = dom.getDocument(),
            $window = dom.getWindow(),
            eastPanes = ['#help', '#stat', '#rateHelp'];

        function init(){
            dom.get('#helpToggler').click(function() {
                toggle(eastPanes, 0);
            });
            dom.get('#statToggler').click(function() {
                toggle(eastPanes, 1);
            });
            dom.get('#gui').delegate('.rateHelp', 'click', function(event) {
                event.preventDefault();

                toggle(eastPanes, 2);
            });
            dom.get('#feedback, #south .deutschodoro-link a').click(newWindow);

            dom.get('#rateHelp').html(
                [
                    '<h2>Help for rating words:</h2>',
                    '<p>1. apple, mother, to sit, red</p>',
                    '<p>2. post office, cuisine, to use, tall</p>',
                    '<p>3. friendship, judge, to require, scary</p>',
                    '<p>4. corkscrew, chimneysweep, to pray, impressive</p>',
                    '<p>5. exhaust pipe, coroner, to depict, coarse</p>',
                    '<p>6. pelmet, mortgage, to to oblige, scruffy</p>',
                    '<p>7. pre-highschool level terminology, secondary synonyms</p>',
                    '<p>8. highschool level terminology, rare words</p>',
                    '<p>9. university level words</p>'
                ].join('')
            );

            ready = true;
        }

        function isReady() {
            return ready;
        }

        function displayGame(html) {
            if (isReady()) {
                dom.getCached('#center').empty().append(html);
            }
        }

        function addRaters(hash) {
            if (isReady()) {
                dom.getCached('#center').append(getRaters(hash));
            }
        }

        function getRaters(hash) {
            var raters;

            raters = $(getRatersHtml());

            setupRaters(raters, hash);

            return raters;
        }

        function getRatersHtml() {
            var html;

            html = [
                '<div class="raters">',
                '<p>What level this word belongs to? (<a href="#" class="rateHelp">Help</a>)</p>',
                '<ul>',
                '<li><button class="alert">1</button></li>',
                '<li><button class="alert">2</button></li>',
                '<li><button class="alert">3</button></li>',
                '<li><button class="alert">4</button></li>',
                '<li><button class="alert">5</button></li>',
                '<li><button class="alert">6</button></li>',
                '<li><button class="alert">7</button></li>',
                '<li><button class="alert">8</button></li>',
                '<li><button class="alert">9</button></li>',
                '</ul>',
                '</div>'
            ];

            return html.join('');
        }

        function setupRaters(raters, hash) {
            $('button', raters).click(function(e){
                var $this = $(this), ul, p, div;

                e.preventDefault();

                ajaxHelper.vote(hash, $this.text());

                ul  = $this.closest('ul');
                p   = ul.prev();
                div = ul.parent();

                ul.fadeOut();
                p.text('Thank you!');
                setTimeout(function(){
                    div.fadeOut('normal', function(){ div.remove(); });
                }, 2000);
            });
        }

        function newWindow(e){
            var url = dom.get(this).attr('href');

            e.preventDefault();

            dom.getWindow(true).open(url, 'deutschodoro-help');
        }

        function displayHelp(gameHelp, words) {
            var html = [], east;
            if (isReady()) {
                html.push('<h2>Help</h2>');
                html.push(getGameHelpHtml(gameHelp));
                html.push(getDictionaryHelpHtml(words));

                east = dom.getCached('#help').empty().append(html.join(''));
                dom.get('a', east).click(newWindow);
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
                    html.push('<li>' + getWikiLink(german) + '</li>');
                    html.push('<li>' + getLeoLink(german) + '</li>');
                    html.push('<li>' + getThefreedictionaryLink(german) + '</li>');
                    html.push('<li>' + getDudenLink(german) + '</li>');
                    html.push('<li>' + getCanooLink(german) + '</li>');
                    html.push('</ul>');
                }

                return '<div class="dictionary-help">' +  html.join('') + '</div>';
            }

            return '';
        }

        function getWikiLink(german) {
            return '<a href="http://en.wiktionary.org/wiki/' + german + '#German">wiktionary.org</a>';
        }

        function getLeoLink(german) {
            return [
                '<a href="http://dict.leo.org/#/search=' + german + '',
                '&searchLoc=1&resultOrder=basic&multiwordShowSingle=on">',
                'leo.org',
                '</a>'
            ].join('');
        }

        function getThefreedictionaryLink(german) {
            return '<a href="http://de.thefreedictionary.com/' + german + '">thefreedictionary.com</a>';
        }

        function getDudenLink(german) {
            return '<a href="http://www.duden.de/suchen/dudenonline/' + german + '#German">duden.de</a>';
        }

        function getCanooLink(german) {
            return [
                '<a href="http://www.canoo.net/services/Controller?input=' + german + '&service=inflection">',
                'canoo.net',
                '</a>'
            ].join('');
        }

        function displayPage(html) {
            dom.getCached('#center').empty().append(html);
        }

        function toggle(selectors, toggleIndex) {
            var i;

            if (dom.getCached(selectors[toggleIndex]).is(':visible')) {
                dom.getCached(selectors[toggleIndex]).hide();
            } else {
                for (i = 0; i < selectors.length; i++) {
                    dom.getCached(selectors[i]).hide();
                }

                dom.getCached(selectors[toggleIndex]).show();
            }
        }

        function resize(){
            var width;

            width = Math.min(300, Math.floor($doc.width()/4));

            dom.getCached('.ui-layout-eas').width(width);
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

            dom.getCached('#stat').html(html.join(''));
        }

        function showErrorReportBtn() {
            var errorReportBtn;

            errorReportBtn = dom.get('<button class="alert" id="report" href="">Report</button>')
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
            addRaters: addRaters,
            displayHelp: displayHelp,
            displayPage: displayPage,
            showErrorReportBtn: showErrorReportBtn,
            updateStats: updateStats
        }
    }
);
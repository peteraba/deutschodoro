define(
    ['base/allGames', 'base/options', 'vendor/jquery', 'vendor/underscore'],
    function(games, options, $, _){
        var gameTemplate, levelTemplate, formTemplate, bodyTemplate;

        gameTemplate = [
            '<li>',
            '<label for="{name}">',
            '<input type="number" name="{name}" id="{name}" value="{value}" min="0" max="999" class="gameImportance">',
            '{name}',
            '</label>',
            '</li>'
        ];
        levelTemplate = [
            '<li>',
            '<label for="{name}">',
            '<input type="number" name="{name}" id="{name}" value="{value}" min="1" max="10" class="level">',
            '{word} level',
            '</label>',
            '</li>'
        ];
        formTemplate = [
            '<form action="" method="post">',
            '<h3>Probability of games</h3>',
            '<ul>',
            '{gameOptions}',
            '</ul>',
            '<h3>General settings</h3>',
            '<ul>',
            '{minLevelOptions}',
            '{maxLevelOptions}',
            '</ul>',
            '<p>',
            '<input type="submit" name="submit" id="submit">',
            '</p>',
            '</form>'
        ];
        bodyTemplate = [
            '<div>',
            '<h1>Main options</h1>',
            '{form}',
            '</div>'
        ];

        function getGameOptions() {
            var html = [];

            _.each(games, function(game, name) {
                var value = game.getImportance(), gameHtml = gameTemplate.join(''), option;

                option = gameHtml.replace(/\{name\}/g, name).replace(/\{value\}/g, value);

                html.push(option);
            });

            return html.join('');
        }

        function getLevelOptions(name, word) {
            var levelHtml = levelTemplate.join(''), levelOption;
            levelOption = options.get(name, 1);

            levelHtml = levelHtml.replace(/\{value\}/g, levelOption);
            levelHtml = levelHtml.replace(/\{word\}/g, word);
            levelHtml = levelHtml.replace(/\{name\}/g, name);

            return levelHtml;
        }

        function getForm() {
            var formHtml = formTemplate.join('');

            formHtml = formHtml.replace(/\{gameOptions\}/g, getGameOptions());
            formHtml = formHtml.replace(/\{minLevelOptions\}/g, getLevelOptions('minLevel', 'Minimum'));
            formHtml = formHtml.replace(/\{maxLevelOptions\}/g, getLevelOptions('maxLevel', 'Maximum'));

            return formHtml;
        }

        function getHtml(){
            var bodyHtml = bodyTemplate.join('');

            bodyHtml = bodyHtml.replace(/\{form\}/g, getForm());

            return bodyHtml;
        }

        function saveOptions(event) {
            var $this = $(this), minLevel;

            event.preventDefault();

            $('.gameImportance', $this).each(function(){
                var $input = $(this), name = $input.attr('name'), oldGameOptions;

                oldGameOptions = options.get(name, {});
                oldGameOptions.importance = Math.max(0, Math.min(999, parseInt($input.val())));

                options.set(name, oldGameOptions);
            });

            minLevel = Math.max(1, Math.min(10, parseInt($('#minLevel').val())));
            options.set('minLevel', minLevel);
            options.set('maxLevel', Math.max(minLevel, Math.min(10, parseInt($('#maxLevel').val()))));

            displaySavedMsg();
        }

        function displaySavedMsg() {
            var display;

            display = $('<span class="saved">Saved.</span>');

            display.insertAfter('#submit');

            setTimeout(function(){if (display) display.hide();}, 3000);
        }

        function render(){
            var html = $(getHtml());

            $('form', html).submit(saveOptions);

            return html;
        }

        return {
            render: render
        };
    }
);
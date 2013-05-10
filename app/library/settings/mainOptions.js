define(
    ['allGames', 'options', 'vendor/jquery', 'vendor/underscore'],
    function(games, options, $, _){
        var gameTemplate, levelTemplate, formTemplate, bodyTemplate;

        gameTemplate = [
            '<li>',
            '<label for="{name}">',
            '<input type="number" name="{name}" id="{name}" value="{value}" min="0" max="1000" class="gameImportance">',
            '{name}',
            '</label>',
            '</li>'
        ];
        levelTemplate = [
            '<li>',
            '<label for="level">',
            '<input type="number" name="level" id="level" value="{value}" min="1" max="3" class="level">',
            'Your german level',
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
            '{levelOptions}',
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

        function getLevelOptions() {
            var levelHtml = levelTemplate.join(''), levelOption;

            levelOption = options.get('level');
            levelOption = levelOption ? levelOption : 1;

            levelHtml = levelHtml.replace(/\{value\}/g, levelOption);

            return levelHtml;
        }

        function getForm() {
            var formHtml = formTemplate.join('');

            formHtml = formHtml.replace(/\{gameOptions\}/g, getGameOptions());
            formHtml = formHtml.replace(/\{levelOptions\}/g, getLevelOptions());

            return formHtml;
        }

        function getHtml(){
            var bodyHtml = bodyTemplate.join('');

            bodyHtml = bodyHtml.replace(/\{form\}/g, getForm());

            return bodyHtml;
        }

        function saveOptions(event) {
            var $this = $(this);

            event.preventDefault();

            $('.gameImportance', $this).each(function(){
                var $input = $(this), name = $input.attr('name'), oldGameOptions;

                oldGameOptions = options.get(name);
                oldGameOptions = typeof oldGameOptions=='undefined' ? {} : oldGameOptions;
                oldGameOptions.importance = Math.max(0, Math.min(1000, $input.val()));

                options.set(name, oldGameOptions);
            });

            options.set('level', Math.max(1, Math.min(3, $('#level').val())));

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
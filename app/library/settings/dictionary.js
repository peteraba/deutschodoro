define(
    ['options', 'vendor/jquery', 'vendor/underscore'],
    function(options, $, _){
        var formTemplate, bodyTemplate;

        formTemplate = [
            '<form action="" method="post">',
            '<h3>Probability of games</h3>',
            '<p>',
            '<textarea cols="50" rows="10" id="rawDictionary">{rawDictionary}</textarea>',
            '</p>',
            '<p>',
            '<input type="submit" name="submit" id="submit">',
            '<a href="" id="reset">Reset</a>',
            '</p>',
            '</form>'
        ];
        bodyTemplate = [
            '<div>',
            '<h1>Dictionary</h1>',
            '{form}',
            '</div>'
        ];

        function getForm() {
            var formHtml = formTemplate.join('');

            formHtml = formHtml.replace(/\{rawDictionary\}/g, JSON.stringify(options.getRawDictionary()));

            return formHtml;
        }

        function getHtml(){
            var bodyHtml = bodyTemplate.join('');

            bodyHtml = bodyHtml.replace(/\{form\}/g, getForm());

            return bodyHtml;
        }

        function saveOptions(event) {
            var $this = $(this), result;

            event.preventDefault();

            result = options.setRawDictionary($('#rawDictionary').val());

            if (result) {
                displaySavedMsg();
            }
        }

        function resetDictionary(event) {
            var dict = options.resetRawDictionary();

            event.preventDefault();

            $('#rawDictionary').val(JSON.stringify(dict));
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
            $('#reset', html).click(resetDictionary);

            return html;
        }

        return {
            render: render
        };
    }
);
define(
    ['base/options', 'base/logger', 'helper/dom', 'vendor/underscore'],
    function(options, logger, dom, _){
        var formTemplate, bodyTemplate;

        formTemplate = [
            '<form action="" method="post">',
            '<h3>Dictionary used</h3>',
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
            var $this = dom.get(this), result, oldLogLevel;

            event.preventDefault();

            oldLogLevel = logger.getLogLevel();
            logger.setLogLevel(logger.ERROR);
            result = options.setRawDictionary(dom.get('#rawDictionary').val());
            logger.setLogLevel(oldLogLevel)

            if (result) {
                displayMsg('Saved.');
            } else {
                displayMsg('Check errors.');
            }
        }

        function resetDictionary(event) {
            var dict = options.resetRawDictionary();

            event.preventDefault();

            dom.get('#rawDictionary').val(JSON.stringify(dict));
        }

        function displayMsg(msg) {
            var display;

            display = dom.get('<span class="saved">' + msg + '</span>');

            display.insertAfter('#submit');

            setTimeout(function(){if (display) display.hide();}, 3000);
        }

        function render(){
            var html = dom.get(getHtml());

            dom.get('form', html).submit(saveOptions);
            dom.get('#reset', html).click(resetDictionary);

            return html;
        }

        return {
            render: render
        };
    }
);
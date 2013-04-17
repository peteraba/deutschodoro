define(
    ['vendor/underscore'],
    function(_){
        var question = '';

        /**
         *
         * @return {Boolean}
         */
        function create() {
            return true;
        }

        /**
         *
         * @return {String}
         */
        function getHtml() {
            var html = [];

            html.push('<h1>Word to German</h1>');
            html.push('<p>What is the translation of `' + question + '`?</p>');
            html.push('<ul>');
            html.push('</ul>');

            return html.join('');
        }

        /**
         *
         * @param {String} answer
         * @return {Boolean}
         */
        function checkResult(answer) {
            return false;
        }

        /**
         *
         * @return {Array}
         */
        function getUsedWords() {
            return [pickedWord];
        }

        return {
            create: create,
            getHtml: getHtml,
            checkResult: checkResult,
            getUsedWords: getUsedWords,
            importance: 100
        };
    }
);
define(
    ['wordFinder', 'vendor/underscore'],
    function(wordFinder){
        var pickedWord = null;

        /**
         *
         * @return {Boolean}
         */
        function create() {
            pickedWord = wordFinder.getWord({type:"noun"});

            return true;
        }

        /**
         *
         * @return {String}
         */
        function getHtml() {
            var html = [];

            html.push('<h1>Der, die, das</h1>');
            html.push('<p>What is the article of `' + pickedWord.german + '`?</p>');
            html.push('<ul class="options">');

            html.push('<li>');
            html.push('<label for="der">');
            html.push('<input type="radio" name="article" value="der" id="der">');
            html.push(' <span>der</span>');
            html.push('</label>');
            html.push('</li>');

            html.push('<li>');
            html.push('<label for="die">');
            html.push('<input type="radio" name="article" value="die" id="die">');
            html.push(' <span>die</span>');
            html.push('</label>');
            html.push('</li>');

            html.push('<li>');
            html.push('<label for="das">');
            html.push('<input type="radio" name="article" value="das" id="das">');
            html.push(' <span>das</span>');
            html.push('</label>');
            html.push('</li>');

            html.push('</ul>');
            html.push('<p><button id="submit">Submit</button></p>');

            return html.join('');
        }

        /**
         *
         * @param {String} answer
         * @return {Boolean}
         */
        function checkResult(answer) {
            return (pickedWord.article == answer);
        }

        /**
         *
         * @return {Array}
         */
        function getUsedWords() {
            return [pickedWord];
        }

        /**
         *
         * @return {Object}
         */
        function getAnswer() {
            return answer;
        }

        return {
            create: create,
            getHtml: getHtml,
            checkResult: checkResult,
            getUsedWords: getUsedWords,
            getAnswer: getAnswer,
            importance: 0
        };
    }
);
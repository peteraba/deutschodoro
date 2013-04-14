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
            html.push('<ul>');
            html.push('<li><label for="der">der <input type="radio" name="article" value="der" id="der"></label></li>');
            html.push('<li><label for="die">die <input type="radio" name="article" value="die" id="die"></label></li>');
            html.push('<li><label for="das">das <input type="radio" name="article" value="das" id="das"></label></li>');
            html.push('</ul>');

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

        return {
            create: create,
            getHtml: getHtml,
            checkResult: checkResult,
            getUsedWords: getUsedWords,
            importance: 100
        };
    }
);
define(
    ['wordFinder', 'vendor/underscore'],
    function(wordFinder, _){
        var pickedWord = null, importance = 100, level = 1;

        /**
         *
         * @return {Boolean}
         */
        function create() {
            pickedWord = wordFinder.getWord({type:"noun", plural:'!–'});

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
         * @return {String}
         */
        function getAnswer() {
            return pickedWord.article;
        }

        /**
         *
         * @return {String}
         */
        function getHelp() {
            var english = _.isArray(pickedWord.english) ? pickedWord.english.join() : pickedWord.english;

            return 'Original word: ' + english;
        }

        /**
         *
         * @returns {Number}
         */
        function getImportance() {
            return importance;
        }

        /**
         *
         * @param {Number} newImportance
         * @returns {*}
         */
        function setImportance(newImportance) {
            importance = newImportance;

            return newImportance;
        }

        /**
         *
         * @param {Number} newLevel
         * @returns {Number}
         */
        function setLevel(newLevel) {
            var level = newLevel;

            return level;
        }

        return {
            create: create,
            getHtml: getHtml,
            checkResult: checkResult,
            getUsedWords: getUsedWords,
            getHelp: getHelp,
            getAnswer: getAnswer,
            getImportance: getImportance,
            setImportance: setImportance,
            setLevel: setLevel
        };
    }
);
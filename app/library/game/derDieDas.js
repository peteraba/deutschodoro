define(
    ['base/wordFinder', 'vendor/underscore'],
    function(wordFinder, _){
        var pickedWord = null, importance = 100, minLevel = 1, maxLevel = 10, hash = null;;

        function clear() {
            pickedWord = null;
        }

        /**
         *
         * @return {Boolean}
         */
        function create() {
            clear();

            pickedWord = wordFinder.getWord({type:"noun", plural:'!–'}, minLevel, maxLevel);

            hash = pickedWord.hash;

            return pickedWord!==false;
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
         * @param {Number} newMinLevel
         * @returns {Number}
         */
        function setMinLevel(newMinLevel) {
            minLevel = newMinLevel;

            return minLevel;
        }

        /**
         *
         * @param {Number} newMaxLevel
         * @returns {Number}
         */
        function setMaxLevel(newMaxLevel) {
            maxLevel = newMaxLevel;

            return maxLevel;
        }

        /**
         *
         * @returns {String}
         */
        function getHash() {
            return hash;
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
            setMinLevel: setMinLevel,
            setMaxLevel: setMaxLevel,
            getHash: getHash
        };
    }
);
define(
    ['wordFinder', 'german/noun', 'vendor/underscore'],
    function(wordFinder, germanNoun, _){
        var pickedWord = null
            , answer = null
            , question = null
            , words
            , GERMAN_PLURAL_PREFIX = 'die '
            , importance = 100
            , level = 1;

        /**
         *
         * @return {Boolean}
         */
        function create() {
            pickedWord = wordFinder.getWord({type:"noun", plural:'!–'});

            answer = germanNoun.getPlural(pickedWord.german, pickedWord.plural);

            if (answer === false) {
                throw 'Picked word: `' + pickedWord.german + '` was not pluralizable.';
            }

            words = [answer];
            words.push(germanNoun.getPluralWrongPlural(pickedWord.german, words));
            words.push(germanNoun.getPluralWrongPlural(pickedWord.german, words));

            answer = GERMAN_PLURAL_PREFIX + answer;
            words[0] = GERMAN_PLURAL_PREFIX + words[0];
            words[1] = GERMAN_PLURAL_PREFIX + words[1];
            words[2] = GERMAN_PLURAL_PREFIX + words[2];

            words = _.shuffle(words);

            question = pickedWord.article + ' ' + pickedWord.german;

            return true;
        }

        /**
         *
         * @return {String}
         */
        function getHtml() {
            var html = [], html2 = [], i;

            for (i = 0; i < 3; i++) {
                html2.push('<li>');
                html2.push('<label for="' + words[i] + '">');
                html2.push('<input type="radio" name="word" value="' + words[i] + '" id="' + words[i] + '">');
                html2.push(' <span>' + words[i] + '</span>');
                html2.push('</label>');
                html2.push('</li>');
            }

            html.push('<h1>Pluralize</h1>');
            html.push('<p>What is the plural of `' + question + '`?</p>');
            html.push('<ul class="options">');
            html.push(html2.join(''));
            html.push('</ul>');
            html.push('<p><button id="submit">Submit</button></p>');

            return html.join('');
        }

        /**
         *
         * @param {String} word
         * @return {Boolean}
         */
        function checkResult(word) {
            return word == answer;
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
            return answer;
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
         * @returns {Number}
         */
        function setImportance(newImportance) {
            var importance = newImportance;

            return importance;
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
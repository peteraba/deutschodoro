define(
    ['base/wordFinder', 'german/noun', 'english/noun', 'vendor/underscore'],
    function(wordFinder, germanNoun, englishNoun, _){
        var question = ''
            , answer = null
            , pickedWord = null
            , words = []
            , PLURAL_CHANCE = 50
            , ENGLISH_NOUN_PREFIX = 'the '
            , GERMAN_PLURAL_PREFIX = 'die '
            , importance = 100
            , minLevel = 1
            , maxLevel = 1
            , useRandom = null;

        function clear() {
            question = '';
            answer = false;
            pickedWord = null;
            words = [];
        }

        /**
         *
         * @returns {Number}
         */
        function getRandom() {
            return null===useRandom ? _.random(100) : useRandom;
        }

        /**
         *
         * @param {Number} random
         */
        function setRandom(random) {
            useRandom = random;
        }

        /**
         *
         * @return {Boolean}
         */
        function create() {
            var type, word2, word3, english;

            clear();

            pickedWord = wordFinder.getWord({}, minLevel, maxLevel);

            type = _.isArray(pickedWord.type) ? pickedWord.type[0] : pickedWord.type;
            english = _.isArray(pickedWord.english) ? pickedWord.english[0] : pickedWord.english;

            word2 = wordFinder.getRandomWord({type: type}, [pickedWord.german], minLevel, maxLevel);
            word3 = wordFinder.getRandomWord({type: type}, [pickedWord.german, word2.german], minLevel, maxLevel);

            switch (type) {
                case 'noun':
                    if (pickedWord.plural != '–' && getRandom() > PLURAL_CHANCE) {
                        createPluralNoun(english, word2, word3);
                    } else {
                        createSingularNoun(english, word2, word3);
                    }
                    break;
                default:
                    createDefault(english, word2, word3);
            }

            words = _.shuffle(words);

            return pickedWord!==false;
        }

        /**
         *
         * @param {String} english
         * @param {Object} word2
         * @param {Object} word3
         */
        function createPluralNoun(english, word2, word3) {
            question = ENGLISH_NOUN_PREFIX + englishNoun.getPlural(english);
            answer = germanNoun.getPlural(pickedWord.german, pickedWord.plural);
            answer = GERMAN_PLURAL_PREFIX + answer;

            words = [answer];

            words.push(word2.article + ' ' + germanNoun.getPlural(word2.german, word2.plural));
            words.push(word3.article + ' ' + germanNoun.getPlural(word3.german, word3.plural));
        }

        /**
         *
         * @param {String} english
         * @param {Object} word2
         * @param {Object} word3
         */
        function createSingularNoun(english, word2, word3) {
            question = ENGLISH_NOUN_PREFIX + english;
            if (pickedWord.german != '–') {
                answer = pickedWord.article + ' ' + pickedWord.german;
            } else {
                answer = GERMAN_PLURAL_PREFIX + pickedWord.german;
            }

            words = [answer];

            words.push(word2.article + ' ' + word2.german);
            words.push(word3.article + ' ' + word3.german);
        }

        /**
         *
         * @param {String} english
         * @param {Object} word2
         * @param {Object} word3
         */
        function createDefault(english, word2, word3) {
            question = english;
            answer = pickedWord.german;
            words = [answer];
            words.push(word2.german);
            words.push(word3.german);
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

            html.push('<h1>Word to German</h1>');
            html.push('<p>What is the translation of `' + question + '`?</p>');
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
            return '';
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
            setRandom: setRandom
        };
    }
);
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

        function getRandom() {
            return null===useRandom ? _.random(100) : useRandom;
        }

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
            answer = ENGLISH_NOUN_PREFIX + englishNoun.getPlural(english);
            question = germanNoun.getPlural(pickedWord.german, pickedWord.plural);
            question = GERMAN_PLURAL_PREFIX + question;

            words = [answer];

            english = _.isArray(word2.english) ? word2.english[0] : word2.english;
            words.push(ENGLISH_NOUN_PREFIX + englishNoun.getPlural(english, words));

            english = _.isArray(word3.english) ? word3.english[0] : word3.english;
            words.push(ENGLISH_NOUN_PREFIX + englishNoun.getPlural(english, words));
        }

        /**
         *
         * @param {String} english
         * @param {Object} word2
         * @param {Object} word3
         */
        function createSingularNoun(english, word2, word3) {
            answer = ENGLISH_NOUN_PREFIX + english;
            if (pickedWord.german != '–') {
                question = pickedWord.article + ' ' + pickedWord.german;
            } else {
                question = GERMAN_PLURAL_PREFIX + pickedWord.german;
            }

            words = [answer];

            english = _.isArray(word2.english) ? word2.english[0] : word2.english;
            words.push(ENGLISH_NOUN_PREFIX + english);

            english = _.isArray(word3.english) ? word3.english[0] : word3.english;
            words.push(ENGLISH_NOUN_PREFIX + english);
        }

        /**
         *
         * @param {String} english
         * @param {Object} word2
         * @param {Object} word3
         */
        function createDefault(english, word2, word3) {
            answer = english;
            question = pickedWord.german;

            words = [answer];

            english = _.isArray(word2.english) ? word2.english[0] : word2.english;
            words.push(english);

            english = _.isArray(word3.english) ? word3.english[0] : word3.english;
            words.push(english);
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

            html.push('<h1>Word to English</h1>');
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
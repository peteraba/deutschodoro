define(
    ['helper/german', 'vendor/underscore'],
    function(germanHelper, _){
        var pluralModifiers;

        pluralModifiers = {
            consonant: ['~en', '~', '⍨', '⍨e', '~er', '~s'],
            vowel: ['~n', '~', '⍨', '~s']
        };

        /**
         *
         * @param {String} singular
         * @param {String} modifier
         * @return {String}
         */
        function getPlural(singular, modifier) {
            return germanHelper.modifyWord(singular, modifier);
        }

        /**
         *
         * @param {String} singular
         * @param {Array}  skipWords
         * @return {String}
         */
        function getPluralWrongPlural(singular, skipWords) {
            var currentModifiers = pluralModifiers.vowel, pickedModifier = false, result = null;

            if (germanHelper.checkConsonantEnding(singular)) {
                currentModifiers = pluralModifiers.consonant;
            }

            while (!result || skipWords.indexOf(result) > -1) {
                pickedModifier = currentModifiers[_.random(currentModifiers.length-1)];
                result = germanHelper.modifyWord(singular, pickedModifier);
            }

            return result;
        }

        /**
         *
         * @param {String} singular
         * @param {String} modifier
         * @return {String}
         */
        function getGenitive(singular, modifier) {
            return germanHelper.modifyWord(singular, modifier);
        }

        /**
         *
         * @param {String} articleBase
         * @param {Boolean} plural
         * @param {String} indefiniteWord
         * @param {String} nounCase one of nom, acc, dat, gen
         * @return {String}
         */
        function getIndefiniteArticle(articleBase, plural, indefiniteWord, nounCase) {
            var ending = '';

            articleBase = plural ? 'pl' : articleBase;

            switch (nounCase) {
                case 'nom':
                    switch (articleBase) {
                        case 'die':
                        case 'pl':
                            ending = 'e';
                            break;
                    }
                    break;
                case 'acc':
                    switch (articleBase) {
                        case 'der':
                            ending = 'en';
                            break;
                        case 'die':
                        case 'pl':
                            ending = 'e';
                            break;
                    }
                    break;
                case 'dat':
                    switch (articleBase) {
                        case 'der':
                        case 'das':
                            ending = 'em';
                            break;
                        case 'die':
                            ending = 'er';
                            break;
                        case 'pl':
                            ending = 'en';
                            break;
                    }
                    break;
                case 'gen':
                    switch (articleBase) {
                        case 'der':
                        case 'das':
                            ending = 'es';
                            break;
                        case 'die':
                        case 'pl':
                            ending = 'er';
                            break;
                    }
                    break;
            }

            return indefiniteWord + ending;
        }

        /**
         *
         * @param {String} articleBase
         * @param {Boolean} plural
         * @param {String} nounCase one of nom, acc, dat, gen
         * @return {String}
         */
        function getDefiniteArticle(articleBase, plural, nounCase) {
            var ending;

            articleBase = plural ? 'pl' : articleBase;

            switch (nounCase) {
                case 'nom':
                    switch (articleBase) {
                        case 'pl':
                            ending = 'die';
                            break;
                        default:
                            ending = articleBase;
                            break;
                    }
                    break;
                case 'acc':
                    switch (articleBase) {
                        case 'der':
                            ending = 'den';
                            break;
                        case 'die':
                        case 'das':
                            ending = articleBase;
                            break;
                        case 'pl':
                            ending = 'die';
                            break;
                    }
                    break;
                case 'dat':
                    switch (articleBase) {
                        case 'der':
                        case 'das':
                            ending = 'dem';
                            break;
                        case 'die':
                            ending = 'der';
                            break;
                        case 'pl':
                            ending = 'den';
                            break;
                    }
                    break;
                case 'gen':
                    switch (articleBase) {
                        case 'der':
                        case 'das':
                            ending = 'des';
                            break;
                        case 'die':
                        case 'pl':
                            ending = 'der';
                            break;
                    }
                    break;
            }

            return ending;
        }

        /**
         *
         * @param {String} articleBase
         * @param {String} plural
         * @param {String} indefiniteWord
         * @param {String} nounCase one of nom, acc, dat, gen
         * @return {String}
         */
        function getArticle(articleBase, plural, indefiniteWord, nounCase) {
            if (indefiniteWord) {
                return getIndefiniteArticle(articleBase, plural, indefiniteWord, nounCase);
            }

            return getDefiniteArticle(articleBase, plural, nounCase);
        }

        return {
            getPlural: getPlural,
            getPluralWrongPlural: getPluralWrongPlural,
            getGenitive: getGenitive,
            getArticle: getArticle
        };
    }
);
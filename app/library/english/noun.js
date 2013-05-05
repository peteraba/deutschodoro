define(
    ['helper/english', 'vendor/underscore'],
    function(englishHelper, _){
        /**
         *
         * @type {Object} irregularNouns
         */
        irregularNouns = {
            person: 'people'
        };
    
        /**
         *
         * @param singular
         * @return {*}
         */
        function irregularPlural(singular) {
            if (typeof irregularNouns[singular] != 'undefined') {
                return irregularNouns[singular];
            }
    
            return false;
        }
    
        /**
         *
         * @param {String} singular
         * @return {String}
         */
        function regularPlural(singular) {
            var shortenedVerb;
    
            shortenedVerb = singular.substr(0, singular.length - 1);
            if (englishHelper.checkConsonantEnding(shortenedVerb)) {
                if (singular[singular.length-1] == 'y') {
                    return shortenedVerb + 'ies';
    
                } else if (singular[singular.length-1] == 'o') {
                    return singular + 'es';
    
                }
            }
    
            return singular + 's';
        }
    
        /**
         *
         * @param {String} singular
         * @return {String}
         */
        function getPlural(singular) {
            var word;
    
            word = irregularPlural(singular);
    
            if (!word) {
                return regularPlural(singular);
            }
    
            return word;
        }
    
        /**
         *
         * @param {String} indefiniteWord
         * @param {String} nounCase
         * @return {String}
         */
        function getIndefiniteArticle(indefiniteWord, nounCase) {
            if (nounCase == 'dat') {
                switch (indefiniteWord) {
                    case 'my':
                        return 'mine';
                    case 'your':
                        return 'yours';
                    case 'his':
                        return 'his';
                    case 'her':
                        return 'hers';
                    case 'our':
                        return 'ours';
                    case 'their':
                        return 'theirs';
                }
            }
            return indefiniteWord;
        }
    
        /**
         *
         * @param {String} noun
         * @param {String|Boolean} indefiniteWord
         * @param {String} nounCase one of nom, acc, dat, gen
         * @return {String}
         */
        function getArticle(noun, indefiniteWord, nounCase) {
            if (indefiniteWord) {
                if (true === indefiniteWord) {
                    if (englishHelper.checkConsonantBeginning(noun)) {
                        return 'a';
                    }
                    return 'an';
                }
                return getIndefiniteArticle(indefiniteWord, nounCase);
            }
    
            return 'the';
        }
    
        return {
            getPlural: getPlural,
            getArticle: getArticle
        };
    }
);
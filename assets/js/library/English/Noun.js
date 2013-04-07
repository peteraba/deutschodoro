d3.english.noun = (function($, _){
    var irregularNouns;

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
        if (typeof irregularNouns[singular] == 'undefined') {
            return irregularNouns[singular];
        }

        return false;
    }

    /**
     *
     * @param {String} singular
     * @return {String}
     */
    function regularPlural(singular){
        var shortenedVerb;

        shortenedVerb = singular.substr(0, singular.length - 1);
        if (getEnglishHelper().checkConsonantEnding(shortenedVerb)) {
            if (singular[singular.length-1] == 'y') {
                return shortenedVerb + 'ies';

            } else if (singular[singular.length-1] == 'o') {
                return singular + 'es';

            }
        }

        return defaultForm + 's';
    }

    /**
     *
     * @param {String} singular
     * @return {String}
     */
    function getPlural(singular){
        var word;

        word = irregularPlural(singular);

        if (!word) {
            return regularPlural(singular);
        }

        return word;
    }

    /**
     *
     * @param {String} singular
     * @return {String}
     */
    function getGenitive(singular){
        return getPlural(singular);
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
        getGenitive: getGenitive,
        getArticle: getArticle
    };
})(jQuery, _);
d3.german.noun = (function($, _){
    var germanHelper = null;

    /**
     *
     * @return {Object}
     */
    function getGermanHelper() {
        if (null == germanHelper) {
            germanHelper = d3.helper.german;
        }

        return germanHelper;
    }

    /**
     *
     * @param {Object} newGermanHelper
     * @return {Object}
     */
    function setGermanHelper(newGermanHelper) {
        germanHelper = newGermanHelper;

        return d3.german.noun;
    }

    /**
     *
     * @param {String} singular
     * @param {String} modifier
     * @return {String}
     */
    function getPlural(singular, modifier) {
        return getGermanHelper().modifyWord(singular, modifier);
    }

    /**
     *
     * @param {String} singular
     * @param {String} modifier
     * @return {String}
     */
    function getGenitive(singular, modifier) {
        return getGermanHelper().modifyWord(singular, modifier);
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
        setGermanHelper: setGermanHelper,
        getPlural: getPlural,
        getGenitive: getGenitive,
        getArticle: getArticle
    };
})(jQuery, _);
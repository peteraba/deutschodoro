d3.game.derDieDas = (function($, _){
    var dictionary = null;

    /**
     *
     * @param {Object} dict
     * @return {Object}
     */
    function setDictionary(dict) {
        dictionary = dict;

        return d3.game.derDieDas;
    }

    /**
     *
     * @return {Object}
     */
    function getDictionary() {
        if (null == dictionary) {
            dictionary = d3.dictionary;
        }

        return dictionary;
    }

    /**
     *
     * @return {Boolean}
     */
    function create() {
        return true;
    }

    return {
        create: create,
        importance: 100,
        setDictionary: setDictionary
    };
})(jQuery, _);
d3.dictionary = (function($, _, dict){
    var dictionary = dict;

    /**
     * @param {Array} dict
     */
    function setDictionary(dict) {
        dictionary = dict;
    }

    return {
        setDictionary: setDictionary
    };
})(jQuery, _, typeof dict == 'undefined' ? {} : dict);
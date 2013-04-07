d3.stat = (function($, _){
    var data = {}, storage = null, DATA_KEY = 'stats';

    /**
     *
     * @param {Object} newStorage
     * @return {Object}
     */
    function setStorage(newStorage) {
        storage = newStorage;

        return d3.stat;
    }

    /**
     *
     * @return {Object}
     */
    function getStorage() {
        if (null === storage) {
            if (typeof localStorage == 'undefined') {
                storage = {getItem: function(){}, setItem: function(){}};
            } else {
                storage = localStorage;
            }
        }
        return storage;
    }

    /**
     *
     * @return {Number}
     */
    function getTimestamp() {
        return Math.round((new Date()).getTime() / 1000);
    }

    /**
     *
     * @return {Object}
     */
    function loadData() {
        var jsonData;

        jsonData = getStorage().getItem(DATA_KEY);
        data = $.decodeJSON(jsonData);

        return d3.stat;
    }

    /**
     *
     * @return {Object}
     */
    function saveData() {
        getStorage().setItem(DATA_KEY);

        return d3.stat;
    }

    /**
     *
     * @param {Object} hashes
     * @param {Boolean} result
     * @return {*}
     */
    function saveResult(hashes, result) {
        var ts = getTimestamp();

        result = parseInt(result==true);

        _.each(hashes, function(hash){
            if (typeof data[hash] == 'undefined') {
                data[hash] = [[result, ts]];
            } else {
                data[hash].push([result, ts]);
            }
        });

        return saveData();
    }

    /**
     *
     * @param {Object} wordList
     * @return {Object}
     */
    function pickWord(wordList) {

    }

    loadData();

    return {
        setStorage: setStorage,
        saveResult: saveResult,
        pickWord: pickWord
    };
})(jQuery, _);
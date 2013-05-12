define(
    ['dict/dict', 'base/logger', 'validation/dictionary'],
    function(rawDictionary, logger, dictionaryValidation){
        var storage = null;

        /**
         *
         * @param {Object} newStorage
         * @return {Boolean}
         */
        function setStorage(newStorage) {
            storage = newStorage;

            return true;
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
         * @param {String} key
         * @param {*} defaultValue
         * @returns {*}
         */
        function get(key, defaultValue) {
            var data = getStorage().getItem(key);

            defaultValue = typeof defaultValue=='undefined' ? null : defaultValue;

            data = data ? JSON.parse(data) : defaultValue;

            return data;
        }

        /**
         *
         * @param {String} key
         * @param {*} data
         */
        function set(key, data){
            getStorage().setItem(key, JSON.stringify(data));
        }

        /**
         *
         * @returns {Object}
         */
        function getRawDictionary(){
            var dict = get('rawDictionary');

            if (dict) {
                return dict;
            }

            return rawDictionary;
        }

        /**
         *
         * @param {Object} newDictionary
         * @returns {Boolean}
         */
        function setRawDictionary(newDictionary){
            try {
                newDictionary = JSON.parse(newDictionary);

                if (newDictionary && dictionaryValidation.validate(newDictionary)) {
                    set('rawDictionary', newDictionary);
                    return true;
                }

            } catch (e) {
                logger.error(e);
            }

            return false;
        }

        /**
         *
         * @param {Object} newDictionary
         * @returns {Boolean}
         */
        function setCsvDictionary(newDictionary){
            try {
                newDictionary = dictionaryValidation.csvFilter(newDictionary);

                if (newDictionary && dictionaryValidation.validate(newDictionary)) {
                    set('rawDictionary', newDictionary);
                    return true;
                }

            } catch (e) {
                logger.error(e);
            }

            return false;
        }

        /**
         *
         * @returns {Object}
         */
        function resetRawDictionary(){
            getStorage().removeItem('rawDictionary');

            return rawDictionary;
        }

        return {
            setStorage: setStorage,
            get: get,
            set: set,
            getRawDictionary: getRawDictionary,
            setRawDictionary: setRawDictionary,
            setCsvDictionary: setCsvDictionary,
            resetRawDictionary: resetRawDictionary
        };
    }
);
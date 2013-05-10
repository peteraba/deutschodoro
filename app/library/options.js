define(
    function(){
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
         * @returns {*}
         */
        function get(key) {
            var data = getStorage().getItem(key);

            data = data ? JSON.parse(jsonData) : null;

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

        return {
            setStorage: setStorage,
            get: get,
            set: set
        };
    }
);
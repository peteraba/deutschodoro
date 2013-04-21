define(
    function(){
        var
            NONE  = 100,
            DEBUG = 10,
            INFO = 20,
            WARNING = 30,
            ERROR = 40,
            logLevel = NONE,
            filter = function(){return true};

        /**
         *
         * @param {Number} newLogLevel
         */
        function setLogLevel(newLogLevel){
            logLevel = newLogLevel;
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function debug(message, key){
            if (logLevel <= DEBUG && filter(message, key)) {
                console.debug(message);
            }
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function info(message, key){
            if (logLevel <= INFO && filter(message,key)) {
                console.info(message);
            }
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function log(message, key){
            if (logLevel <= INFO && filter(message, key)) {
                console.log(message);
            }
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function warn(message, key){
            if (logLevel <= WARNING && filter(message, key)) {
                console.warn(message);
            }
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function error(message, key){
            if (logLevel <= ERROR && filter(message, key)) {
                console.error(message);
            }
        }

        /**
         *
         * @param {Function} newFilter
         */
        function setFilter(newFilter){
            filter = newFilter;
        }

        return {
            setLogLevel: setLogLevel,
            log: log,
            error: error,
            debug: debug,
            info: info,
            warn: warn,
            setFilter: setFilter
        }
    }
);
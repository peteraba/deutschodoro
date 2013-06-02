define(
    function(){
        var
            DEBUG    = 40,
            INFO     = 30,
            WARNING  = 20,
            ERROR    = 10,
            NONE     = 0,
            MAX      = DEBUG,
            logLevel = NONE,
            filter = function(){return true},
            usedConsole = null;

        /**
         *
         * @return {Number} logLevel
         */
        function getLogLevel(newLogLevel){
            return logLevel;
        }

        /**
         *
         * @param {Number} newLogLevel
         */
        function setLogLevel(newLogLevel){
            logLevel = Math.max(Math.min(parseInt(newLogLevel), MAX), 0);

            return logLevel;
        }

        function setConsole(newConsole){
            usedConsole = newConsole;
        }

        function getConsole(newConsole){
            if (null === usedConsole) {
                usedConsole = console;
            }
            return usedConsole;
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function debug(message, key){
            if (logLevel >= DEBUG && filter(message, key)) {
                getConsole().debug(message);
                return true;
            }
            return false;
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function info(message, key){
            if (logLevel >= INFO && filter(message,key)) {
                getConsole().info(message);
                return true;
            }
            return false;
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function log(message, key){
            if (logLevel >= INFO && filter(message, key)) {
                getConsole().log(message);
                return true;
            }
            return false;
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function warn(message, key){
            if (logLevel >= WARNING && filter(message, key)) {
                getConsole().warn(message);
                return true;
            }
            return false;
        }

        /**
         *
         * @param {*} message
         * @param {string} key
         */
        function error(message, key){
            if (logLevel >= ERROR && filter(message, key)) {
                getConsole().error(message);
                return true;
            }
            return false;
        }

        /**
         *
         * @param {Function} newFilter
         */
        function setFilter(newFilter){
            filter = newFilter;
        }

        return {
            getLogLevel: getLogLevel,
            setLogLevel: setLogLevel,
            error: error,
            debug: debug,
            info: info,
            log: log,
            warn: warn,
            setFilter: setFilter,
            setConsole: setConsole,
            NONE: NONE,
            DEBUG: DEBUG,
            INFO: INFO,
            WARNING: WARNING,
            ERROR: ERROR
        }
    }
);
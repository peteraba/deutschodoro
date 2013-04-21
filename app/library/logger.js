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

        function setLogLevel(newLogLevel){
            logLevel = newLogLevel;
        }

        function debug(message, key){
            if (logLevel <= DEBUG && filter(message, key)) {
                console.debug(message);
            }
        }

        function info(message, key){
            if (logLevel <= INFO && filter(message,key)) {
                console.info(message);
            }
        }

        function log(message, key){
            if (logLevel <= INFO && filter(message, key)) {
                console.log(message);
            }
        }

        function warn(message, key){
            if (logLevel <= WARNING && filter(message, key)) {
                console.warn(message);
            }
        }

        function error(message, key){
            if (logLevel <= ERROR && filter(message, key)) {
                console.error(message);
            }
        }

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
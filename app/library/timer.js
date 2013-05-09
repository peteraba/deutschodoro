define(
    ['logger'],
    function(logger){
        var timers = {};

        function start(key) {
            if (!key) throw "Key for starting timer is not defined";

            timers[key] = new Date();
        }

        function end(key) {
            var diff, now;

            if (!key) throw "Key for ending timer is not defined";
            if (!timers[key]) throw "Timer for given key does not exist";

            now = new Date();

            diff = now.getTime() - timers[key].getTime();

            logger.info('Timer for `' + key + '` finished: ' + diff + 'ms');
        }

        return {
            start: start,
            end: end
        }
    }
);
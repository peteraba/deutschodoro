define(
    ['base/logger'],
    function(logger){
        var timers = {};

        function start(key) {
            if (!key) throw new Error("Key for starting timer is not defined");
            if (typeof timers[key] != 'undefined') throw new Error("Timer for given key already exists");

            timers[key] = new Date();

            return true;
        }

        function end(key) {
            var diff, now;

            if (typeof key == 'undefined') throw "Key for ending timer is not defined";
            if (typeof timers[key] == 'undefined') throw "Timer for given key does not exist";

            now = new Date();

            diff = now.getTime() - timers[key].getTime();

            logger.info('Timer for `' + key + '` finished: ' + diff + 'ms');

            delete timers[key];

            return diff;
        }

        return {
            start: start,
            end: end
        }
    }
);
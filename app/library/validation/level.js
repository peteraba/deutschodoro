define(
    ['logger'],
    function(logger){
        var MIN_LEVEL = 1, MAX_LEVEL = 10;

        /**
         *
         * @param {*} level
         * @return {Boolean}
         */
        function validate(level) {
            var parsedLevel = parseFloat(level), result;

            result = !isNaN(parsedLevel)
                && parsedLevel == parseInt(level)
                && parsedLevel >= MIN_LEVEL
                && parsedLevel <= MAX_LEVEL;

            if (!result) {
                logger.info('Level is invalid: ' + level);
            }

            return result;
        }

        /**
         *
         * @param {Number} level
         * @return {Object}
         */
        function filter(level) {
            var parsedLevel = parseFloat(level);

            if (isNaN(parsedLevel)) {
                logger.error('Level is not a number: ' + level);
                return null;
            }

            return Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, parsedLevel));
        }

        return {
            validate: validate,
            filter: filter
        };
    }
);
define(
    ['base/logger', 'vendor/underscore'],
    function(logger, _){
        var validArticles = ['–', 'der', 'die', 'das'];

        /**
         *
         * @param {*} words
         * @return {Boolean}
         */
        function validate(words) {
            var result = _.isString(words) || _.isArray(words);

            if (!result) {
                logger.info('Default word is invalid: ' + words);
            }

            if (_.isArray(words)) {
                return _.every(words, function(word){
                    return _.isString(word);
                });
            }

            return result;
        }

        return {
            validate: validate
        };
    }
);
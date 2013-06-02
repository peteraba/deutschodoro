define(
    ['base/logger', 'vendor/underscore'],
    function(logger, _){
        var validArticles = ['–', 'der', 'die', 'das'];

        /**
         *
         * @param {*} word
         * @return {Boolean}
         */
        function validate(word) {
            var result = _.isString(word);

            if (!result) {
                logger.info('Simple word is invalid: ' + word);
            }

            return result;
        }

        return {
            validate: validate
        };
    }
);
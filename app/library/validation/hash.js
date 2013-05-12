define(
    ['base/logger', 'vendor/underscore'],
    function(logger, _){

        /**
         *
         * @param {*} dict
         * @return {Boolean}
         */
        function validate(dict) {
            var hashes = {}, result = true;

            _.each(dict, function(word) {
                if (typeof hashes[word.hash] != 'undefined') {
                    logger.error('Hash key is duplicated: ' + word.hash);
                    result = false;
                }
                hashes[word.hash] = word.hash;
            });

            return result;
        }

        return {
            validate: validate
        };
    }
);
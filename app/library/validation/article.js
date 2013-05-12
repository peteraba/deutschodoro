define(
    ['base/logger'],
    function(logger){
        var validArticles = ['–', 'der', 'die', 'das'];

        /**
         *
         * @param {*} article
         * @return {Boolean}
         */
        function validate(article) {
            var result = validArticles.indexOf(article) > -1;

            if (!result) {
                logger.info('Article is invalid: ' + article);
            }

            return result;
        }

        return {
            validate: validate
        };
    }
);
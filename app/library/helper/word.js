define(
    ['vendor/underscore'],
    function(){
        /**
         * Example 'ausgezeichnet', [['ie', 'ei], 'a', ['e', et']] --> 20
         *
         * @param {String} word
         * @param {Array} charSets
         * @return {Boolean}
         */
        function findLastChars(word, charSets) {
            var result = false;

            word = word.toLowerCase();

            _.every(charSets, function(charSet){
                var foundIndices = [];

                charSet = _.isArray(charSet) ? charSet : [charSet];

                _.each(charSet, function(chars){
                    var index = word.lastIndexOf(chars.toLowerCase());

                    if (index >= 0) {
                        foundIndices.push(index);
                    }
                });

                if (foundIndices.length > 0) {
                    result = _.max(foundIndices);
                    return false;
                }

                return true;
            });

            return result;
        }

        return {
            findLastChars: findLastChars
        };
    }
);
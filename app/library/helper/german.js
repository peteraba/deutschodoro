define(
    ['helper/word'],
    function(wordHelper){
        /**
         *
         * @param {String} word
         * @return {String}
         */
        function umlauter(word) {
            var indexToChange, charToChange, newChar, result, charSet;

            charSet = [['au'], ['a', 'o', 'u']];

            indexToChange = wordHelper.findLastChars(word, charSet);

            charToChange = word.substr(indexToChange, 1);

            switch (charToChange) {
                case 'a':
                    newChar = 'ä';
                    break;
                case 'o':
                    newChar = 'ö';
                    break;
                case 'u':
                    newChar = 'ü';
                    break;
                case 'A':
                    newChar = 'Ä';
                    break;
                case 'O':
                    newChar = 'Ö';
                    break;
                case 'U':
                    newChar = 'Ü';
                    break;
                default:
                    newChar = '';
            }

            result = '';
            if (indexToChange > 0) {
                result = word.substr(0, indexToChange) + newChar + word.substr(indexToChange + 1);
            } else if (indexToChange == 0) {
                result = newChar + word.substr(1);
            }

            return result;
        }

        /**
         *
         * @param {String} base
         * @param {String} modified
         * @return {*}
         */
        function modifyWord(base, modified) {
            if (modified == '' || modified == '–') {
                return false;
            }
            if (modified.substr(0, 1) == '~') {
                return base + modified.substr(1);
            }
            if (modified.substr(0, 1) == '⍨') {
                return umlauter(base) + modified.substr(1);
            }

            return modified;
        }

        return {
            modifyWord: modifyWord
        };
    }
);
define(
    [],
    function(){
        var consonantEnding;

        consonantEnding = [
            'b', 'c', 'd', 'f', 'g',
            'h', 'j', 'k', 'l', 'm',
            'n', 'p', 'q', 'r', 's',
            't', 'v', 'w', 'x', 'y',
            'z'
        ];

        function checkConsonantEnding(word) {
            return consonantEnding.indexOf(word[word.length-1]) > -1;
        }

        function checkConsonantBeginning(word) {
            if (['h'].indexOf(word[0]) > -1) {
                word = word.substr(1);
            }
            return consonantEnding.indexOf(word[0]) > -1;
        }

        return {
            checkConsonantEnding: checkConsonantEnding,
            checkConsonantBeginning: checkConsonantBeginning
        };
    }
);
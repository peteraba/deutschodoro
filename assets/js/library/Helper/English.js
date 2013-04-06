d3.helper.english = (function($, _){
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

    return {
        checkConsonantEnding: checkConsonantEnding
    };
})(jQuery, _);
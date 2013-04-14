define(
    ['game/derDieDas', 'game/pluralize', 'game/wordToEnglish', 'game/wordToGerman'],
    function(derDieDas, pluralize, wordToEnglish, wordToGerman){
        return {
            derDieDas: derDieDas,
            pluralize: pluralize,
            wordToEnglish: wordToEnglish,
            wordToGerman: wordToGerman
        };
    }
);
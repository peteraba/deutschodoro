define(
    ['wordFinder', 'german/noun', 'vendor/underscore'],
    function(wordFinder, germanNoun){
        var pickedWord = null, answer = null, plurals;

        plurals = ['~n', '~e', '~en', '~', '⍨', '⍨e', '~er', '~s'];

        /**
         *
         * @return {Boolean}
         */
        function create() {
            pickedWord = wordFinder.getWord({type:"noun"});

            answer = germanNoun.getPlural(pickedWord.german, pickedWord.plural);

            return true;
        }

        /**
         *
         * @return {String}
         */
        function getHtml() {
            var html = [], html2 = [], words = [pickedWord.plural, pickedWord.plural, pickedWord.plural];

            while (words[1] == pickedWord.plural) {
                words[1] = germanNoun.getPlural(pickedWord.german, plurals[_.random(plurals.length-1)]);
            }
            while (words[2] == pickedWord.plural || words[1] == words[2]) {
                words[2] = germanNoun.getPlural(pickedWord.german, plurals[_.random(plurals.length-1)]);
            }

            words = _.shuffle(words);

            html2.push('<li><label for="' + words[0] + '">' + words[0] + ' ');
            html2.push('<input type="radio" name="word" value="' + words[0] + '" id="' + words[0] + '">');
            html2.push('</label></li>');
            html2.push('<li><label for="' + words[1] + '">' + words[1] + ' ');
            html2.push('<input type="radio" name="word" value="' + words[1] + '" id="' + words[1] + '">');
            html2.push('</label></li>');
            html2.push('<li><label for="' + words[2] + '">' + words[2] + ' ');
            html2.push('<input type="radio" name="word" value="' + words[2] + '" id="' + words[2] + '">');
            html2.push('</label></li>');

            html.push('<h1>Pluralize</h1>');
            html.push('<p>What is the plural of `' + pickedWord.german + '`?</p>');
            html.push('<ul>');
            html.push(html2.join(''));
            html.push('</ul>');

            return html.join('');
        }

        /**
         *
         * @param {String} word
         * @return {Boolean}
         */
        function checkResult(word) {
            return word == answer;
        }

        /**
         *
         * @return {Array}
         */
        function getUsedWords() {
            return [pickedWord];
        }

        return {
            create: create,
            getHtml: getHtml,
            checkResult: checkResult,
            getUsedWords: getUsedWords,
            importance: 100
        };
    }
);
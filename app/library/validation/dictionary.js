define(
    [
        'logger',
        'validation/hash',
        'validation/level',
        'validation/article',
        'validation/defaultWord',
        'validation/simpleWord',
        'helper/md5',
        'vendor/underscore'
    ],
    function(logger, hashValidator, levelValidator, articleValidator, defaultWordValidator, simpleWordValidator, md5, _){

        /**
         *
         * @param {Array} validations
         * @param {Object} word
         * @returns {Boolean}
         */
        function checkWord(validations, word) {
            var result = _.every(validations, _.identity);

            if (!result) {
                logger.info('Failed word: hash=' + word.hash + ', german=' + word.german + ', json=' + JSON.stringify(word) + ', validations=' + JSON.stringify(validations));
            }

            return result;
        }

        /**
         *
         * @param {Object} word
         * @returns {Boolean}
         */
        function validateNoun(word) {
            var validations = [
                articleValidator.validate(word.article),
                simpleWordValidator.validate(word.german) && word.german.length > 0,
                defaultWordValidator.validate(word.genitive),
                defaultWordValidator.validate(word.plural),
                defaultWordValidator.validate(word.category),
                levelValidator.validate(word.level),
                defaultWordValidator.validate(word.english)
            ];

            return checkWord(validations, word);
        }

        /**
         *
         * @param {Object} word
         * @returns {Boolean}
         */
        function validateAdj(word) {
            var validations = [
                defaultWordValidator.validate(word.info),
                simpleWordValidator.validate(word.german) && word.german.length > 0,
                defaultWordValidator.validate(word.comparative),
                defaultWordValidator.validate(word.superlative),
                defaultWordValidator.validate(word.category),
                levelValidator.validate(word.level),
                defaultWordValidator.validate(word.english)
            ];

            return checkWord(validations, word);
        }

        /**
         *
         * @param {Object} word
         * @returns {Boolean}
         */
        function validateVerb(word) {
            var validations = [
                defaultWordValidator.validate(word.info),
                simpleWordValidator.validate(word.prefix),
                simpleWordValidator.validate(word.german) && word.german.length > 0,
                defaultWordValidator.validate(word.present),
                defaultWordValidator.validate(word.past),
                defaultWordValidator.validate(word.category),
                levelValidator.validate(word.level),
                defaultWordValidator.validate(word.english)
            ];

            return checkWord(validations, word);
        }

        /**
         *
         * @param {Object} word
         * @returns {Boolean}
         */
        function validateWord(word) {
            var validations = [
                simpleWordValidator.validate(word.german),
                defaultWordValidator.validate(word.category),
                levelValidator.validate(word.level),
                defaultWordValidator.validate(word.english)
            ];

            return checkWord(validations, word);
        }

        /**
         *
         * @param {Object} dict
         * @returns {Boolean}
         */
        function validateRows(dict) {
             return _.every(dict, function(row){
                 var result = false, type;

                 type = _.isArray(row.type) ? row.type[0] : row.type;

                 switch (type) {
                     case 'noun':
                         result = validateNoun(row);
                         break;
                     case 'verb':
                         result = validateVerb(row);
                         break;
                     case 'adj':
                         result = validateAdj(row);
                         break;
                     case 'adv':
                     case 'art':
                     case 'expr':
                     case 'inte':
                     case 'num':
                     case 'prep':
                     case 'pron':
                         result = validateWord(row);
                         break;
                     default:
                         logger.error('Invalid word type: ' + type);
                 }
                 return result;
             });
        }
        /**
         *
         * @param {Object} dictionary
         * @return {Boolean}
         */
        function validate(dictionary) {
            var dict = dictionary.dict;

            if (typeof dict=='undefined' || !_.isArray(dict)) {
                logger.info('dictionary.dict does not exist');
            }

            return hashValidator.validate(dict) && validateRows(dict);
        }

        /**
         *
         * @param {Array} row
         * @return {Object}
         */
        function convertRow(row) {
            var newRow = {};

            switch (row[5]) {
                case 'noun':
                    newRow = {
                        'article' : row[0],
                        'german' : row[2],
                        'genitive' : row[3],
                        'plural' : row[4],
                        'category' : row[6],
                        'level' : row[7],
                        'english' : row[8]
                    };
                    break;
                case 'adj':
                    newRow = {
                        'info' : row[0],
                        'german' : row[2],
                        'comparative' : row[3],
                        'superlative' : row[4],
                        'category' : row[6],
                        'level' : row[7],
                        'english' : row[8]
                    };
                    break;
                case 'verb':
                    newRow = {
                        'info' : row[0],
                        'prefix' : row[1],
                        'german' : row[2],
                        'present' : row[3],
                        'past' : row[4],
                        'category' : row[6],
                        'level' : row[7],
                        'english' : row[8]
                    };
                    break;
                default:
                    newRow = {
                        'german' : row[2],
                        'category' : row[6],
                        'level' : row[7],
                        'english' : row[8]
                    };
            }
            newRow['type'] = row[5];
            newRow['hash'] = md5.encode(JSON.stringify(row));

            return newRow;
        }

        /**
         *
         * @param {Array} row
         * @return {Array}
         */
        function splitRow(row) {
            var splitRow = [];

            _.each(row.split(';'), function(cell){
                if (cell.indexOf(',') > 0) {
                    splitRow.push(cell.split(','));
                } else {
                    splitRow.push(cell);
                }
            });

            return splitRow;
        }

        /**
         *
         * @param {Array} rows
         * @return {Array}
         */
        function csvFilterRows(rows) {
            var dict = [];

            _.each(rows, function(row){
                var word = convertRow(splitRow(row));

                dict.push(word);
            });

            return dict;
        }

        /**
         *
         * @param {String} dictionary
         * @return {Object}
         */
        function csvFilter(dictionary) {
            var newDictionary = {dict: {}};

            newDictionary.dict = csvFilterRows(dictionary.split("\n"));

            return newDictionary;
        }

        return {
            validate: validate,
            csvFilter: csvFilter
        };
    }
);
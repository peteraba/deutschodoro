define(
    ['helper/english', 'vendor/underscore'],
    function(englishHelper, _){
        var persons, irregularVerbs;

        /**
         * @type {Array}
         */
        persons = ['s1', 's2', 's3', 'p1', 'p2', 'p3'];

        irregularVerbs = {
            be: {
                present: ['am', 'are', 'is', 'are', 'are', 'are'],
                past: ['was', 'were', 'was', 'were', 'were', 'were']
            },
            have: {
                present: 'has',
                past: 'had'
            }
        };

        /**
         *
         * @param {String} verb
         * @param {String} person
         * @return {Object}
         */
        function irregularPresent(verb, person) {
            var result = false, personIndex;

            if (typeof irregularVerbs[verb] != 'undefined' && typeof irregularVerbs[verb].present != 'undefined') {
                result = irregularVerbs[verb].present;

                if (_.isArray(result)) {
                    personIndex = persons.indexOf(person);
                    return {result: result[personIndex], personalize: false};
                }

                if ('s3' == person) {
                    return {result: result, personalize: false};
                }
            }

            return {result: verb, personalize: true};
        }

        /**
         *
         * @param {String} defaultForm present tense, plural, 3rd person
         * @param {String} person to use, one of s1-s3, p1-p3
         * @return {String}
         */
        function personalize(defaultForm, person){
            var shortenedVerb;
            switch (person) {
                case 's3':
                    shortenedVerb = defaultForm.substr(0, defaultForm.length - 1);
                    if (englishHelper.checkConsonantEnding(shortenedVerb)) {
                        if (defaultForm[defaultForm.length-1] == 'y') {
                            return shortenedVerb + 'ies';

                        } else if (defaultForm[defaultForm.length-1] == 'o') {
                            return defaultForm + 'es';

                        }
                    }
                    return defaultForm + 's';

                default:
                    return defaultForm;
            }
        }

        /**
         *
         * @param {String} defaultForm present tense, plural, 3rd person
         * @param {String} person to use, one of s1-s3, p1-p3
         * @return {*}
         */
        function present(defaultForm, person){
            var irregularResult, personIndex;

            personIndex = persons.indexOf(person);

            if (personIndex == -1) {
                throw 'Given person is not allowed';
            }

            irregularResult = irregularPresent(defaultForm, person);

            if (irregularResult.personalize) {
                return personalize(irregularResult.result, person);
            }

            return irregularResult.result;
        }

        return {
            present: present
        };
    }
);
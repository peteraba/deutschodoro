d3.german.verb = (function($, _){
    var verbTypes = {}, persons, prefixes;

    /**
     * @type {Array}
     */
    prefixes = [
        "ab", "an",  "auf", "aus", "bei", "be", "dar", "ein", "ent", "er", "ge", "hin", "nach", "nieder", "über", "um",
        "unter", "ver", "vor", "weg", "wider", "zer", "zusammen", "zu"
    ];

    /**
     * @type {Array}
     */
    persons = ['s1', 's2', 's3', 'p1', 'p2', 'p3'];

    /**
     *
     * @param {String} defaultForm
     * @param {Integer} minLength
     * @return {Boolean}
     */
    function getPrefix(defaultForm, minLength) {
        var result = false;

        minLength = typeof minLength == 'undefined' ? 0 : minLength;

        _.each(prefixes, function(elem){
            if (defaultForm.indexOf(elem)==0 && elem.length >= minLength) {
                result = elem;
            }
        });

        return result;
    }

    /**
     *
     * @param {String} defaultForm
     * @return {String}
     */
    function getEnding(defaultForm) {
        return defaultForm.substr(defaultForm.length - 2);
    }

    /**
     *
     * @param {String} defaultForm
     * @return {String}
     */
    function getBase(defaultForm) {
        var ending = getEnding(defaultForm);

        if ('en' == ending) {
            return defaultForm.substr(0, defaultForm.length - 2);
        } else if ('ln' == ending || 'rn' == ending) {
            return defaultForm.substr(0, defaultForm.length - 1);
        }

        throw new Exception('Unable to define base for: `' + defaultForm + '`');
    }

    /**
     *
     * @param {String} defaultForm
     * @param {String} person
     * @return {String}
     */
    verbTypes.default = function(defaultForm, person) {
        var base = getBase(defaultForm);

        switch (person) {
            case 's1':
                return base + 'e';
            case 's2':
                return base + 'st';
            case 's3':
            case 'p2':
                return base + 't';
            case 'p1':
            case 'p3':
            default:
                return defaultForm;
        }
    };

    /**
     *
     * @param {String} defaultForm
     * @param {String} person
     * @return {String}
     */
    verbTypes.presentS3 = function(defaultForm, person) {
        var base, prefix, word, charSets = [['i']];

        switch (person) {
            case 's2':
            case 's3':
                prefix = getPrefix(defaultForm, 3);
                if (false !== prefix) {
                    word = defaultForm.substr(prefix.length);
                } else {
                    word = defaultForm;
                }
                base = getBase(word);

                if (base.indexOf('e') > -1) {
                    if (!d3.helper.word.findLastChars(base, charSets)) {
                        word = word.replace(/e/, 'i');
                    }
                }
                defaultForm = prefix ? (prefix + word) : word;
        }

        return verbTypes.default(defaultForm, person);
    };

    /**
     *
     * @param {String} defaultForm
     * @param {String} person
     * @param {*} present
     * @return {String}
     */
    verbTypes.presentS4 = function(defaultForm, person, present) {
        var base, prefix, word, charSets = [['i']], search, replace;

        switch (person) {
            case 's2':
            case 's3':
                prefix = getPrefix(defaultForm, 3);
                if (false !== prefix) {
                    word = defaultForm.substr(prefix.length);
                } else {
                    word = defaultForm;
                }
                base = getBase(word);

                if (present && present.indexOf('->') > 0) {
                    present = present.split('->');
                    search = present[0];
                    replace = present[1];
                    charSets = false;
                } else if (base.indexOf('ä') > -1) {
                    search = 'ä';
                    replace = 'ie';
                } else if (base.indexOf('e') > -1) {
                    search = 'e';
                    replace = 'i';
                }

                if (search) {
                    if (!charSets || !d3.helper.word.findLastChars(base, charSets)) {
                        word = word.replace(search, replace);
                    }
                }

                defaultForm = prefix ? (prefix + word) : word;
        }

        return verbTypes.default(defaultForm, person);
    };

    /**
     *
     * @param {String} defaultForm
     * @param {String} person
     * @param {*} present
     * @return {String}
     */
    verbTypes.presentS5 = function(defaultForm, person, present) {
        var base, prefix, word, charSets = [['i']], search, replace;

        switch (person) {
            case 's2':
            case 's3':
                prefix = getPrefix(defaultForm, 3);
                if (false !== prefix) {
                    word = defaultForm.substr(prefix.length);
                } else {
                    word = defaultForm;
                }
                base = getBase(word);

                if (present && present.indexOf('->') > 0) {
                    present = present.split('->');
                    search = present[0];
                    replace = present[1];
                    charSets = false;
                } else if (base.indexOf('ä') > -1) {
                    search = 'ä';
                    replace = 'ie';
                } else if (base.indexOf('ie') > -1) {
                } else if (base.indexOf('e') > -1) {
                    search = 'e';
                    replace = 'i';
                }

                if (search) {
                    if (!charSets || !d3.helper.word.findLastChars(base, charSets)) {
                        word = word.replace(search, replace);

                        person = 's2';
                        defaultForm = prefix ? (prefix + word) : word;

                        return verbTypes.default(defaultForm, person).replace(/sst/, 'st');
                    }
                }

                defaultForm = prefix ? (prefix + word) : word;
        }

        return verbTypes.default(defaultForm, person);
    };

    /**
     *
     * @param {String} defaultForm
     * @param {String} person
     * @param {*} present
     * @return {String}
     */
    verbTypes.presentS7 = function(defaultForm, person, present) {
        var base, prefix, word, charSets = [['i']], search, replace, result;

        switch (person) {
            case 's2':
            case 's3':
                prefix = getPrefix(defaultForm, 2);
                if (false !== prefix) {
                    word = defaultForm.substr(prefix.length);
                } else {
                    word = defaultForm;
                }
                base = getBase(word);

                if (present && present.indexOf('->') > 0) {
                    present = present.split('->');
                    search = present[0];
                    replace = present[1];
                    charSets = false;
                } else if (base.indexOf('au') > -1) {
                    search = 'au';
                    replace = 'äu';
                } else if (base.indexOf('a') > -1) {
                    search = 'a';
                    replace = 'ä';
                } else if (base.indexOf('e') > -1) {
                    search = 'e';
                    replace = 'i';
                }

                if (search) {
                    if (!charSets || !d3.helper.word.findLastChars(base, charSets)) {
                        word = word.replace(search, replace);

                        defaultForm = prefix ? (prefix + word) : word;

                        result = verbTypes.default(defaultForm, person);

                        if (result.lastIndexOf('tet') == result.length - 3) {
                            result = result.substr(0, result.lastIndexOf('tet')) + 't';
                        }
                        if (result.lastIndexOf('tt') == result.length - 2) {
                            result = result.substr(0, result.lastIndexOf('tt')) + 't';
                        }

                        return result;
                    }
                }

                defaultForm = prefix ? (prefix + word) : word;
            case 'p2':
                result = verbTypes.default(defaultForm, person);

                if (result.lastIndexOf('tt') == result.length - 2) {
                    result = result.substr(0, result.lastIndexOf('tt')) + 'tet';
                }

                return result;
        }

        return verbTypes.default(defaultForm, person);
    };

    /**
     *
     * @param {String} defaultForm present tense, plural, 3rd person
     * @param {String} person to use, one of s1-s3, p1-p3
     * @param {String} type one of w (weak), s1-s7 (strong), irr (irregular)
     * @param {*} present array with present variations or modifiers
     * @return {*}
     */
    function present(defaultForm, person, type, present){
        var personIndex = persons.indexOf(person);

        if (personIndex == -1) {
            throw 'Given person is not allowed';
        }

        if (_.isArray(present)) {
            if (present[personIndex] && present[personIndex].indexOf('->') == -1) {
                return present[personIndex];
            }
        }

        switch (type) {
            case 'w':
            case 's1':
                return verbTypes.default(defaultForm, person);
            case 's3':
                return verbTypes.presentS3(defaultForm, person);
                break;
            case 's4':
                return verbTypes.presentS4(defaultForm, person, present);
                break;
            case 's5':
                return verbTypes.presentS5(defaultForm, person, present);
                break;
            case 's7':
                return verbTypes.presentS7(defaultForm, person, present);
                break;
            case 'irr':
                throw 'No list is provided for irregular verb: `' + defaultForm + '`';
            case 's2':
            case 's6':
            default:
                throw 'Unable to find present tense for: `' + defaultForm + '`, type: `' + type + '`';
        }
    }

    return {
        present: present
    };
})(jQuery, _);
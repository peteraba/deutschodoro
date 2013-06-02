define(
    ['vendor/underscore'],
    function(_){
        var adjectiveModifiers
            , superIrregularAdjectives

            , MASCULINE  = 'masculine'
            , FEMININE   = 'feminine'
            , NEUTRAL    = 'neutral'
            , PLURAL     = 'plural'

            , NOMINATIVE = 'nominative'
            , ACCUSATIVE = 'accusative'
            , DATIVE     = 'dative'
            , GENITIVE   = 'genitive'

            , PREDICATE  = 'predicate'
            , EIN_WORD   = 'ein-word'
            , DER_WORD   = 'der-word'
            , OHNE_WORD  = 'ohne-word'

            , NORMAL_FORM = 0
            , COMPARATIVE = 1
            , SUPERLATIVE = 2;

        superIrregularAdjectives = [
            'beige', 'happy', 'lila', 'prima', 'rosa',
            'super'
        ];

        adjectiveModifiers = {
        };

        function getComperativeAdjective(word, form) {
            if (form == NORMAL_FORM) {
                return word.german;
            }

            if (form == COMPARATIVE) {
                if (word.comparative) {
                    return word.comparative;
                }

                return word.german + 'er';
            }

            if (word.superlative) {
                return word.superlative;
            }

            return word.german + 'est';
        }

        function getEinWordNominative(word, gender) {
            switch (gender) {
                case MASCULINE:
                    return word + 'er';
                    break;
                case FEMININE:
                    return word + 'e';
                    break;
                case NEUTRAL:
                    return word + 'es';
                    break;
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getEinWordAccusative(word, gender) {
            switch (gender) {
                case MASCULINE:
                    return word + 'en';
                    break;
                case FEMININE:
                    return word + 'e';
                    break;
                case NEUTRAL:
                    return word + 'es';
                    break;
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getEinWordDative(word, gender) {
            switch (gender) {
                case MASCULINE:
                case FEMININE:
                case NEUTRAL:
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getEinWordGenitive(word, gender) {
            switch (gender) {
                case MASCULINE:
                case FEMININE:
                case NEUTRAL:
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getEinWordAdjective(word, adjectiveCase, gender, form) {
            var comparativeWord = getComperativeAdjective(word, form);

            switch (adjectiveCase) {
                case NOMINATIVE:
                    return getEinWordNominative(comparativeWord, gender);
                    break;
                case ACCUSATIVE:
                    return getEinWordAccusative(comparativeWord, gender);
                    break;
                case DATIVE:
                    return getEinWordDative(comparativeWord, gender);
                    break;
                case GENITIVE:
                    return getEinWordGenitive(comparativeWord, gender);
                    break;
                default:
                    throw new Error('Invalid adjective case for adjective: ' + adjectiveCase);
            }
        }

        function getDerWordNominative(word, gender) {
            switch (gender) {
                case MASCULINE:
                    return word + 'e';
                    break;
                case FEMININE:
                    return word + 'e';
                    break;
                case NEUTRAL:
                    return word + 'e';
                    break;
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getDerWordAccusative(word, gender) {
            switch (gender) {
                case MASCULINE:
                    return word + 'en';
                    break;
                case FEMININE:
                    return word + 'e';
                    break;
                case NEUTRAL:
                    return word + 'e';
                    break;
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getDerWordDative(word, gender) {
            switch (gender) {
                case MASCULINE:
                case FEMININE:
                case NEUTRAL:
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getDerWordGenitive(word, gender) {
            switch (gender) {
                case MASCULINE:
                case FEMININE:
                case NEUTRAL:
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getDerWordAdjective(word, adjectiveCase, gender, form) {
            var comparativeWord = getComperativeAdjective(word, form);

            switch (adjectiveCase) {
                case NOMINATIVE:
                    return getDerWordNominative(comparativeWord, gender);
                    break;
                case ACCUSATIVE:
                    return getDerWordAccusative(comparativeWord, gender);
                    break;
                case DATIVE:
                    return getDerWordDative(comparativeWord, gender);
                    break;
                case GENITIVE:
                    return getDerWordGenitive(comparativeWord, gender);
                    break;
                default:
                    throw new Error('Invalid adjective case for adjectiveCase: ' + adjectiveCase);
            }
        }

        function getOhneWordNominative(word, gender) {
            switch (gender) {
                case MASCULINE:
                    return word + 'er';
                    break;
                case FEMININE:
                    return word + 'e';
                    break;
                case NEUTRAL:
                    return word + 'es';
                    break;
                case PLURAL:
                    return word + 'e';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getOhneWordAccusative(word, gender) {
            switch (gender) {
                case MASCULINE:
                    return word + 'en';
                    break;
                case FEMININE:
                    return word + 'e';
                    break;
                case NEUTRAL:
                    return word + 'es';
                    break;
                case PLURAL:
                    return word + 'e';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getOhneWordDative(word, gender) {
            switch (gender) {
                case MASCULINE:
                    return word + 'em';
                    break;
                case FEMININE:
                    return word + 'er';
                    break;
                case NEUTRAL:
                    return word + 'em';
                    break;
                case PLURAL:
                    return word + 'en';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getOhneWordGenitive(word, gender) {
            switch (gender) {
                case MASCULINE:
                    return word + 'en';
                    break;
                case FEMININE:
                    return word + 'er';
                    break;
                case NEUTRAL:
                    return word + 'en';
                    break;
                case PLURAL:
                    return word + 'er';
                    break;
                default:
                    throw new Error('Invalid adjective case for gender: ' + gender);
            }
        }

        function getOhneWordAdjective(word, adjectiveCase, gender, form) {
            var comparativeWord = getComperativeAdjective(word, form);

            switch (adjectiveCase) {
                case NOMINATIVE:
                    return getOhneWordNominative(comparativeWord, gender);
                    break;
                case ACCUSATIVE:
                    return getOhneWordAccusative(comparativeWord, gender);
                    break;
                case DATIVE:
                    return getOhneWordDative(comparativeWord, gender);
                    break;
                case GENITIVE:
                    return getOhneWordGenitive(comparativeWord, gender);
                    break;
                default:
                    throw new Error('Invalid adjective case for adjective: ' + adjectiveCase);
            }
        }

        function getAdjective(word, adjectiveCase, gender, position, form) {
            form = isNaN(parseInt(form)) ? 0 : Math.max(0, Math.min(2, parseInt(form)));

            if (superIrregularAdjectives.indexOf(word.german) > -1) {
                return word.german;
            }

            switch (position) {
                case PREDICATE:
                    return getComperativeAdjective(word, form);
                    break;
                case EIN_WORD:
                    return getEinWordAdjective(word, adjectiveCase, gender, form);
                    break;
                case DER_WORD:
                    return getDerWordAdjective(word, adjectiveCase, gender, form);
                    break;
                case OHNE_WORD:
                    return getOhneWordAdjective(word, adjectiveCase, gender, form);
                    break;
                default:
                    throw new Error('Invalid position for adjective: ' + position);
            }
        }

        return {
            getAdjective: getAdjective,

            NOMINATIVE:  NOMINATIVE,
            ACCUSATIVE:  ACCUSATIVE,
            DATIVE:      DATIVE,
            GENITIVE:    GENITIVE,

            EIN_WORD:    EIN_WORD,  // Mixed
            DER_WORD:    DER_WORD,  // Weak
            OHNE_WORD:   OHNE_WORD, // Strong
            PREDICATE:   PREDICATE,

            NORMAL_FORM: NORMAL_FORM,
            COMPARATIVE: COMPARATIVE,
            SUPERLATIVE: SUPERLATIVE,

            MASCULINE:   MASCULINE,
            FEMININE:    FEMININE,
            NEUTRAL:     NEUTRAL,
            PLURAL:      PLURAL
        };
    }
);
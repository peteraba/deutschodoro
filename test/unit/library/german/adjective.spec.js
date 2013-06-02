define(
    ['vendor/underscore'],
    function (_) {
        var adjectives, stubs, context, loaded = false;

        adjectives = [
            {german:"beige"},
            {german:"giereg"}
        ];

        stubs = {
        };

        context = requireHelper.createContext(stubs, _);

        context(['german/adjective'], function (germanAdjective) {

            function getFormName(form) {
                if (form == germanAdjective.NORMAL_FORM) {
                    return 'normal form';
                } else if (form == germanAdjective.COMPARATIVE) {
                    return 'comparative form';
                }
                return 'superlative form';
            }

            function getDescription(word, gender, form, expectedResult) {
                return word.german + ' (' + gender + ', ' + getFormName(form) + ') --> ' + expectedResult;
            }

            describe('german/adjective', function() {
                var adjectiveCases, genders, adjectivePositions;

                adjectiveCases = [
                    germanAdjective.NOMINATIVE,
                    germanAdjective.ACCUSATIVE,
                    germanAdjective.DATIVE,
                    germanAdjective.GENITIVE
                ];

                genders = [
                    germanAdjective.MASCULINE,
                    germanAdjective.FEMININE,
                    germanAdjective.NEUTRAL,
                    germanAdjective.PLURAL
                ];

                adjectivePositions = [
                    germanAdjective.PREDICATE,
                    germanAdjective.EIN_WORD,
                    germanAdjective.DER_WORD,
                    germanAdjective.OHNE_WORD
                ];

                describe('#getAdjective() - irregular', function() {
                    it('should return irregular adjectives as unchanged', function(){
                        var word = {german:"beige"}, result, i, j, k;

                        for (i = 0; i < adjectiveCases.length; i++) {
                            for (j = 0; j < genders.length; j++) {
                                for (k = 0; k < adjectivePositions.length; k++) {
                                    result = germanAdjective.getAdjective(
                                        word,
                                        adjectiveCases[i],
                                        genders[j],
                                        adjectivePositions[k],
                                        germanAdjective.NORMAL_FORM
                                    );
                                    expect(result).to.equal(word.german);
                                }
                            }
                        }
                    });
                    
                    it('should return irregular adjectives as unchanged in comparative form', function(){
                        var word = {german:"beige"}, result, i, j, k;

                        for (i = 0; i < adjectiveCases.length; i++) {
                            for (j = 0; j < genders.length; j++) {
                                for (k = 0; k < adjectivePositions.length; k++) {
                                    result = germanAdjective.getAdjective(
                                        word,
                                        adjectiveCases[i],
                                        genders[j],
                                        adjectivePositions[k],
                                        germanAdjective.COMPARATIVE
                                    );
                                    expect(result).to.equal(word.german);
                                }
                            }
                        }
                    });
                    
                    it('should return irregular adjectives as unchanged in superlative form', function(){
                        var word = {german:"beige"}, result, i, j, k;

                        for (i = 0; i < adjectiveCases.length; i++) {
                            for (j = 0; j < genders.length; j++) {
                                for (k = 0; k < adjectivePositions.length; k++) {
                                    result = germanAdjective.getAdjective(
                                        word,
                                        adjectiveCases[i],
                                        genders[j],
                                        adjectivePositions[k],
                                        germanAdjective.SUPERLATIVE
                                    );
                                    expect(result).to.equal(word.german);
                                }
                            }
                        }
                    });
                });

                describe('#getAdjective() - predicate', function() {
                    it('should return regular adjectives unchanged in normal form', function(){
                        var word = {german:"giereg"}, result, i, j;

                        for (i = 0; i < adjectiveCases.length; i++) {
                            for (j = 0; j < genders.length; j++) {
                                result = germanAdjective.getAdjective(
                                    word,
                                    adjectiveCases[i],
                                    genders[j],
                                    germanAdjective.PREDICATE,
                                    germanAdjective.NORMAL_FORM
                                );
                                expect(result).to.equal(word.german);
                            }
                        }
                    });

                    it('should return regular adjectives with -er ending in comparative form', function(){
                        var dataProvider;

                        dataProvider = [
                            [{german:"giereg"}, 'giereger'],
                            [{german:"faul"}, 'fauler'],
                            [{german:"fleißig"}, 'fleißiger'],
                            [{german:"klein"}, 'kleiner'],
                            [{german:"traurig"}, 'trauriger']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0], expectedResult = value[1], result, i, j;

                            for (i = 0; i < adjectiveCases.length; i++) {
                                for (j = 0; j < genders.length; j++) {
                                    result = germanAdjective.getAdjective(
                                        word,
                                        adjectiveCases[i],
                                        genders[j],
                                        germanAdjective.PREDICATE,
                                        germanAdjective.COMPARATIVE
                                    );
                                    expect(result).to.equal(expectedResult);
                                }
                            }
                        });
                    });

                    it('should return regular adjectives with -est ending in superlative form', function(){
                        var dataProvider;

                        dataProvider = [
                            [{german:"giereg"}, 'gieregest'],
                            [{german:"faul"}, 'faulest'],
                            [{german:"fleißig"}, 'fleißigest'],
                            [{german:"klein"}, 'kleinest'],
                            [{german:"traurig"}, 'traurigest']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0], expectedResult = value[1], result, i, j;

                            for (i = 0; i < adjectiveCases.length; i++) {
                                for (j = 0; j < genders.length; j++) {
                                    result = germanAdjective.getAdjective(
                                        word,
                                        adjectiveCases[i],
                                        genders[j],
                                        germanAdjective.PREDICATE,
                                        germanAdjective.SUPERLATIVE
                                    );
                                    expect(result).to.equal(expectedResult);
                                }
                            }
                        });
                    });

                    it('should return irregular adjectives in comparative form', function(){
                        var dataProvider;

                        dataProvider = [
                            [{german:"schwach", comparative:"schwächer"}, 'schwächer'],
                            [{german:"alt", comparative:"älter"}, 'älter'],
                            [{german:"gut", comparative:"besser"}, 'besser']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0], expectedResult = value[1], result, i, j;

                            for (i = 0; i < adjectiveCases.length; i++) {
                                for (j = 0; j < genders.length; j++) {
                                    result = germanAdjective.getAdjective(
                                        word,
                                        adjectiveCases[i],
                                        genders[j],
                                        germanAdjective.PREDICATE,
                                        germanAdjective.COMPARATIVE
                                    );
                                    expect(result).to.equal(expectedResult);
                                }
                            }
                        });
                    });

                    it('should return irregular adjectives in superlative form', function(){
                        var dataProvider;

                        dataProvider = [
                            [{german:"schwach", superlative:"schwächste"}, 'schwächste'],
                            [{german:"alt", superlative:"älteste"}, 'älteste'],
                            [{german:"gut", superlative:"beste"}, 'beste']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0], expectedResult = value[1], result, i, j;

                            for (i = 0; i < adjectiveCases.length; i++) {
                                for (j = 0; j < genders.length; j++) {
                                    result = germanAdjective.getAdjective(
                                        word,
                                        adjectiveCases[i],
                                        genders[j],
                                        germanAdjective.PREDICATE,
                                        germanAdjective.SUPERLATIVE
                                    );
                                    expect(result).to.equal(expectedResult);
                                }
                            }
                        });
                    });
                });



                describe('#getAdjective() - ein word', function() {
                    describe('nominative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamter'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamtes'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamterer'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteres'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtester'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtestes'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alter'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'altes'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älterer'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteres'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältester'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältestes'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.NOMINATIVE,
                                gender,
                                germanAdjective.EIN_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });

                    describe('accusative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamtes'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteres'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtestes'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'altes'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteres'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältestes'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.ACCUSATIVE,
                                gender,
                                germanAdjective.EIN_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });


                    describe('dative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.DATIVE,
                                gender,
                                germanAdjective.EIN_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });

                    describe('genitive case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.GENITIVE,
                                gender,
                                germanAdjective.EIN_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });
                });



                describe('#getAdjective() - der word', function() {
                    describe('nominative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.NOMINATIVE,
                                gender,
                                germanAdjective.DER_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });

                    describe('accusative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.ACCUSATIVE,
                                gender,
                                germanAdjective.DER_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });


                    describe('dative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.DATIVE,
                                gender,
                                germanAdjective.DER_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });

                    describe('genitive case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.GENITIVE,
                                gender,
                                germanAdjective.DER_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });
                });



                describe('#getAdjective() - ohne word', function() {
                    describe('nominative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamter'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamtes'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamterer'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteres'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtester'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtestes'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamteste'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alter'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'altes'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älterer'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteres'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältester'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältestes'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'älteste']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.NOMINATIVE,
                                gender,
                                germanAdjective.OHNE_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });

                    describe('accusative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamtes'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamte'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteres'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamtere'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamteste'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtestes'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamteste'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'altes'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alte'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteres'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'ältere'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'älteste'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältestes'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'älteste']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.ACCUSATIVE,
                                gender,
                                germanAdjective.OHNE_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });


                    describe('dative case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamtem'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamter'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamtem'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamterem'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamterer'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamterem'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtestem'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamtester'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtestem'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'altem'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alter'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'altem'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älterem'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'älterer'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älterem'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältestem'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'ältester'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältestem'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältesten']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.DATIVE,
                                gender,
                                germanAdjective.OHNE_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });

                    describe('genitive case', function(){
                        var dataProvider, words;

                        words = {
                            gesamt: {german:"gesamt"},
                            alt: {german:"alt", comparative:"älter", superlative:"ältest"}
                        };

                        dataProvider = [
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'gesamter'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'gesamten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'gesamter'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'gesamterer'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'gesamteren'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'gesamterer'],
                            [words.gesamt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'gesamtester'],
                            [words.gesamt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'gesamtesten'],
                            [words.gesamt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'gesamtester'],

                            [words.alt, germanAdjective.MASCULINE, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.NORMAL_FORM, 'alter'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.NORMAL_FORM, 'alten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.NORMAL_FORM, 'alter'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.COMPARATIVE, 'älterer'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.COMPARATIVE, 'älteren'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.COMPARATIVE, 'älterer'],
                            [words.alt, germanAdjective.MASCULINE, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.FEMININE, germanAdjective.SUPERLATIVE, 'ältester'],
                            [words.alt, germanAdjective.NEUTRAL, germanAdjective.SUPERLATIVE, 'ältesten'],
                            [words.alt, germanAdjective.PLURAL, germanAdjective.SUPERLATIVE, 'ältester']
                        ];

                        _.each(dataProvider, function(value){
                            var word = value[0],
                                gender = value[1],
                                form = value[2],
                                expectedResult = value[3],
                                result,
                                i;

                            result = germanAdjective.getAdjective(
                                word,
                                germanAdjective.GENITIVE,
                                gender,
                                germanAdjective.OHNE_WORD,
                                form
                            );
                            it(getDescription(word, gender, form, expectedResult), function(){
                                expect(result).to.equal(expectedResult);
                            });
                        });
                    });
                });




            });

            loaded = true;
        });

        return {
            isLoaded: function(){return loaded;}
        }
    }
);

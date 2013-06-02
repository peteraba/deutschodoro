define(
    ['helper/english'],
    function(englishHelper){
        /**
         * From:
         * http://www.english-zone.com/spelling/plurals.html
         * http://wiki.answers.com/Q/What_are_words_that_have_an_f_that_does_not_change_to_a_v_when_pluralized
         * http://en.wikipedia.org/wiki/English_plurals
         * http://www.esldesk.com/vocabulary/irregular-nouns
         *
         * @type {Object} irregularNouns
         */
        var irregularNouns = {
            // us -> i
            alumnus: 'deer',
            cactus: 'cacti',
            focus: 'focuses',
            fungus: 'fungi',
            nucleus: 'nuclei',
            radius: 'radii',
            stimulus: 'stimuli',
            // is -> es
            axis: 'axes',
            analysis: 'analyses',
            basis: 'bases',
            crisis: 'crises',
            diagnosis: 'diagnoses',
            ellipsis: 'ellipses',
            hypothesis: 'hypotheses',
            oasis: 'oases',
            paralysis: 'paralyses',
            parenthesis: 'parentheses',
            synthesis: 'syntheses',
            synopsis: 'synopses',
            thesis: 'theses',
            // ix -> ices
            appendix: 'appendices',
            index: 'indeces',
            matrix: 'matrices',
            // eau -> eaux
            beau: 'beaux',
            bureau: 'bureaux',
            tableau: 'tableaux',
            // *** -> en
            child: 'children',
            man: 'men',
            ox: 'oxen',
            woman: 'women',
            // *** -> a
            bacterium: 'bacteria',
            corpus: 'corpora',
            criterion: 'criteria',
            curriculum: 'curricula',
            datum: 'data',
            genus: 'genera',
            medium: 'media',
            memorandum: 'memoranda',
            phenomenon: 'phenomena',
            stratum: 'strata',
            // no changes
            deer: 'deer',
            means: 'means',
            series: 'series',
            sheep: 'sheep',
            species: 'species',
            // oo -> ee
            foot: 'feet',
            goose: 'geese',
            tooth: 'teeth',
            // oo -> ee
            nebula: 'nebulae',
            vertebra: 'vertebrae',
            vita: 'vitae',
            // o -> os
            canto: 'cantos',
            hetero: 'heteros',
            photo: 'photos',
            zero: 'zeros',
            piano: 'pianos',
            portico: 'porticos',
            pro: 'pros',
            quarto: 'quartos',
            kimono: 'kimonos',
            // f/fe -> ves
            calf: 'calves',
            elf: 'elves',
            half: 'halves',
            knife: 'knives',
            leaf: 'leaves',
            life: 'lives',
            loaf: 'loaves',
            self: 'selves',
            sheaf: 'sheaves',
            shelf: 'shelves',
            thief: 'thieves',
            wife: 'wives',
            wolf: 'wolves',
            // random irregular words
            person: 'people'
        };

        var man = {
            bar: 'bar',
            boiler: 'boiler',
            brick: 'brick',
            business: 'business',
            camera: 'camera',
            crafts: 'crafts',
            crossbow: 'crossbow',
            delivery: 'delivery',
            dust: 'dust',
            fire: 'fire',
            fisher: 'fisher',
            hit: 'hit',
            length: 'length',
            loco: 'loco',
            mail: 'mail',
            marks: 'marks',
            ombuds: 'ombuds',
            police: 'police',
            post: 'post',
            sales: 'sales',
            store: 'store',
            stunt: 'stunt',
            tin: 'tin',
            trash: 'trash',
            warehouse: 'warehouse',
            watch: 'watch'
        };

        /**
         *
         * @param singular
         * @return {*}
         */
        function irregularPlural(singular) {
            if (typeof irregularNouns[singular] != 'undefined') {
                return irregularNouns[singular];
            }

            return false;
        }

        /**
         *
         * @param occupation
         * @param ending
         * @return {*}
         */
        function occupationPlural(occupation, ending) {
            if (typeof man[occupation] != 'undefined') {
                return occupation + ending;
            }

            return false;
        }

        /**
         *
         * @param singular
         * @return {*}
         */
        function complexPlural(singular) {
            var womanPos, manPos;

            womanPos = singular.indexOf('woman');
            manPos = singular.indexOf('man');

            if (womanPos == singular.length-5 && womanPos > 0) {
                return occupationPlural(singular.substr(0, singular.length-5), 'women');
            } else if (manPos == singular.length-3 && manPos > 0) {
                return occupationPlural(singular.substr(0, singular.length-3), 'men');
            }

            return false;
        }
    
        /**
         *
         * @param {String} singular
         * @return {String}
         */
        function regularPlural(singular) {
            var shortenedNoun, lastChar, prevLastChar;

            shortenedNoun = singular.substr(0, singular.length - 1);
            lastChar = singular[singular.length - 1];
            prevLastChar = singular[singular.length - 2];

            if (lastChar == 'y' && englishHelper.checkConsonantEnding(shortenedNoun)) {
                return shortenedNoun + 'ies';

            } else if (lastChar == 'z') {
                return singular + 'zes';

            } else if (['o', 's'].indexOf(lastChar) > -1) {
                return singular + 'es';

            } else if (lastChar == 'h') {
                if (['c', 's'].indexOf(prevLastChar) > -1) {
                    return singular + 'es';

                }
            }
    
            return singular + 's';
        }

        function separateWordParts(singular) {
            var wordParts = [singular, ''];

            if (singular.indexOf('(') > -1) {
                wordParts[0] = singular.substr(0, singular.indexOf('(') - 1);
                wordParts[1] = singular.substr(singular.indexOf('(') - 1);
            }

            return wordParts;
        }
    
        /**
         *
         * @param {String} singular
         * @return {String}
         */
        function getPlural(singular) {
            var irregular, wordParts, complex;

            wordParts = separateWordParts(singular);

            irregular = irregularPlural(wordParts[0]);
            if (irregular) {
                return irregular + wordParts[1];
            }

            complex = complexPlural(wordParts[0]);
            if (complex) {
                return complex + wordParts[1];
            }

            return regularPlural(wordParts[0]) + wordParts[1];
        }
    
        /**
         *
         * @param {String} indefiniteWord
         * @param {String} nounCase
         * @return {String}
         */
        function getIndefiniteArticle(indefiniteWord, nounCase) {
            if (nounCase == 'dat') {
                switch (indefiniteWord) {
                    case 'my':
                        return 'mine';
                    case 'your':
                        return 'yours';
                    case 'his':
                        return 'his';
                    case 'her':
                        return 'hers';
                    case 'our':
                        return 'ours';
                    case 'their':
                        return 'theirs';
                }
            }
            return indefiniteWord;
        }
    
        /**
         *
         * @param {String} noun
         * @param {String|Boolean} indefiniteWord
         * @param {String} nounCase one of nom, acc, dat, gen
         * @return {String}
         */
        function getArticle(noun, indefiniteWord, nounCase) {
            if (indefiniteWord) {
                if (true === indefiniteWord) {
                    if (englishHelper.checkConsonantBeginning(noun)) {
                        return 'a';
                    }
                    return 'an';
                }
                return getIndefiniteArticle(indefiniteWord, nounCase);
            }
    
            return 'the';
        }
    
        return {
            getPlural: getPlural,
            getArticle: getArticle
        };
    }
);
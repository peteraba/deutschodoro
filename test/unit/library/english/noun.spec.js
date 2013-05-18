define(
    ['helper/english', 'vendor/underscore'],
    function(englishHelper, _) {
        var stubs, context, loaded = false;

        stubs = {
            'helper/english' : englishHelper
        };

        context = requireHelper.createContext(stubs, _);

        context(['english/noun'], function (englishNoun) {
            describe('english/noun', function() {
                describe('#getPlural()', function() {
                    it('should pluralize regular verbs', function(){
                        expect(englishNoun.getPlural('kiss')).to.equal('kisses');
                        expect(englishNoun.getPlural('phase')).to.equal('phases');
                        expect(englishNoun.getPlural('dish')).to.equal('dishes');
                        expect(englishNoun.getPlural('massage')).to.equal('massages');
                        expect(englishNoun.getPlural('witch')).to.equal('witches');
                        expect(englishNoun.getPlural('judge')).to.equal('judges');
                        expect(englishNoun.getPlural('table')).to.equal('tables');

                        expect(englishNoun.getPlural('lap')).to.equal('laps');
                        expect(englishNoun.getPlural('cat')).to.equal('cats');
                        expect(englishNoun.getPlural('clock')).to.equal('clocks');
                        expect(englishNoun.getPlural('cuff')).to.equal('cuffs');
                        expect(englishNoun.getPlural('death')).to.equal('deaths');

                        expect(englishNoun.getPlural('boy')).to.equal('boys');
                        expect(englishNoun.getPlural('girl')).to.equal('girls');
                        expect(englishNoun.getPlural('chair')).to.equal('chairs');

                        expect(englishNoun.getPlural('hero')).to.equal('heroes');
                        expect(englishNoun.getPlural('potato')).to.equal('potatoes');
                        expect(englishNoun.getPlural('volcano')).to.equal('volcanoes');
                        expect(englishNoun.getPlural('mango')).to.equal('mangoes');

                        expect(englishNoun.getPlural('cherry')).to.equal('cherries');
                        expect(englishNoun.getPlural('lady')).to.equal('ladies');

                        expect(englishNoun.getPlural('day')).to.equal('days');
                        expect(englishNoun.getPlural('monkey')).to.equal('monkeys');

                    });
                    it('should return irregular nouns', function(){
                        expect(englishNoun.getPlural('person')).to.equal('people');

                        expect(englishNoun.getPlural('canto')).to.equal('cantos');
                        expect(englishNoun.getPlural('hetero')).to.equal('heteros');
                        expect(englishNoun.getPlural('photo')).to.equal('photos');
                        expect(englishNoun.getPlural('zero')).to.equal('zeros');
                        expect(englishNoun.getPlural('piano')).to.equal('pianos');
                        expect(englishNoun.getPlural('portico')).to.equal('porticos');
                        expect(englishNoun.getPlural('pro')).to.equal('pros');
                        expect(englishNoun.getPlural('quarto')).to.equal('quartos');
                        expect(englishNoun.getPlural('kimono')).to.equal('kimonos');
                    });
                    it('should leave explanations unchanged', function(){
                        expect(englishNoun.getPlural('crew (for ship)')).to.equal('crews (for ship)');
                        expect(englishNoun.getPlural('general (rank)')).to.equal('generals (rank)');
                        expect(englishNoun.getPlural('queen (chess)')).to.equal('queens (chess)');
                    });
                });

                describe('#getArticle()', function() {
                    it('should return article', function(){
                        expect(englishNoun.getArticle('table', false, 'nom')).to.equal('the');
                        expect(englishNoun.getArticle('table', true, 'nom')).to.equal('a');
                        expect(englishNoun.getArticle('apple', true, 'nom')).to.equal('an');
                        expect(englishNoun.getArticle('apple', true, 'nom')).to.equal('an');

                        expect(englishNoun.getArticle('apple', 'my', 'nom')).to.equal('my');
                        expect(englishNoun.getArticle('apple', 'my', 'dat')).to.equal('mine');
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

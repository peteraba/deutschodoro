define(
    ['german/noun'],
    function(germanNoun) {
        var loaded = false;

        describe('german.noun', function() {
            describe('#getPlural()', function() {
                it('should return pluralized nouns', function(){
                    expect(germanNoun.getPlural('Apfel', '⍨')).to.equal('Äpfel');
                });
            });

            describe('#getPluralWrongPlural()', function() {
                it('should return wrongly pluralized nouns with consonant endings', function(){
                    var result, possibities;

                    result = germanNoun.getPluralWrongPlural('Apfel', ['Äpfel']);
                    possibities = ['Apfelen', 'Apfel', 'Äpfele', 'Apfeler', 'Apfels'];

                    expect(result).to.not.equal('Äpfel');
                    expect(result).to.be.a('string');
                    expect(possibities.indexOf(result)).to.be.greaterThan(-1);
                });
                it('should return wrongly pluralized nouns with vowel endings', function(){
                    var result, possibities;

                    result = germanNoun.getPluralWrongPlural('Dame', ['Damen']);
                    possibities = ['Dame', 'Däme', 'Dames'];

                    expect(result).to.not.equal('Damen');
                    expect(result).to.be.a('string');
                    expect(possibities.indexOf(result)).to.be.greaterThan(-1);
                });
            });

            describe('#getGenitive()', function() {
                it('should return genitive nouns', function(){
                    expect(germanNoun.getGenitive('Wolf', '~s')).to.equal('Wolfs');
                });
            });

            describe('#getArticle()', function() {
                it('should return articles', function(){
                    expect(germanNoun.getArticle('der', false, false, 'nom')).to.equal('der');
                    expect(germanNoun.getArticle('die', false, false, 'nom')).to.equal('die');
                    expect(germanNoun.getArticle('das', false, false, 'nom')).to.equal('das');
                    expect(germanNoun.getArticle('das', true,  false, 'nom')).to.equal('die');

                    expect(germanNoun.getArticle('der', false, 'ein', 'nom')).to.equal('ein');
                    expect(germanNoun.getArticle('die', false, 'ein', 'nom')).to.equal('eine');
                    expect(germanNoun.getArticle('das', false, 'ein', 'nom')).to.equal('ein');
                    expect(germanNoun.getArticle('das', true,  'ein', 'nom')).to.equal('eine');

                    expect(germanNoun.getArticle('der', false, 'mein', 'nom')).to.equal('mein');
                    expect(germanNoun.getArticle('die', false, 'mein', 'nom')).to.equal('meine');
                    expect(germanNoun.getArticle('das', false, 'mein', 'nom')).to.equal('mein');
                    expect(germanNoun.getArticle('das', true,  'mein', 'nom')).to.equal('meine');

                    expect(germanNoun.getArticle('der', false, 'mein', 'acc')).to.equal('meinen');
                    expect(germanNoun.getArticle('die', false, 'mein', 'acc')).to.equal('meine');
                    expect(germanNoun.getArticle('das', false, 'mein', 'acc')).to.equal('mein');
                    expect(germanNoun.getArticle('das', true,  'mein', 'acc')).to.equal('meine');
                });
            });

            loaded = true;
        });

        return {
            isLoaded: function(){return loaded;}
        }
    }
);

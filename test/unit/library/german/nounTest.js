describe('german.noun', function() {
    describe('#getPlural()', function() {
        it('should return pluralized nouns', function(){
            expect(d3.german.noun.getPlural('Apfel', '⍨')).to.be('Äpfel');
        });
    });

    describe('#getGenitive()', function() {
        it('should return genitive nouns', function(){
            expect(d3.german.noun.getGenitive('Wolf', '~s')).to.be('Wolfs');
        });
    });

    describe('#getArticle()', function() {
        it('should return articles', function(){
            expect(d3.german.noun.getArticle('der', false, false, 'nom')).to.be('der');
            expect(d3.german.noun.getArticle('die', false, false, 'nom')).to.be('die');
            expect(d3.german.noun.getArticle('das', false, false, 'nom')).to.be('das');
            expect(d3.german.noun.getArticle('das', true,  false, 'nom')).to.be('die');

            expect(d3.german.noun.getArticle('der', false, 'ein', 'nom')).to.be('ein');
            expect(d3.german.noun.getArticle('die', false, 'ein', 'nom')).to.be('eine');
            expect(d3.german.noun.getArticle('das', false, 'ein', 'nom')).to.be('ein');
            expect(d3.german.noun.getArticle('das', true,  'ein', 'nom')).to.be('eine');

            expect(d3.german.noun.getArticle('der', false, 'mein', 'nom')).to.be('mein');
            expect(d3.german.noun.getArticle('die', false, 'mein', 'nom')).to.be('meine');
            expect(d3.german.noun.getArticle('das', false, 'mein', 'nom')).to.be('mein');
            expect(d3.german.noun.getArticle('das', true,  'mein', 'nom')).to.be('meine');

            expect(d3.german.noun.getArticle('der', false, 'mein', 'acc')).to.be('meinen');
            expect(d3.german.noun.getArticle('die', false, 'mein', 'acc')).to.be('meine');
            expect(d3.german.noun.getArticle('das', false, 'mein', 'acc')).to.be('mein');
            expect(d3.german.noun.getArticle('das', true,  'mein', 'acc')).to.be('meine');
        });
    });
});

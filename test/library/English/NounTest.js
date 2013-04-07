describe('english.noun', function() {
    describe('#getPlural()', function() {
        it('should return pluralized nouns', function(){
            expect(d3.english.noun.getPlural('table')).to.be('tables');
            expect(d3.english.noun.getPlural('person')).to.be('people');
        });
    });

    describe('#getArticle()', function() {
        it('should return article', function(){
            expect(d3.english.noun.getArticle('table', false, 'nom')).to.be('the');
            expect(d3.english.noun.getArticle('table', true, 'nom')).to.be('a');
            expect(d3.english.noun.getArticle('apple', true, 'nom')).to.be('an');
            expect(d3.english.noun.getArticle('apple', true, 'nom')).to.be('an');

            expect(d3.english.noun.getArticle('apple', 'my', 'nom')).to.be('my');
            expect(d3.english.noun.getArticle('apple', 'my', 'dat')).to.be('mine');
        });
    });
});

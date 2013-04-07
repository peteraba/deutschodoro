describe('english.noun', function() {
    describe('#getPlural()', function() {
        it('should return pluralized nouns', function(){
            expect(d3.english.noun.getPlural('table')).to.be('tables');
            expect(d3.english.noun.getPlural('person')).to.be('people');
        });
    });
    describe('#getGenitive()', function() {
        it('should return genitive nouns', function(){
            expect(d3.english.noun.getGenitive('table')).to.be('table');
        });
    });
    describe('#getArticle()', function() {
        it('should return article', function(){
            expect(d3.english.noun.getArticle('table', false, true)).to.be('a');
            expect(d3.english.noun.getArticle('table', true, true)).to.be('the');
            expect(d3.english.noun.getArticle('apple', false, true)).to.be('an');
            expect(d3.english.noun.getArticle('apple', false, true)).to.be('an');
        });
    });
});

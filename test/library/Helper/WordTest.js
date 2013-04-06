describe('helper.word', function() {
    describe('#findLastChars()', function() {
        it('should return the highest index of the chars found in the chars group with a hit', function(){
            expect(d3.helper.word.findLastChars('Gaste', [['au'],['a', 'o', 'u']])).to.be(1);
            expect(d3.helper.word.findLastChars('Raum', [['au'],['a', 'o', 'u']])).to.be(1);
        });
    });
});

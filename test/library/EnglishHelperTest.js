describe('EnglishHelper', function() {
    describe('#checkConsonantEnding()', function() {
        it('should return true if word is ending in a consonant', function(){
            expect(d3.englishHelper.checkConsonantEnding('qwert')).to.be(true);
            expect(d3.englishHelper.checkConsonantEnding('ertzu')).to.be(false);
        });
    });
});

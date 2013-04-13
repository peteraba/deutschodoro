describe('helper.english', function() {
    describe('#checkConsonantEnding()', function() {
        it('should return true if word is ending in a consonant', function(){
            expect(d3.helper.english.checkConsonantEnding('qwert')).to.be(true);
            expect(d3.helper.english.checkConsonantEnding('ertzu')).to.be(false);
        });
    });
});

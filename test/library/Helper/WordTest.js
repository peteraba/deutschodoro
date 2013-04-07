describe('helper.word', function() {
    var dict = [
        {english: 'eng1', german: 'ger1', type: 'verb'},
        {english: 'eng2', german: 'ger2', type: 'verb'},
        {english: 'eng3', german: 'ger3', type: 'noun'},
        {english: 'eng4', german: 'ger4', type: 'noun'},
        {english: 'eng5', german: 'ger5', type: 'noun'},
        {english: 'eng4', german: 'ger6', type: 'noun'},
        {english: 'eng5', german: 'ger7', type: 'adj'},
        {english: 'eng5', german: 'ger8', type: 'adj'}
    ];

    describe('#findLastChars()', function() {
        it('should return the highest index of the chars found in the chars group with a hit', function(){
            expect(d3.helper.word.findLastChars('Gaste', [['au'],['a', 'o', 'u']])).to.be(1);
            expect(d3.helper.word.findLastChars('Raum', [['au'],['a', 'o', 'u']])).to.be(1);
        });
    });

    describe('#findFirstWord()', function() {
        it('should find the first word matching the search options', function(){
            expect(d3.helper.word.findFirstWord(dict, {})).to.be(dict[0]);
            expect(d3.helper.word.findFirstWord(dict, {english: 'eng4'})).to.be(dict[3]);
            expect(d3.helper.word.findFirstWord(dict, {english: 'eng4', german: 'ger6'})).to.be(dict[5]);
        });

        it('should return false when there is no result', function(){
            expect(d3.helper.word.findFirstWord(dict, {english: 'asd'})).to.be(false);
        });
    });

    describe('#findRandomWord()', function() {
        it('should return a random word matching the search options', function(){
            expect(d3.helper.word.findRandomWord(dict, {english: 'eng4'}).english).to.be('eng4');
            expect(d3.helper.word.findRandomWord(dict, {english: 'eng4'}).german).to.be.in(['ger4', 'ger6']);
        });

        it('should return false when there is no result', function(){
            expect(d3.helper.word.findRandomWord(dict, {english: 'asd'})).to.be(false);
        });
    });
});

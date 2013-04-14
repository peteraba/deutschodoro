define(
    ['helper/word'],
    function(wordHelper) {
        describe('helper.word', function() {
            var dict = {
                a: {english: 'eng1', german: 'ger1', type: 'verb'},
                b: {english: 'eng2', german: 'ger2', type: 'verb'},
                c: {english: 'eng3', german: 'ger3', type: 'noun'},
                d: {english: 'eng4', german: 'ger4', type: 'noun'},
                e: {english: 'eng5', german: 'ger5', type: 'noun'},
                f: {english: 'eng4', german: 'ger6', type: 'noun'},
                g: {english: 'eng5', german: 'ger7', type: 'adj'},
                h: {english: 'eng5', german: 'ger8', type: 'adj'}
            };

            describe('#findLastChars()', function() {
                it('should return the highest index of the chars found in the chars group with a hit', function(){
                    expect(wordHelper.findLastChars('Gaste', [['au'],['a', 'o', 'u']])).to.equal(1);
                    expect(wordHelper.findLastChars('Raum', [['au'],['a', 'o', 'u']])).to.equal(1);
                });
            });
        });
    }
);

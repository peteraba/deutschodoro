define(
    ['helper/word'],
    function(wordHelper) {
        describe('helper/word', function() {
            describe('#findLastChars()', function() {
                it('should return the highest index of the chars found in the chars group with a hit', function(){
                    expect(wordHelper.findLastChars('Gaste', [['au'],['a', 'o', 'u']])).to.equal(1);
                    expect(wordHelper.findLastChars('Raum', [['au'],['a', 'o', 'u']])).to.equal(1);
                });
            });
        });

        return {
            isLoaded: function(){return true;}
        }
    }
);

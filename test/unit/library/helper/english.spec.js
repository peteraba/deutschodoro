define(
    ['helper/english'],
    function(englishHelper) {
        describe('helper/english', function() {
            describe('#checkConsonantEnding()', function() {
                it('should return true if word is ending in a consonant', function(){
                    expect(englishHelper.checkConsonantEnding('qwert')).to.equal(true);
                    expect(englishHelper.checkConsonantEnding('qweru')).to.equal(false);
                });
            });
        });

        return {
            isLoaded: function(){return true;}
        }
    }
);
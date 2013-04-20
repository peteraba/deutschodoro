define(
    ['vendor/underscore'],
    function (_) {
        var dict, stubs, context, context2, loaded = 0;

        dict = {
            a: {level: 1, english: 'yes', german: 'ja', hash: 'a'},
            b: {level: 1, english: 'no', german: 'nein', hash: 'b'}
        };

        stubs = {
            dictionary: {findWords: sinon.stub().returns({a: dict.a, b: dict.b})},
            stat: {pickWord: sinon.stub().returns(dict.a)}
        };

        context = createContext(stubs, _);

        context(['wordFinder'], function (wordFinder) {
            describe('wordFinder - not empty dictionary', function() {
                describe('#getWord()', function() {
                    it('should return the word returned by stat', function(){
                        expect(wordFinder.getWord({})).to.equal(dict.a);
                    });
                });
                describe('#getRandomWord()', function() {
                    it('should return a random word returned by dictionary', function(){
                        var result = wordFinder.getRandomWord({}), possibilities = [dict.a.english, dict.b.english];
                        expect(possibilities.indexOf(result.english)).to.be.greaterThan(-1);
                    });
                    it('should return a word returned by dictionary not in skipWords', function(){
                        var result = wordFinder.getRandomWord({}), possibilities = [dict.a.english, dict.b.english];
                        expect(wordFinder.getRandomWord({}, ['ja'])).to.be.equal(dict.b);
                    });
                    it('should return false if all words returned by dictionary not in skipWords', function(){
                        var result = wordFinder.getRandomWord({}), possibilities = [dict.a.english, dict.b.english];
                        expect(wordFinder.getRandomWord({}, ['ja', 'nein'])).to.be.equal(false);
                    });
                });
            });

            loaded++;
        });

        stubs = {
            dictionary: {findWords: sinon.stub().returns({})}
        };

        context2 = createContext(stubs, _);

        context2(['wordFinder'], function (wordFinder) {
            describe('wordFinder - empty dictionary', function() {
                describe('#getWord()', function() {
                    it('should return false when no words were returned by dictionary', function(){
                        expect(wordFinder.getWord({})).to.equal(false);
                    });
                });
                describe('#getRandomWord()', function() {
                    it('should return false when no words were returned by dictionary', function(){
                        expect(wordFinder.getRandomWord({})).to.equal(false);
                    });
                });
            });

            loaded++;
        });

        return {
            isLoaded: function(){return loaded == 2;}
        }
    }
);
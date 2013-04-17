define(
    ['vendor/underscore'],
    function (_) {
        var dict, stubs, context, loaded = false;

        dict = {
            a: {level: 1, english: 'yes', german: 'ja', hash: 'a'},
            b: {level: 1, english: 'no', german: 'nein', hash: 'b'},
            c: {level: 2, english: 'similar', german: 'ähnlich', hash: 'c'},
            d: {level: 3, english: 'enthusiastic', german: 'begeistert', hash: 'd'},
            e: {level: 100, english: '', german: 'Vorsitz', hash: 'e'}
        };

        stubs = {
            dictionary: {findWords: sinon.stub().returns({a: dict.a, b: dict.b})},
            stat: {pickWord: sinon.stub().returns(dict.a)}
        };

        context = createContext(stubs, _);

        context(['wordFinder'], function (wordFinder) {
            describe('wordFinder', function() {
                describe('#getWord() - not empty', function() {
                    it('should return a word returned by stat', function(){
                        expect(wordFinder.getWord({})).to.equal(dict.a);
                    });
                });
            });

            loaded = true;
        });

        return {
            isLoaded: function(){return loaded;}
        }
    }
);
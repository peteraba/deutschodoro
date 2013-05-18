define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false, rawDict, level1Dictionary, level2Dictionary, validDictionary;

        rawDict = {dict: [
            {level: 1, english: 'yes', german: 'ja', hash: 'a'},
            {level: 1, english: 'no', german: 'nein', hash: 'b'},
            {level: 2, english: 'similar', german: 'ähnlich', hash: 'c'},
            {level: 3, english: 'enthusiastic', german: 'begeistert', hash: 'd'},
            {level: 100, english: '', german: 'Vorsitz', hash: 'e'}
        ]};

        level1Dictionary = {a: rawDict.dict[0], b: rawDict.dict[1]};
        level2Dictionary = {a: rawDict.dict[0], b: rawDict.dict[1], c: rawDict.dict[2]};
        validDictionary  = {a: rawDict.dict[0], b: rawDict.dict[1], c: rawDict.dict[2], d: rawDict.dict[3]};

        stubs = {
            'base/options': {
                getRawDictionary: sinon.stub().returns(rawDict)
            }
        };

        context = requireHelper.createContext(stubs, _);

        context(['base/dictionary'], function (dictionary) {
            describe('base/dictionary', function() {
                describe('#getDictionary()', function() {
                    it('should return the dictionary including all words with levels by default', function(){
                        expect(dictionary.getDictionary()).to.eql(validDictionary);
                    });
                    it('should return the dictionary with the applied level filter', function(){
                        dictionary.setMinLevel(1);
                        expect(dictionary.getDictionary()).to.eql(level1Dictionary);

                        dictionary.setMinLevel(2);
                        expect(dictionary.getDictionary()).to.eql(level2Dictionary);
                    });
                });

                describe('#findWords()', function() {
                    it('should return all words matching the search options', function(){
                        dictionary.setMinLevel(1);
                        expect(dictionary.findWords({english: 'yes'}, 1)).to.eql({a: rawDict.dict[0]});
                    });
                    it('should return all words missing the negated search options', function(){
                        dictionary.setMinLevel(1);
                        expect(dictionary.findWords({english: '!no'}, 1)).to.eql({a: rawDict.dict[0]});
                    });
                    it('should return empty array when there is no result', function(){
                        dictionary.setMinLevel(1);
                        expect(dictionary.findWords({english: 'asd'}, 1)).to.eql({});
                    });
                })
            });

            loaded = true;
        });

        return {
            isLoaded: function(){return loaded;}
        }
    }
);

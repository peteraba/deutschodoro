define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false, dict, level1Dictionary, level2Dictionary, validDictionary;

        dict = [
            {level: 1, english: 'yes', german: 'ja', hash: 'a'},
            {level: 1, english: 'no', german: 'nein', hash: 'b'},
            {level: 2, english: 'similar', german: 'ähnlich', hash: 'c'},
            {level: 3, english: 'enthusiastic', german: 'begeistert', hash: 'd'},
            {level: 100, english: '', german: 'Vorsitz', hash: 'e'},
        ];

        level1Dictionary = {a: dict[0], b: dict[1]};
        level2Dictionary = {a: dict[0], b: dict[1], c: dict[2]};
        validDictionary  = {a: dict[0], b: dict[1], c: dict[2], d: dict[3]};

        stubs = {
            'dict/dict': dict
        };

        context = createContext(stubs, _);

        context(['dictionary'], function (dictionary) {
            describe('dictionary', function() {
                describe('#getDictionary()', function() {
                    it('should return the dictionary including all words with levels by default', function(){
                        expect(dictionary.getDictionary()).to.eql(validDictionary);
                    });
                    it('should return the dictionary with the applied level filter', function(){
                        dictionary.setLevel(1);
                        expect(dictionary.getDictionary()).to.eql(level1Dictionary);

                        dictionary.setLevel(2);
                        expect(dictionary.getDictionary()).to.eql(level2Dictionary);
                    });
                });

                describe('#findWords()', function() {
                    it('should return all words matching the search options', function(){
                        expect(dictionary.findWords({english: 'yes'})).to.eql({a: dict[0]});
                    });

                    it('should return empty array when there is no result', function(){
                        expect(dictionary.findWords({english: 'asd'})).to.eql({});
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

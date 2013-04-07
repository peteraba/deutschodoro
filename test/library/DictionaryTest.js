describe('dictionary', function() {
    var dict, level1Dictionary, level2Dictionary, validDictionary;

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

    describe('#getDictionary()', function() {
        it('should return the dictionary including all words with levels by default', function(){
            d3.dictionary.setDictionary(dict);
            expect(d3.dictionary.getDictionary()).to.eql(validDictionary);
        });
        it('should return the dictionary with the applied level filter', function(){
            d3.dictionary.setDictionary(dict);
            d3.dictionary.setLevel(1);
            expect(d3.dictionary.getDictionary()).to.eql(level1Dictionary);
            d3.dictionary.setLevel(2);
            expect(d3.dictionary.getDictionary()).to.eql(level2Dictionary);
        });
    });
});

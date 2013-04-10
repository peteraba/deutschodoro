describe('wordFinder', function() {
    describe('#getWord()', function() {
        var dict, statData;

        dict = [
            {level: 1, english: 'yes', german: 'ja', hash: 'a'},
            {level: 1, english: 'no', german: 'nein', hash: 'b'},
            {level: 2, english: 'similar', german: 'ähnlich', hash: 'c'},
            {level: 3, english: 'enthusiastic', german: 'begeistert', hash: 'd'},
            {level: 100, english: '', german: 'Vorsitz', hash: 'e'}
        ];

        statData = {
            a: [[0, 0]],
            b: [[1, 0]],
            c: [[1, 0]],
            d: [[1, 0]],
            e: [[1, 0]]
        };

        beforeEach(function(){
            d3.dictionary.setDictionary(dict);
            d3.dictionary.setLevel(0);

            d3.stat.setData(statData);
        });

        it('should return the word with the lowest score matching the search options.', function(){
            expect(d3.wordFinder.getWord({})).to.be(dict[0]);
        });
    });
});

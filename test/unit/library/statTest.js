describe('stat', function() {
    describe('#pickWord()', function() {
        it('should pick the word with the lowest score', function(){
            var words, ts, statData;

            words = {
                a: {hash: 'a'},
                b: {hash: 'b'},
                c: {hash: 'c'},
                d: {hash: 'd'}
            };

            ts = Math.round((new Date()).getTime() / 1000);

            statData = {
                a: [[1, ts-86401], [0, ts-172801], [0, ts-864001]],
                b: [[1, ts-86401], [0, ts-172801]],
                d: [[0, 0]]
            };

            d3.stat.setData(statData);

            expect(d3.stat.pickWord(words)).to.eql(words.d);

            delete words.d;
            expect(d3.stat.pickWord(words)).to.eql(words.c);

            delete words.c;
            expect(d3.stat.pickWord(words)).to.eql(words.a);

            delete words.a;
            expect(d3.stat.pickWord(words)).to.eql(words.b);

            delete words.b;
            expect(d3.stat.pickWord(words)).to.be(false);
        });
    });

    describe('#saveResult()', function() {
        it('should call storage.setItem', function(){
            var dummyStorage, ts, hashes, expectedResult;

            dummyStorage = (function(){
                var dataSaved = {};
                function setItem(key, dataString){
                    dataSaved = JSON.parse(dataString);
                }
                function getDataSaved(){
                    return dataSaved;
                }
                return {
                    getDataSaved: getDataSaved,
                    setItem: setItem
                };
            })();

            ts = Math.round((new Date()).getTime() / 1000);

            hashes = ['a', 'b', 'c'];

            d3.stat.setStorage(dummyStorage);
            d3.stat.setTimestamp(ts);
            d3.stat.setData({});

            d3.stat.saveResult(hashes, 1);

            expectedResult = {
                a: [[1, ts]],
                b: [[1, ts]],
                c: [[1, ts]]
            };

            expect(dummyStorage.getDataSaved()).to.eql(expectedResult);
        });
    });
});

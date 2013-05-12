define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false;

        stubs = {
        };

        context = createContext(stubs, _);

        context(['base/stat'], function (stat) {
            describe('base/stat', function() {
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

                        stat.setData(statData);

                        expect(stat.pickWord(words)).to.equal(words.d);

                        delete words.d;
                        expect(stat.pickWord(words)).to.equal(words.c);

                        delete words.c;
                        expect(stat.pickWord(words)).to.equal(words.a);

                        delete words.a;
                        expect(stat.pickWord(words)).to.equal(words.b);

                        delete words.b;
                        expect(stat.pickWord(words)).to.equal(false);
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

                        stat.setStorage(dummyStorage);
                        stat.setTimestamp(ts);
                        stat.setData({});

                        stat.saveResult(hashes, 1);

                        expectedResult = {
                            a: [[1, ts]],
                            b: [[1, ts]],
                            c: [[1, ts]]
                        };

                        expect(dummyStorage.getDataSaved()).to.eql(expectedResult);
                    });
                });

                describe('#getStats()', function() {
                    it('should return an object with point keys and values of word count', function(){
                        var words, ts, statData, expectedResult;

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

                        expectedResult = {
                            0: 1,
                            '3': 1,
                            '5': 1
                        };

                        stat.setData(statData);

                        expect(stat.getStats(words)).to.eql(expectedResult);
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
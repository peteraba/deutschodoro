define(
    ['vendor/Squire'],
    function(Squire) {
        describe('wordFinder', function() {
            describe('#getWord()', function() {
                var dict, statData, ts, context = {};

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

                ts = Math.round((new Date('2013-04-14')).getTime() / 1000);

                beforeEach(function(done) {
                    var doneCount = 0;

                    function setDictionary(){
                        if (doneCount == 2) {
                            context.injector3 = new Squire();
                            context.injector3
                                //.mock('dictionary', context.dictionary)
                                //.mock('stat', context.stat)
                                .mock({
                                    dictionary: context.dictionary,
                                    stat: context.stat
                                })
                                .require(['wordFinder'], function(wordFinder) {
                                    context.wordFinder = wordFinder;
                                    done();
                                });
                        }
                    }

                    context.injector = new Squire();
                    context.injector
                        //.mock('dict/dict', dict)
                        .mock({
                            'dict/dict': dict,
                            rawDictionary: dict
                        })
                        .require(['dictionary'], function(dictionary) {
                            context.dictionary = dictionary;
                            doneCount++;
                            console.log(dictionary);
                            setDictionary();
                        });

                    context.injector2 = new Squire();
                    context.injector2
                        .require(['stat'], function(stat) {
                            stat.setData(statData);
                            stat.setTimestamp(ts);
                            //stat.setStorage();
                            context.stat = stat;
                            doneCount++;
                            setDictionary();
                        });

                });

                it('should return the word with the lowest score matching the search options.', function(){
                    expect(context.wordFinder.getWord({})).to.equal(dict[0]);
                    //expect(context.wordFinder.getWord({english: 'no'})).to.equal(dict[1]);
                });
            });
        });

        return {
            name: "wordFinder"
        };
    }
);

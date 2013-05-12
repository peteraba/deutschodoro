define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false;

        stubs = {
            'base/logger': {
                info: sinon.stub()
            }
        };

        context = createContext(stubs, _);

        context(['base/timer'], function (timer) {
            describe('base/timer', function() {
                var key = 'hello';

                beforeEach(function(){
                    try {
                        timer.end(key);
                    } catch (e) {

                    }
                });

                describe('#start()', function() {
                    it('should work with string given', function(){

                        expect(timer.start(key)).to.equal(true);
                    });
                    it('should throw exception when called without parameters', function(){
                        expect(timer.start).to.throw(/not defined/);
                    });
                    it('should throw exception when called twice for the same key without end', function(){
                        var fn = function(){timer.start(key);};
                        timer.start(key);
                        expect(fn).to.throw(/already exists/).and.to.not.throw(/not defined/);
                    });
                    it('should work twice for same key if end called between them', function(){
                        timer.start(key);
                        timer.end(key);
                        expect(timer.start(key)).to.equal(true);
                    });
                });
                describe('#end()', function() {
                    it('should return time in ms between start and end calls', function(){
                        var key = 'hello';

                        expect(timer.start(key)).to.equal(true);
                        expect(timer.end(key)).to.be.within(0, 20);
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
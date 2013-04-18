define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false, createResult = 'hello';

        stubs = {
            games: {
                game1: {
                    importance: 100,
                    create: sinon.stub().returns(createResult)
                }
            },
            gui: {
                isReady: sinon.stub().returns(true),
                displayGame: sinon.stub()
            }
        };

        context = createContext(stubs, _);

        context(['app'], function (app) {
            describe('app', function() {
                describe('#run()', function() {
                    it('should return `' + createResult + '` if game is found', function(){
                        expect(app.run()).to.equal(createResult);
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
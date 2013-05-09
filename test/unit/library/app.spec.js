define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false, createResult = 'hello';

        stubs = {
            games: {
                game1: {
                    importance: 100,
                    create: sinon.stub().returns(createResult),
                    getHtml: sinon.stub().returns('<h1>' + createResult + '</h1>'),
                    getHelp: sinon.stub(),
                    getUsedWords: sinon.stub()
                }
            },
            gui: {
                isReady: sinon.stub().returns(true),
                displayGame: sinon.stub(),
                displayHelp: sinon.stub(),
                updateStats: sinon.stub()
            },
            dictionary: {
                getDictionary: sinon.stub()
            },
            stat: {
                getStats: sinon.stub()
            }
        };

        context = createContext(stubs, _);

        context(['app'], function (app) {
            describe('app', function() {
                describe('#run()', function() {
                    it('should return a game', function(){
                        expect(app.run()).to.be.an('object');
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
define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false, gameStub;

        gameStub = {
            setImportance: function(){},
            setMinLevel: function(){},
            setMaxLevel: function(){}
        };

        stubs = {
            'base/options': {
                get: function(key){
                    if (key=='minLevel') return 1;
                    if (key=='maxLevel') return 10;
                    if (key=='derDieDas') return {
                        importance: 0
                    };
                    return {
                        importance: 100
                    };
                }
            },
            'game/derDieDas': gameStub,
            'game/pluralize': gameStub,
            'game/wordToEnglish': gameStub,
            'game/wordToGerman': gameStub
        };

        context = createContext(stubs, _);

        context(['base/games'], function (games) {
            var allGames = {
                derDieDas: stubs['game/derDieDas'],
                pluralize: stubs['game/pluralize'],
                wordToEnglish: stubs['game/wordToEnglish'],
                wordToGerman: stubs['game/wordToGerman']
            }, enabledGames = {
                pluralize: stubs['game/pluralize'],
                wordToEnglish: stubs['game/wordToEnglish'],
                wordToGerman: stubs['game/wordToGerman']
            };

            describe('base/games', function() {
                describe('#getEnabledGames()', function() {
                    it('should return games with importance above zero', function(){
                        expect(games.getEnabledGames()).to.eql(enabledGames);
                    });
                });

                describe('#getAllGames()', function() {
                    it('should return all games', function(){
                        expect(games.getAllGames()).to.eql(allGames);
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

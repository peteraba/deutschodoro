define(
    ['vendor/underscore', 'vendor/jquery'],
    function(_, $) {
        var stubs, context, loaded = false, allGames = [];

        stubs = {
            'base/games': {
                getAllGames: function() { return allGames; }
            },
            'base/options': {
                get: function() { return 1; }
            },
            'helper/dom': {
                get: function(html) { return  $(html); }
            }
        };

        context = requireHelper.createContext(stubs, _);

        context(['settings/mainOptions'], function (mainOptions) {
            describe('settings/mainOptions', function() {
                describe('#render()', function() {
                    it('Render form even with zero games', function(){
                        var result = mainOptions.render();

                        expect(result.html()).to.contain('<form');
                        expect(result.html()).to.contain('<h1>Main options</h1>');
                        expect($('.gameImportance', result).length).to.equal(0);
                    });
                    it('Render form even with multiple games', function(){
                        var result;

                        mainOptions.setAllGames([
                            {getImportance: function() {return 0;}},
                            {getImportance: function() {return 25;}},
                            {getImportance: function() {return 50;}},
                            {getImportance: function() {return 120;}}
                        ]);

                        result = mainOptions.render();

                        expect(result.html()).to.contain('<form');
                        expect(result.html()).to.contain('<h1>Main options</h1>');
                        expect($('.gameImportance', result).length).to.equal(4);
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

define(
    ['vendor/underscore'],
    function(_) {
        var stubs, context, loaded = false;

        stubs = {
            'base/options': {
                getRawDictionary: function(){ return {}; }
            },
            'base/logger': {

            },
            'helper/dom': {
                get: function(html) { return  $(html); }
            }
        };

        context = requireHelper.createContext(stubs, _);

        context(['settings/dictionary'], function (dictionarySettings) {
            describe('settings/dictionary', function() {
                describe('#render()', function() {
                    it('should display textarea with json representation of the dictionary', function(){
                        var result = dictionarySettings.render().html();

                        expect(result).to.contain('<h1>Dictionary</h1>');
                        expect(result).to.contain('<textarea cols="50" rows="10" id="rawDictionary">{}</textarea>');
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

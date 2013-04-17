define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false;

        stubs = {};

        context = createContext(stubs, _);

        context(['game/wordToGerman'], function (wordToGerman) {
            describe('#checkResult()', function() {
                it('should check if result is the correct German word', function(){
                    expect(wordToGerman.checkResult()).to.equal(false);
                });
            });

            describe('#getHtml()', function() {
                it('should return html', function(){
                    expect(wordToGerman.create()).to.equal(true);
                    expect(wordToGerman.getHtml()).to.contain('<h1>');
                });
            });

            loaded = true;
        });

        return {
            isLoaded: function(){return loaded;}
        }
    }
);

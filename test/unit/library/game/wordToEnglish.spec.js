define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false;

        stubs = {};

        context = createContext(stubs, _);

        context(['game/wordToEnglish'], function (wordToEnglish) {
            describe('game.wordToEnglish', function() {
                describe('#checkResult()', function() {
                    it('should check if result is the correct English word', function(){
                        expect(wordToEnglish.checkResult()).to.equal(false);
                    });
                });

                describe('#getHtml()', function() {
                    it('should return html', function(){
                        expect(wordToEnglish.create()).to.equal(true);
                        expect(wordToEnglish.getHtml()).to.contain('<h1>');
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

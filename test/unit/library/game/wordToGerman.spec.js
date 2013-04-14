define(
    ['vendor/Squire', 'game/wordToGerman'],
    function(Squire, wordToGerman) {
        describe('game.wordToGerman', function() {
            var context = {};

            beforeEach(function(done) {
                context.injector = new Squire();
                context.injector.require(['game/wordToGerman'], function(game) {
                    context.game = game;
                    done();
                });
            });

            describe('#checkResult()', function() {
                it('should check if result is the correct German word', function(){
                    expect(context.game.checkResult()).to.equal(false);
                });
            });

            describe('#getHtml()', function() {
                it('should return html', function(){
                    expect(context.game.create()).to.equal(true);
                    expect(context.game.getHtml()).to.contain('<h1>');
                });
            });
        });
    }
);

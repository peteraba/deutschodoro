define(
    ['vendor/Squire', 'game/derDieDas'],
    function(Squire, derDieDas) {
        describe('game.derDieDas', function() {
            var wordFinder, context = {};

            wordFinder = {
                getWord: function(){return {article:"der", german:"Apfel"};}
            };

            beforeEach(function(done) {
                context.injector = new Squire();
                context.injector.mock('wordFinder', wordFinder).require(['game/derDieDas'], function(game) {
                    context.game = game;
                    done();
                });
            });

            describe('#checkResult()', function() {
                it('should check if result is the word article', function(){
                    expect(context.game.create()).to.equal(true);
                    expect(context.game.checkResult('der')).to.equal(true);
                    expect(context.game.checkResult('das')).to.equal(false);
                });
            });

            describe('#getHtml()', function() {
                it('should return html', function(){
                    expect(context.game.create()).to.equal(true);
                    expect(context.game.getHtml()).to.contain('<h1>');
                });
            });
        });

        return {
            name: "game/derDieDas"
        };
    }
);
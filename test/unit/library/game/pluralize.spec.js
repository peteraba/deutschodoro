define(
    ['vendor/Squire', 'game/pluralize'],
    function(Squire, pluralize) {
        describe('game.pluralize', function() {
            var wordFinder, context = {};

            wordFinder = {
                getWord: function(){return {plural:"⍨", german:"Apfel"};}
            };

            beforeEach(function(done) {
                context.injector = new Squire();
                context.injector.mock('wordFinder', wordFinder).require(['game/pluralize'], function(game) {
                    context.game = game;
                    done();
                });
            });

            describe('#checkResult()', function() {
                it('should check if result is the correct pluralized German word', function(){
                    expect(context.game.create()).to.equal(true);
                    expect(context.game.checkResult('Äpfel')).to.equal(true);
                    expect(context.game.checkResult('Apfels')).to.equal(false);
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

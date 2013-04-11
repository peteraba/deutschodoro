describe('game.derDieDas', function() {
    var game = d3.game.derDieDas;

    describe('#checkResult()', function() {
        it('should check if result is the word article', function(){
            var wordFinder = {
                getWord: function(){return {"article":"der", "german":"Apfel"};}
            };

            game.setWordFinder(wordFinder);

            expect(game.create()).to.be(true);
            expect(game.checkResult('der')).to.be(true);
            expect(game.checkResult('das')).to.be(false);
        });
    });

    describe('#getHtml()', function() {
        it('should return html', function(){
            var wordFinder = {
                getWord: function(){return {"article":"der", "german":"Apfel"};}
            };

            game.setWordFinder(wordFinder);

            expect(game.create()).to.be(true);
            expect(game.getHtml()).to.contain('<h1>');
        });
    });
});

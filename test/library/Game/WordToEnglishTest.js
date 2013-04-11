describe('game.wordToEnglish', function() {
    var game = d3.game.wordToEnglish;

    describe('#checkResult()', function() {
        it('should check if result is the correct English word', function(){
            expect(game.getHtml()).to.fail();
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

describe('game.pluralize', function() {
    var game = d3.game.pluralize, wordFinder;

    wordFinder = {
        getWord: function(){return {plural:"⍨", german:"Apfel"};}
    };

    game.setWordFinder(wordFinder);

    describe('#checkResult()', function() {
        it('should check if result is the correct pluralized German word', function(){
            expect(game.create()).to.be(true);
            expect(game.checkResult('Äpfel')).to.be(true);
            expect(game.checkResult('Apfels')).to.be(false);
        });
    });

    describe('#getHtml()', function() {
        it('should return html', function(){
            expect(game.create()).to.be(true);
            expect(game.getHtml()).to.contain('<h1>');
        });
    });
});

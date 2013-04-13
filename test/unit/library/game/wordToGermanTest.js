describe('game.wordToGerman', function() {
    var game = d3.game.wordToEnglish, apple;

    apple = {article:"der",german:"Apfel",genitive:"~s",plural:"⍨",type:"noun",category:"food",level:"1",english:"apple",hash:"01d8fcbee530ff2cc52f7e0e1040a8e1"};

    describe('#checkResult()', function() {
        it('should check if result is the correct German word', function(){
            expect(game.checkResult()).to.be(false);
        });
    });

    describe('#getHtml()', function() {
        it('should return html', function(){
            var wordFinder = {
                getWord: function(){return apple;}
            };

            game.setWordFinder(wordFinder);

            expect(game.create()).to.be(true);
            expect(game.getHtml()).to.contain('<h1>');
        });
    });
});

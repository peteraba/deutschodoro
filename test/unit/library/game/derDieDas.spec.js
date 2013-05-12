define(
    ['vendor/underscore'],
    function (_) {
        var noun, stubs, context, loaded = false;

        noun = {article:"der", german:"Apfel"};

        stubs = {
            'base/wordFinder': {getWord: sinon.stub().returns(noun)}
        };

        context = createContext(stubs, _);

        context(['game/derDieDas'], function (derDieDas) {
            describe('game.derDieDas', function() {
                describe('#checkResult()', function() {
                    it('should check if result is the word article', function(){
                        expect(derDieDas.create()).to.equal(true);
                        expect(derDieDas.checkResult('der')).to.equal(true);
                        expect(derDieDas.checkResult('das')).to.equal(false);
                    });
                });

                describe('#getHtml()', function() {
                    it('should return html', function(){
                        expect(derDieDas.create()).to.equal(true);
                        expect(derDieDas.getHtml()).to.contain('<h1>');
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
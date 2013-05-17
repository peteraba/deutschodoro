define(
    ['vendor/underscore'],
    function (_) {
        var noun, stubs, context, loaded = false;

        noun = {article:"der", german:"Apfel", english:"apple"};

        stubs = {
            'base/wordFinder': {getWord: sinon.stub().returns(noun)}
        };

        context = createContext(stubs, _);

        context(['game/derDieDas'], function (derDieDas) {
            describe('game/derDieDas', function() {
                describe('#getHtml()', function() {
                    it('should return html', function(){
                        expect(derDieDas.create()).to.equal(true);
                        expect(derDieDas.getHtml()).to.contain('<h1>');
                    });
                });

                describe('#checkResult()', function() {
                    it('should check if result is the word article', function(){
                        expect(derDieDas.create()).to.equal(true);
                        expect(derDieDas.checkResult('der')).to.equal(true);
                        expect(derDieDas.checkResult('das')).to.equal(false);
                    });
                });

                describe('#getUsedWords()', function() {
                    it('should return selected word in an array', function(){
                        expect(derDieDas.getUsedWords()).to.eql([noun]);
                    });
                });

                describe('#getAnswer()', function() {
                    it('should return article of selected word', function(){
                        expect(derDieDas.getAnswer()).to.eql(noun.article);
                    });
                });

                describe('#getHelp()', function() {
                    it('should return original word', function(){
                        expect(derDieDas.getHelp()).to.contain(noun.english);
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
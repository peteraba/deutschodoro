define(
    ['vendor/underscore'],
    function (_) {
        var noun, stubs, context, loaded = false;

        noun = {plural:"⍨", german:"Apfel", english:"apple"};

        stubs = {
            'base/wordFinder': {getWord: sinon.stub().returns(noun)}
        };

        context = requireHelper.createContext(stubs, _);

        context(['game/pluralize'], function (pluralize) {
            describe('game/pluralize', function() {
                describe('#getHtml()', function() {
                    it('should return html', function(){
                        expect(pluralize.create()).to.equal(true);
                        expect(pluralize.getHtml()).to.contain('<h1>');
                    });
                });

                describe('#checkResult()', function() {
                    it('should check if result is the correct pluralized German word', function(){
                        expect(pluralize.create()).to.equal(true);
                        expect(pluralize.checkResult('die Äpfel')).to.equal(true);
                        expect(pluralize.checkResult('die Apfels')).to.equal(false);
                    });
                });

                describe('#getUsedWords()', function() {
                    it('should return selected word in an array', function(){
                        expect(pluralize.create()).to.equal(true);
                        expect(pluralize.getUsedWords()).to.eql([noun]);
                    });
                });

                describe('#getAnswer()', function() {
                    it('should return article of selected word', function(){
                        expect(pluralize.create()).to.equal(true);
                        expect(pluralize.getAnswer()).to.equal('die Äpfel');
                    });
                });

                describe('#getHelp()', function() {
                    it('should return original word', function(){
                        expect(pluralize.create()).to.equal(true);
                        expect(pluralize.getHelp()).to.contain(noun.english);
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

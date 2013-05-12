define(
    ['vendor/underscore'],
    function (_) {
        var noun, stubs, context, loaded = false;

        noun = {plural:"⍨", german:"Apfel"};

        stubs = {
            'base/wordFinder': {getWord: sinon.stub().returns(noun)}
        };

        context = createContext(stubs, _);

        context(['game/pluralize'], function (pluralize) {
            describe('game.pluralize', function() {
                describe('#checkResult()', function() {
                    it('should check if result is the correct pluralized German word', function(){
                        expect(pluralize.create()).to.equal(true);
                        expect(pluralize.checkResult('die Äpfel')).to.equal(true);
                        expect(pluralize.checkResult('die Apfels')).to.equal(false);
                    });
                });

                describe('#getHtml()', function() {
                    it('should return html', function(){
                        expect(pluralize.create()).to.equal(true);
                        expect(pluralize.getHtml()).to.contain('<h1>');
                    });
                });

                loaded = true;
            });
        });


        return {
            isLoaded: function(){return loaded;}
        }
    }
);

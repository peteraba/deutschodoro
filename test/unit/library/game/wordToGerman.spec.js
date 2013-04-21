define(
    ['vendor/underscore'],
    function (_) {
        var loaded = 0;

        function context1() {
            var stubs, context, verb1, verb2;

            verb1 = {type:'verb',german:"arbeiten",english:"to work"};
            verb2 = {type:'verb',german:"bringen",english:["to bring","to fetch"]};

            stubs = {
                wordFinder: {
                    getWord: sinon.stub().returns(verb1),
                    getRandomWord: sinon.stub().returns(verb2)
                }
            };

            context = createContext(stubs, _);

            context(['game/wordToGerman'], function (wordToGerman) {
                describe('game.wordToGerman - noun', function() {
                    describe('#checkResult()', function() {
                        it('should check if result is the correct English word', function(){
                            expect(wordToGerman.create()).to.equal(true);
                            expect(wordToGerman.checkResult('arbeiten')).to.equal(true);
                            expect(wordToGerman.checkResult('bringen')).to.equal(false);
                        });
                    });

                    describe('#getHtml()', function() {
                        it('should return html', function(){
                            expect(wordToGerman.create()).to.equal(true);
                            expect(wordToGerman.getHtml()).to.contain('<h1>');
                        });
                    });
                });

                loaded++
            });
        }


        function context2() {
            var stubs, context, noun1, noun2;

            noun1 = {type:'noun',article:"der",plural:"⍨", german:"Apfel",english:"apple"};
            noun2 = {type:'noun',article:"der",plural:"~en", german:"Administrator",english:"admin"};

            stubs = {
                wordFinder: {
                    getWord: sinon.stub().returns(noun1),
                    getRandomWord: sinon.stub().returns(noun2)
                },
                germanNoun: {
                    getPlural: function(german){return german=='Apfel' ? 'Äpfel' : 'Administratoren';}
                },
                englishNoun: {
                    getPlural: function(english){return english=='apple' ? 'apples' : 'admins';}
                }

            };

            context = createContext(stubs, _);

            context(['game/wordToGerman'], function (wordToGerman) {
                describe('game.wordToGerman - verb', function() {
                    describe('#checkResult()', function() {
                        it('should check if result is the correct English word', function(){
                            var results = [];

                            expect(wordToGerman.create()).to.equal(true);

                            results.push(wordToGerman.checkResult('der Apfel') ? 'yes' : 'no');
                            results.push(wordToGerman.checkResult('die Äpfel') ? 'yes' : 'no');

                            expect(results.indexOf('yes')).to.be.greaterThan(-1);
                            expect(results.indexOf('no')).to.be.greaterThan(-1);
                            expect(wordToGerman.checkResult('Administrator')).to.equal(false);
                            expect(wordToGerman.checkResult('Administratoren')).to.equal(false);
                        });
                    });

                    describe('#getHtml()', function() {
                        it('should return html', function(){
                            expect(wordToGerman.create()).to.equal(true);
                            expect(wordToGerman.getHtml()).to.contain('<h1>');
                        });
                    });
                });

                loaded++
            });
        }

        context1();
        context2();

        return {
            isLoaded: function(){return loaded == 2;}
        }
    }
);

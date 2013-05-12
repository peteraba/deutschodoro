define(
    ['vendor/underscore'],
    function (_) {
        var loaded = 0;

        function context1() {
            var stubs, context, verb1, verb2;

            verb1 = {type:'verb',german:"arbeiten",english:"to work",level:1};
            verb2 = {type:'verb',german:"bringen",english:["to bring","to fetch"],level:1};

            stubs = {
                'base/wordFinder': {
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
                'base/wordFinder': {
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
                        it('should check if result is the correct English singular noun', function(){
                            wordToGerman.setRandom(0);
                            expect(wordToGerman.create()).to.equal(true);

                            expect(wordToGerman.checkResult('der Apfel')).to.equal(true);
                            expect(wordToGerman.checkResult('der Administrator')).to.equal(false);
                            expect(wordToGerman.checkResult('die Administratoren')).to.equal(false);
                        });
                        it('should check if result is the correct English plural noun', function(){
                            wordToGerman.setRandom(100);
                            expect(wordToGerman.create()).to.equal(true);

                            expect(wordToGerman.checkResult('die Äpfel')).to.equal(true);
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

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

            context(['game/wordToEnglish'], function (wordToEnglish) {
                describe('game.wordToEnglish - noun', function() {
                    describe('#checkResult()', function() {
                        it('should check if result is the correct English word', function(){
                            expect(wordToEnglish.create()).to.equal(true);
                            expect(wordToEnglish.checkResult('to work')).to.equal(true);
                            expect(wordToEnglish.checkResult('to bring')).to.equal(false);
                        });
                    });

                    describe('#getHtml()', function() {
                        it('should return html', function(){
                            expect(wordToEnglish.create()).to.equal(true);
                            expect(wordToEnglish.getHtml()).to.contain('<h1>');
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

            context(['game/wordToEnglish'], function (wordToEnglish) {
                describe('game.wordToEnglish - verb', function() {
                    describe('#checkResult()', function() {
                        it('should check if result is the correct English word', function(){
                            var results = [];

                            expect(wordToEnglish.create()).to.equal(true);

                            results.push(wordToEnglish.checkResult('apple') ? 'yes' : 'no');
                            results.push(wordToEnglish.checkResult('apples') ? 'yes' : 'no');

                            expect(wordToEnglish.checkResult('admin')).to.equal(false);
                            expect(wordToEnglish.checkResult('admins')).to.equal(false);
                        });
                    });

                    describe('#getHtml()', function() {
                        it('should return html', function(){
                            expect(wordToEnglish.create()).to.equal(true);
                            expect(wordToEnglish.getHtml()).to.contain('<h1>');
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

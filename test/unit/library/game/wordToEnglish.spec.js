define(
    ['vendor/underscore'],
    function (_) {
        var loaded = 0;

        function context1() {
            var stubs, context, verb1, verb2;

            verb1 = {type:'verb', german:"arbeiten", english:"to work"};
            verb2 = {type:'verb', german:"bringen", english:["to bring","to fetch"]};

            stubs = {
                'base/wordFinder': {
                    getWord: sinon.stub().returns(verb1),
                    getRandomWord: sinon.stub().returns(verb2)
                }
            };

            context = requireHelper.createContext(stubs, _);

            context(['game/wordToEnglish'], function (wordToEnglish) {
                describe('game/wordToEnglish - verb', function() {
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

                    describe('#getUsedWords()', function() {
                        it('should return selected word in an array', function(){
                            expect(wordToEnglish.getUsedWords()).to.eql([verb1]);
                        });
                    });

                    describe('#getAnswer()', function() {
                        it('should return article of selected word', function(){
                            expect(wordToEnglish.getAnswer()).to.eql(verb1.english);
                        });
                    });

                    describe('#getHelp()', function() {
                        it('should return original word', function(){
                            expect(wordToEnglish.getHelp()).to.equal('');
                        });
                    });
                });

                loaded++
            });
        }


        function context2() {
            var stubs, context, noun1, noun2;

            noun1 = {type:'noun', article:"der", plural:"⍨", german:"Apfel", english:"apple"};
            noun2 = {type:'noun', article:"der", plural:"~en", german:"Administrator", english:"admin"};

            stubs = {
                'base/wordFinder': {
                    getWord: sinon.stub().returns(noun1),
                    getRandomWord: sinon.stub().returns(noun2)
                },
                germanNoun: {
                    getPlural: function(german) {
                        return german=='Apfel' ? 'Äpfel' : 'Administratoren';
                    }
                },
                englishNoun: {
                    getPlural: function(english) {
                        return english=='apple' ? 'apples' : 'admins';
                    }
                }

            };

            context = requireHelper.createContext(stubs, _);

            context(['game/wordToEnglish'], function (wordToEnglish) {
                describe('game/wordToEnglish - noun', function() {
                    describe('#getHtml()', function() {
                        it('should return html', function(){
                            wordToEnglish.setRandom(0);
                            expect(wordToEnglish.create()).to.equal(true);
                            expect(wordToEnglish.getHtml()).to.contain('<h1>');
                        });
                    });

                    describe('#checkResult()', function() {
                        it('should check if result is the correct English singular noun', function(){
                            wordToEnglish.setRandom(0);
                            expect(wordToEnglish.create()).to.equal(true);

                            expect(wordToEnglish.checkResult('the apple')).to.equal(true);
                            expect(wordToEnglish.checkResult('the admin')).to.equal(false);
                            expect(wordToEnglish.checkResult('the admins')).to.equal(false);
                        });
                        it('should check if result is the correct English plural noun', function(){
                            wordToEnglish.setRandom(100);
                            expect(wordToEnglish.create()).to.equal(true);

                            expect(wordToEnglish.checkResult('the apples')).to.equal(true);
                            expect(wordToEnglish.checkResult('the admin')).to.equal(false);
                            expect(wordToEnglish.checkResult('the admins')).to.equal(false);
                        });
                    });

                    describe('#getUsedWords()', function() {
                        it('should return html', function(){
                            wordToEnglish.setRandom(0);
                            expect(wordToEnglish.create()).to.equal(true);
                            expect(wordToEnglish.getUsedWords()).to.eql([noun1]);
                        });
                    });

                    describe('#getAnswer()', function() {
                        it('should return article of selected word', function(){
                            wordToEnglish.setRandom(0);
                            expect(wordToEnglish.create()).to.equal(true);
                            expect(wordToEnglish.getAnswer()).to.eql('the ' + noun1.english);
                        });
                    });

                    describe('#getHelp()', function() {
                        it('should return original word', function(){
                            wordToEnglish.setRandom(0);
                            expect(wordToEnglish.create()).to.equal(true);
                            expect(wordToEnglish.getHelp()).to.equal('');
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

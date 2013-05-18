define(
    ['vendor/underscore', 'vendor/jquery'],
    function (_, $) {
        var stubs, context, loaded = false, $stub = $('<div />');

        stubs = {
            'helper/dom': {
                get: function(){
                    return $stub;
                },
                getCached: function(){
                    return $stub;
                },
                clearCached: function(){
                    return $stub;
                },
                getDocument: function(){
                    return $stub;
                },
                getWindow: function(){
                    return $stub;
                }
            }
        };

        context = requireHelper.createContext(stubs, _);

        context(['base/gui'], function (gui) {
            describe('base/gui', function() {
                beforeEach(function(){
                    $stub.empty();
                });

                describe('#displayGame()', function() {
                    it('should attach html to center dom element', function(){
                        var html = '<h1>Hello</h1>';

                        gui.displayGame(html);

                        expect($stub.html()).to.eql(html);
                    });
                });

                describe('#displayHelp()', function() {
                    var gameHelp = 'Hello', words = ['bye', 'york'];

                    it('should links for used words', function(){
                        gui.displayHelp('', []);

                        expect($stub.html()).to.equal('<h2>Help</h2>');
                    });

                    it('should attach html to help element', function(){
                        gui.displayHelp(gameHelp, []);

                        expect($stub.html()).to.contain(gameHelp);
                        expect($stub.html()).to.contain('game-help');
                    });

                    it('should links for used words', function(){
                        gui.displayHelp('', words);

                        expect($('li', $stub.html()).length).to.equal( words.length * 5);
                    });
                });

                describe('#showErrorReportBtn()', function() {
                    var submitContainer, body = $('body');

                    beforeEach(function(){
                        submitContainer = $('<div id="container"><p id="submit" /></div>');
                        body.append(submitContainer);
                    });

                    afterEach(function(){
                        submitContainer.remove();
                    });

                    it('should attach div to submit container', function(){
                        gui.showErrorReportBtn();

                        expect($('div', submitContainer).length).to.equal(1);
                    });

                    it('should add href to created link', function(){
                        gui.showErrorReportBtn();

                        expect($('div', submitContainer).attr('href')).to.contain('https://');
                    });
                });

                describe('#updateStats()', function() {
                    it('should create a table', function(){
                        gui.updateStats([]);

                        expect($('thead', $stub).length).to.equal(1);
                        expect($('tbody', $stub).length).to.equal(1);
                        expect($('tbody', $stub).html()).to.equal('');
                        expect($('tfoot', $stub).length).to.equal(0);
                    });

                    it('should create rows for stats', function(){
                        var stats = [23, 42];

                        gui.updateStats(stats);

                        expect($('thead', $stub).length).to.equal(1);
                        expect($('tbody', $stub).length).to.equal(1);
                        expect($('tbody tr', $stub).length).to.equal(2);
                        expect($('tfoot', $stub).length).to.equal(1);
                    });
                });

                describe('#displayPage()', function() {
                    it('should display the html given only', function(){
                        var html = '<div>Hello</div>';

                        gui.displayPage(html);

                        expect($stub.html()).to.equal(html);
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

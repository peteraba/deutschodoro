define(
    ['vendor/underscore'],
    function (_) {
        var stubs, context, loaded = false;


        stubs = {
        };

        context = createContext(stubs, _);

        context(['base/gui'], function (gui) {
            describe('base/gui', function() {
                describe('#displayGame()', function() {
                    it('', function(){
                        expect(gui.displayGame()).to.eql();
                    });
                });

                describe('#displayHelp()', function() {
                    it('', function(){
                        expect(gui.displayHelp()).to.eql();
                    });
                });

                describe('#showErrorReportBtn()', function() {
                    it('', function(){
                        expect(gui.showErrorReportBtn()).to.eql();
                    });
                });

                describe('#updateStats()', function() {
                    it('', function(){
                        expect(gui.updateStats()).to.eql();
                    });
                });

                describe('#displayPage()', function() {
                    it('', function(){
                        expect(gui.displayPage()).to.eql();
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

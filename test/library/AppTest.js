describe('app', function() {
    describe('#run()', function() {
        it('should return true if game is found', function(){
            expect(d3.app.run()).to.be(true);
        });
    });
});

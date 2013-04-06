describe('english.verb', function() {
    describe('#present()', function() {
        it('should return personalized regular verbs', function(){
            expect(d3.english.verb.present('make', 's1')).to.be('make');
            expect(d3.english.verb.present('make', 's2')).to.be('make');
            expect(d3.english.verb.present('make', 's3')).to.be('makes');
            expect(d3.english.verb.present('make', 'p1')).to.be('make');
            expect(d3.english.verb.present('make', 'p2')).to.be('make');
            expect(d3.english.verb.present('make', 'p3')).to.be('make');

            expect(d3.english.verb.present('do', 's1')).to.be('do');
            expect(d3.english.verb.present('do', 's2')).to.be('do');
            expect(d3.english.verb.present('do', 's3')).to.be('does');
            expect(d3.english.verb.present('do', 'p1')).to.be('do');
            expect(d3.english.verb.present('do', 'p2')).to.be('do');
            expect(d3.english.verb.present('do', 'p3')).to.be('do');

            expect(d3.english.verb.present('cry', 's1')).to.be('cry');
            expect(d3.english.verb.present('cry', 's2')).to.be('cry');
            expect(d3.english.verb.present('cry', 's3')).to.be('cries');
            expect(d3.english.verb.present('cry', 'p1')).to.be('cry');
            expect(d3.english.verb.present('cry', 'p2')).to.be('cry');
            expect(d3.english.verb.present('cry', 'p3')).to.be('cry');
        });

        it('should return personalized irregular verbs', function(){
            expect(d3.english.verb.present('be', 's1')).to.be('am');
            expect(d3.english.verb.present('be', 's2')).to.be('are');
            expect(d3.english.verb.present('be', 's3')).to.be('is');
            expect(d3.english.verb.present('be', 'p1')).to.be('are');
            expect(d3.english.verb.present('be', 'p2')).to.be('are');
            expect(d3.english.verb.present('be', 'p3')).to.be('are');

            expect(d3.english.verb.present('have', 's1')).to.be('have');
            expect(d3.english.verb.present('have', 's2')).to.be('have');
            expect(d3.english.verb.present('have', 's3')).to.be('has');
            expect(d3.english.verb.present('have', 'p1')).to.be('have');
            expect(d3.english.verb.present('have', 'p2')).to.be('have');
            expect(d3.english.verb.present('have', 'p3')).to.be('have');
        });
    });
});

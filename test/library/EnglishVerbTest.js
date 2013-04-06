describe('EnglishVerb', function() {
    describe('#present()', function() {
        it('should return personalized regular verbs', function(){
            expect(d3.englishVerb.present('make', 's1')).to.be('make');
            expect(d3.englishVerb.present('make', 's2')).to.be('make');
            expect(d3.englishVerb.present('make', 's3')).to.be('makes');
            expect(d3.englishVerb.present('make', 'p1')).to.be('make');
            expect(d3.englishVerb.present('make', 'p2')).to.be('make');
            expect(d3.englishVerb.present('make', 'p3')).to.be('make');

            expect(d3.englishVerb.present('do', 's1')).to.be('do');
            expect(d3.englishVerb.present('do', 's2')).to.be('do');
            expect(d3.englishVerb.present('do', 's3')).to.be('does');
            expect(d3.englishVerb.present('do', 'p1')).to.be('do');
            expect(d3.englishVerb.present('do', 'p2')).to.be('do');
            expect(d3.englishVerb.present('do', 'p3')).to.be('do');

            expect(d3.englishVerb.present('cry', 's1')).to.be('cry');
            expect(d3.englishVerb.present('cry', 's2')).to.be('cry');
            expect(d3.englishVerb.present('cry', 's3')).to.be('cries');
            expect(d3.englishVerb.present('cry', 'p1')).to.be('cry');
            expect(d3.englishVerb.present('cry', 'p2')).to.be('cry');
            expect(d3.englishVerb.present('cry', 'p3')).to.be('cry');
        });

        it('should return personalized irregular verbs', function(){
            expect(d3.englishVerb.present('be', 's1')).to.be('am');
            expect(d3.englishVerb.present('be', 's2')).to.be('are');
            expect(d3.englishVerb.present('be', 's3')).to.be('is');
            expect(d3.englishVerb.present('be', 'p1')).to.be('are');
            expect(d3.englishVerb.present('be', 'p2')).to.be('are');
            expect(d3.englishVerb.present('be', 'p3')).to.be('are');

            expect(d3.englishVerb.present('have', 's1')).to.be('have');
            expect(d3.englishVerb.present('have', 's2')).to.be('have');
            expect(d3.englishVerb.present('have', 's3')).to.be('has');
            expect(d3.englishVerb.present('have', 'p1')).to.be('have');
            expect(d3.englishVerb.present('have', 'p2')).to.be('have');
            expect(d3.englishVerb.present('have', 'p3')).to.be('have');
        });
    });
});

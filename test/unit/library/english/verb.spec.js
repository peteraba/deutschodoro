define(
    ['english/verb'],
    function(englishVerb) {
        describe('english.verb', function() {
            describe('#present()', function() {
                it('should return personalized regular verbs', function(){
                    expect(englishVerb.present('make', 's1')).to.equal('make');
                    expect(englishVerb.present('make', 's2')).to.equal('make');
                    expect(englishVerb.present('make', 's3')).to.equal('makes');
                    expect(englishVerb.present('make', 'p1')).to.equal('make');
                    expect(englishVerb.present('make', 'p2')).to.equal('make');
                    expect(englishVerb.present('make', 'p3')).to.equal('make');

                    expect(englishVerb.present('do', 's1')).to.equal('do');
                    expect(englishVerb.present('do', 's2')).to.equal('do');
                    expect(englishVerb.present('do', 's3')).to.equal('does');
                    expect(englishVerb.present('do', 'p1')).to.equal('do');
                    expect(englishVerb.present('do', 'p2')).to.equal('do');
                    expect(englishVerb.present('do', 'p3')).to.equal('do');

                    expect(englishVerb.present('cry', 's1')).to.equal('cry');
                    expect(englishVerb.present('cry', 's2')).to.equal('cry');
                    expect(englishVerb.present('cry', 's3')).to.equal('cries');
                    expect(englishVerb.present('cry', 'p1')).to.equal('cry');
                    expect(englishVerb.present('cry', 'p2')).to.equal('cry');
                    expect(englishVerb.present('cry', 'p3')).to.equal('cry');
                });

                it('should return personalized irregular verbs', function(){
                    expect(englishVerb.present('be', 's1')).to.equal('am');
                    expect(englishVerb.present('be', 's2')).to.equal('are');
                    expect(englishVerb.present('be', 's3')).to.equal('is');
                    expect(englishVerb.present('be', 'p1')).to.equal('are');
                    expect(englishVerb.present('be', 'p2')).to.equal('are');
                    expect(englishVerb.present('be', 'p3')).to.equal('are');

                    expect(englishVerb.present('have', 's1')).to.equal('have');
                    expect(englishVerb.present('have', 's2')).to.equal('have');
                    expect(englishVerb.present('have', 's3')).to.equal('has');
                    expect(englishVerb.present('have', 'p1')).to.equal('have');
                    expect(englishVerb.present('have', 'p2')).to.equal('have');
                    expect(englishVerb.present('have', 'p3')).to.equal('have');
                });
            });
        });
    }
);

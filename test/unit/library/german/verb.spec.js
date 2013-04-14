define(
    ['german/verb'],
    function(germanVerb) {
        describe('german.verb', function() {
            describe('#present()', function() {
                it('should return personalized irregular verbs', function(){
                    var sein = ['bin','bist','ist','sind','seid','sind'];

                    expect(germanVerb.present('sein', 's1', 'ir', sein)).to.equal(sein[0]);
                    expect(germanVerb.present('sein', 's2', 'ir', sein)).to.equal(sein[1]);
                    expect(germanVerb.present('sein', 's3', 'ir', sein)).to.equal(sein[2]);
                    expect(germanVerb.present('sein', 'p1', 'ir', sein)).to.equal(sein[3]);
                    expect(germanVerb.present('sein', 'p2', 'ir', sein)).to.equal(sein[4]);
                    expect(germanVerb.present('sein', 'p3', 'ir', sein)).to.equal(sein[5]);
                });

                it('should throw exception on irregular verbs with no explicit present list given', function(){
                    try {
                        germanVerb.present('sein', 'p3', 'ir');
                        expect().fail();
                    } catch (e) {

                    }
                });

                it('should return personalized weak verbs', function(){
                    expect(germanVerb.present('brauchen', 's1', 'w')).to.equal('brauche');
                    expect(germanVerb.present('brauchen', 's2', 'w')).to.equal('brauchst');
                    expect(germanVerb.present('brauchen', 's3', 'w')).to.equal('braucht');
                    expect(germanVerb.present('brauchen', 'p1', 'w')).to.equal('brauchen');
                    expect(germanVerb.present('brauchen', 'p2', 'w')).to.equal('braucht');
                    expect(germanVerb.present('brauchen', 'p3', 'w')).to.equal('brauchen');
                });

                it('should return personalized strong 1 verbs', function(){
                    expect(germanVerb.present('schreiben', 's1', 's1')).to.equal('schreibe');
                    expect(germanVerb.present('schreiben', 's2', 's1')).to.equal('schreibst');
                    expect(germanVerb.present('schreiben', 's3', 's1')).to.equal('schreibt');
                    expect(germanVerb.present('schreiben', 'p1', 's1')).to.equal('schreiben');
                    expect(germanVerb.present('schreiben', 'p2', 's1')).to.equal('schreibt');
                    expect(germanVerb.present('schreiben', 'p3', 's1')).to.equal('schreiben');
                });

                it('should return personalized strong 3 verbs', function(){
                    expect(germanVerb.present('beginnen', 's1', 's3')).to.equal('beginne');
                    expect(germanVerb.present('beginnen', 's2', 's3')).to.equal('beginnst');
                    expect(germanVerb.present('beginnen', 's3', 's3')).to.equal('beginnt');
                    expect(germanVerb.present('beginnen', 'p1', 's3')).to.equal('beginnen');
                    expect(germanVerb.present('beginnen', 'p2', 's3')).to.equal('beginnt');
                    expect(germanVerb.present('beginnen', 'p3', 's3')).to.equal('beginnen');

                    expect(germanVerb.present('bergen', 's1', 's3')).to.equal('berge');
                    expect(germanVerb.present('bergen', 's2', 's3')).to.equal('birgst');
                    expect(germanVerb.present('bergen', 's3', 's3')).to.equal('birgt');
                    expect(germanVerb.present('bergen', 'p1', 's3')).to.equal('bergen');
                    expect(germanVerb.present('bergen', 'p2', 's3')).to.equal('bergt');
                    expect(germanVerb.present('bergen', 'p3', 's3')).to.equal('bergen');

                    expect(germanVerb.present('aussterben', 's1', 's3')).to.equal('aussterbe');
                    expect(germanVerb.present('aussterben', 's2', 's3')).to.equal('ausstirbst');
                    expect(germanVerb.present('aussterben', 's3', 's3')).to.equal('ausstirbt');
                    expect(germanVerb.present('aussterben', 'p1', 's3')).to.equal('aussterben');
                    expect(germanVerb.present('aussterben', 'p2', 's3')).to.equal('aussterbt');
                    expect(germanVerb.present('aussterben', 'p3', 's3')).to.equal('aussterben');

                    expect(germanVerb.present('quellen', 's1', 's3')).to.equal('quelle');
                    expect(germanVerb.present('quellen', 's2', 's3')).to.equal('quillst');
                    expect(germanVerb.present('quellen', 's3', 's3')).to.equal('quillt');
                    expect(germanVerb.present('quellen', 'p1', 's3')).to.equal('quellen');
                    expect(germanVerb.present('quellen', 'p2', 's3')).to.equal('quellt');
                    expect(germanVerb.present('quellen', 'p3', 's3')).to.equal('quellen');
                });

                it('should return personalized strong 4 verbs', function(){
                    expect(germanVerb.present('bergen', 's1', 's4')).to.equal('berge');
                    expect(germanVerb.present('bergen', 's2', 's4')).to.equal('birgst');
                    expect(germanVerb.present('bergen', 's3', 's4')).to.equal('birgt');
                    expect(germanVerb.present('bergen', 'p1', 's4')).to.equal('bergen');
                    expect(germanVerb.present('bergen', 'p2', 's4')).to.equal('bergt');
                    expect(germanVerb.present('bergen', 'p3', 's4')).to.equal('bergen');

                    expect(germanVerb.present('gebären', 's1', 's4')).to.equal('gebäre');
                    expect(germanVerb.present('gebären', 's2', 's4')).to.equal('gebierst');
                    expect(germanVerb.present('gebären', 's3', 's4')).to.equal('gebiert');
                    expect(germanVerb.present('gebären', 'p1', 's4')).to.equal('gebären');
                    expect(germanVerb.present('gebären', 'p2', 's4')).to.equal('gebärt');
                    expect(germanVerb.present('gebären', 'p3', 's4')).to.equal('gebären');
                });

                it('should return personalized strong 5 verbs', function(){
                    expect(germanVerb.present('essen', 's1', 's5')).to.equal('esse');
                    expect(germanVerb.present('essen', 's2', 's5')).to.equal('isst');
                    expect(germanVerb.present('essen', 's3', 's5')).to.equal('isst');
                    expect(germanVerb.present('essen', 'p1', 's5')).to.equal('essen');
                    expect(germanVerb.present('essen', 'p2', 's5')).to.equal('esst');
                    expect(germanVerb.present('essen', 'p3', 's5')).to.equal('essen');

                    expect(germanVerb.present('lesen', 's1', 's5', 'e->ie')).to.equal('lese');
                    expect(germanVerb.present('lesen', 's2', 's5', 'e->ie')).to.equal('liest');
                    expect(germanVerb.present('lesen', 's3', 's5', 'e->ie')).to.equal('liest');
                    expect(germanVerb.present('lesen', 'p1', 's5', 'e->ie')).to.equal('lesen');
                    expect(germanVerb.present('lesen', 'p2', 's5', 'e->ie')).to.equal('lest');
                    expect(germanVerb.present('lesen', 'p3', 's5', 'e->ie')).to.equal('lesen');

                    expect(germanVerb.present('liegen', 's1', 's5')).to.equal('liege');
                    expect(germanVerb.present('liegen', 's2', 's5')).to.equal('liegst');
                    expect(germanVerb.present('liegen', 's3', 's5')).to.equal('liegt');
                    expect(germanVerb.present('liegen', 'p1', 's5')).to.equal('liegen');
                    expect(germanVerb.present('liegen', 'p2', 's5')).to.equal('liegt');
                    expect(germanVerb.present('liegen', 'p3', 's5')).to.equal('liegen');
                });

                it('should return personalized strong 7 verbs', function(){
                    expect(germanVerb.present('erhalten', 's1', 's7')).to.equal('erhalte');
                    expect(germanVerb.present('erhalten', 's2', 's7')).to.equal('erhältst');
                    expect(germanVerb.present('erhalten', 's3', 's7')).to.equal('erhält');
                    expect(germanVerb.present('erhalten', 'p1', 's7')).to.equal('erhalten');
                    expect(germanVerb.present('erhalten', 'p2', 's7')).to.equal('erhaltet');
                    expect(germanVerb.present('erhalten', 'p3', 's7')).to.equal('erhalten');

                    expect(germanVerb.present('laufen', 's1', 's7')).to.equal('laufe');
                    expect(germanVerb.present('laufen', 's2', 's7')).to.equal('läufst');
                    expect(germanVerb.present('laufen', 's3', 's7')).to.equal('läuft');
                    expect(germanVerb.present('laufen', 'p1', 's7')).to.equal('laufen');
                    expect(germanVerb.present('laufen', 'p2', 's7')).to.equal('lauft');
                    expect(germanVerb.present('laufen', 'p3', 's7')).to.equal('laufen');

                    expect(germanVerb.present('hängen', 's1', 's7')).to.equal('hänge');
                    expect(germanVerb.present('hängen', 's2', 's7')).to.equal('hängst');
                    expect(germanVerb.present('hängen', 's3', 's7')).to.equal('hängt');
                    expect(germanVerb.present('hängen', 'p1', 's7')).to.equal('hängen');
                    expect(germanVerb.present('hängen', 'p2', 's7')).to.equal('hängt');
                    expect(germanVerb.present('hängen', 'p3', 's7')).to.equal('hängen');
                });

                it('should return handle exceptions if given', function(){
                    var lesen = ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'];

                    expect(germanVerb.present('lesen', 's1', 'w', lesen)).to.equal('lese');
                    expect(germanVerb.present('lesen', 's2', 'w', lesen)).to.equal('liest');
                    expect(germanVerb.present('lesen', 's3', 'w', lesen)).to.equal('liest');
                    expect(germanVerb.present('lesen', 'p1', 'w', lesen)).to.equal('lesen');
                    expect(germanVerb.present('lesen', 'p2', 'w', lesen)).to.equal('lest');
                    expect(germanVerb.present('lesen', 'p3', 'w', lesen)).to.equal('lesen');
                });
            });
        });
    }
);

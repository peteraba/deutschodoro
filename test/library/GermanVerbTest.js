describe('GermanVerb', function() {
    describe('#present()', function() {
        it('should return personalized irregular verbs', function(){
            var sein = ['bin','bist','ist','sind','seid','sind'];

            expect(d3.germanVerb.present('sein', 's1', 'ir', sein)).to.be(sein[0]);
            expect(d3.germanVerb.present('sein', 's2', 'ir', sein)).to.be(sein[1]);
            expect(d3.germanVerb.present('sein', 's3', 'ir', sein)).to.be(sein[2]);
            expect(d3.germanVerb.present('sein', 'p1', 'ir', sein)).to.be(sein[3]);
            expect(d3.germanVerb.present('sein', 'p2', 'ir', sein)).to.be(sein[4]);
            expect(d3.germanVerb.present('sein', 'p3', 'ir', sein)).to.be(sein[5]);
        });

        it('should throw exception on irregular verbs with no explicit present list given', function(){
            try {
                d3.germanVerb.present('sein', 'p3', 'ir');
                expect().fail();
            } catch (e) {

            }
        });

        it('should return personalized weak verbs', function(){
            expect(d3.germanVerb.present('brauchen', 's1', 'w')).to.be('brauche');
            expect(d3.germanVerb.present('brauchen', 's2', 'w')).to.be('brauchst');
            expect(d3.germanVerb.present('brauchen', 's3', 'w')).to.be('braucht');
            expect(d3.germanVerb.present('brauchen', 'p1', 'w')).to.be('brauchen');
            expect(d3.germanVerb.present('brauchen', 'p2', 'w')).to.be('braucht');
            expect(d3.germanVerb.present('brauchen', 'p3', 'w')).to.be('brauchen');
        });

        it('should return personalized strong 1 verbs', function(){
            expect(d3.germanVerb.present('schreiben', 's1', 's1')).to.be('schreibe');
            expect(d3.germanVerb.present('schreiben', 's2', 's1')).to.be('schreibst');
            expect(d3.germanVerb.present('schreiben', 's3', 's1')).to.be('schreibt');
            expect(d3.germanVerb.present('schreiben', 'p1', 's1')).to.be('schreiben');
            expect(d3.germanVerb.present('schreiben', 'p2', 's1')).to.be('schreibt');
            expect(d3.germanVerb.present('schreiben', 'p3', 's1')).to.be('schreiben');
        });

        it('should return personalized strong 3 verbs', function(){
            expect(d3.germanVerb.present('beginnen', 's1', 's3')).to.be('beginne');
            expect(d3.germanVerb.present('beginnen', 's2', 's3')).to.be('beginnst');
            expect(d3.germanVerb.present('beginnen', 's3', 's3')).to.be('beginnt');
            expect(d3.germanVerb.present('beginnen', 'p1', 's3')).to.be('beginnen');
            expect(d3.germanVerb.present('beginnen', 'p2', 's3')).to.be('beginnt');
            expect(d3.germanVerb.present('beginnen', 'p3', 's3')).to.be('beginnen');

            expect(d3.germanVerb.present('bergen', 's1', 's3')).to.be('berge');
            expect(d3.germanVerb.present('bergen', 's2', 's3')).to.be('birgst');
            expect(d3.germanVerb.present('bergen', 's3', 's3')).to.be('birgt');
            expect(d3.germanVerb.present('bergen', 'p1', 's3')).to.be('bergen');
            expect(d3.germanVerb.present('bergen', 'p2', 's3')).to.be('bergt');
            expect(d3.germanVerb.present('bergen', 'p3', 's3')).to.be('bergen');

            expect(d3.germanVerb.present('aussterben', 's1', 's3')).to.be('aussterbe');
            expect(d3.germanVerb.present('aussterben', 's2', 's3')).to.be('ausstirbst');
            expect(d3.germanVerb.present('aussterben', 's3', 's3')).to.be('ausstirbt');
            expect(d3.germanVerb.present('aussterben', 'p1', 's3')).to.be('aussterben');
            expect(d3.germanVerb.present('aussterben', 'p2', 's3')).to.be('aussterbt');
            expect(d3.germanVerb.present('aussterben', 'p3', 's3')).to.be('aussterben');

            expect(d3.germanVerb.present('quellen', 's1', 's3')).to.be('quelle');
            expect(d3.germanVerb.present('quellen', 's2', 's3')).to.be('quillst');
            expect(d3.germanVerb.present('quellen', 's3', 's3')).to.be('quillt');
            expect(d3.germanVerb.present('quellen', 'p1', 's3')).to.be('quellen');
            expect(d3.germanVerb.present('quellen', 'p2', 's3')).to.be('quellt');
            expect(d3.germanVerb.present('quellen', 'p3', 's3')).to.be('quellen');
        });

        it('should return personalized strong 4 verbs', function(){
            expect(d3.germanVerb.present('bergen', 's1', 's4')).to.be('berge');
            expect(d3.germanVerb.present('bergen', 's2', 's4')).to.be('birgst');
            expect(d3.germanVerb.present('bergen', 's3', 's4')).to.be('birgt');
            expect(d3.germanVerb.present('bergen', 'p1', 's4')).to.be('bergen');
            expect(d3.germanVerb.present('bergen', 'p2', 's4')).to.be('bergt');
            expect(d3.germanVerb.present('bergen', 'p3', 's4')).to.be('bergen');

            expect(d3.germanVerb.present('gebären', 's1', 's4')).to.be('gebäre');
            expect(d3.germanVerb.present('gebären', 's2', 's4')).to.be('gebierst');
            expect(d3.germanVerb.present('gebären', 's3', 's4')).to.be('gebiert');
            expect(d3.germanVerb.present('gebären', 'p1', 's4')).to.be('gebären');
            expect(d3.germanVerb.present('gebären', 'p2', 's4')).to.be('gebärt');
            expect(d3.germanVerb.present('gebären', 'p3', 's4')).to.be('gebären');
        });

        it('should return personalized strong 5 verbs', function(){
            expect(d3.germanVerb.present('essen', 's1', 's5')).to.be('esse');
            expect(d3.germanVerb.present('essen', 's2', 's5')).to.be('isst');
            expect(d3.germanVerb.present('essen', 's3', 's5')).to.be('isst');
            expect(d3.germanVerb.present('essen', 'p1', 's5')).to.be('essen');
            expect(d3.germanVerb.present('essen', 'p2', 's5')).to.be('esst');
            expect(d3.germanVerb.present('essen', 'p3', 's5')).to.be('essen');

            expect(d3.germanVerb.present('lesen', 's1', 's5', 'e->ie')).to.be('lese');
            expect(d3.germanVerb.present('lesen', 's2', 's5', 'e->ie')).to.be('liest');
            expect(d3.germanVerb.present('lesen', 's3', 's5', 'e->ie')).to.be('liest');
            expect(d3.germanVerb.present('lesen', 'p1', 's5', 'e->ie')).to.be('lesen');
            expect(d3.germanVerb.present('lesen', 'p2', 's5', 'e->ie')).to.be('lest');
            expect(d3.germanVerb.present('lesen', 'p3', 's5', 'e->ie')).to.be('lesen');

            expect(d3.germanVerb.present('liegen', 's1', 's5')).to.be('liege');
            expect(d3.germanVerb.present('liegen', 's2', 's5')).to.be('liegst');
            expect(d3.germanVerb.present('liegen', 's3', 's5')).to.be('liegt');
            expect(d3.germanVerb.present('liegen', 'p1', 's5')).to.be('liegen');
            expect(d3.germanVerb.present('liegen', 'p2', 's5')).to.be('liegt');
            expect(d3.germanVerb.present('liegen', 'p3', 's5')).to.be('liegen');
        });

        it('should return personalized strong 7 verbs', function(){
            expect(d3.germanVerb.present('erhalten', 's1', 's7')).to.be('erhalte');
            expect(d3.germanVerb.present('erhalten', 's2', 's7')).to.be('erhältst');
            expect(d3.germanVerb.present('erhalten', 's3', 's7')).to.be('erhält');
            expect(d3.germanVerb.present('erhalten', 'p1', 's7')).to.be('erhalten');
            expect(d3.germanVerb.present('erhalten', 'p2', 's7')).to.be('erhaltet');
            expect(d3.germanVerb.present('erhalten', 'p3', 's7')).to.be('erhalten');

            expect(d3.germanVerb.present('laufen', 's1', 's7')).to.be('laufe');
            expect(d3.germanVerb.present('laufen', 's2', 's7')).to.be('läufst');
            expect(d3.germanVerb.present('laufen', 's3', 's7')).to.be('läuft');
            expect(d3.germanVerb.present('laufen', 'p1', 's7')).to.be('laufen');
            expect(d3.germanVerb.present('laufen', 'p2', 's7')).to.be('lauft');
            expect(d3.germanVerb.present('laufen', 'p3', 's7')).to.be('laufen');

            expect(d3.germanVerb.present('hängen', 's1', 's7')).to.be('hänge');
            expect(d3.germanVerb.present('hängen', 's2', 's7')).to.be('hängst');
            expect(d3.germanVerb.present('hängen', 's3', 's7')).to.be('hängt');
            expect(d3.germanVerb.present('hängen', 'p1', 's7')).to.be('hängen');
            expect(d3.germanVerb.present('hängen', 'p2', 's7')).to.be('hängt');
            expect(d3.germanVerb.present('hängen', 'p3', 's7')).to.be('hängen');
        });

        it('should return handle exceptions if given', function(){
            var lesen = ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'];

            expect(d3.germanVerb.present('lesen', 's1', 's5', lesen)).to.be('lese');
            expect(d3.germanVerb.present('lesen', 's2', 's5', lesen)).to.be('liest');
            expect(d3.germanVerb.present('lesen', 's3', 's5', lesen)).to.be('liest');
            expect(d3.germanVerb.present('lesen', 'p1', 's5', lesen)).to.be('lesen');
            expect(d3.germanVerb.present('lesen', 'p2', 's5', lesen)).to.be('lest');
            expect(d3.germanVerb.present('lesen', 'p3', 's5', lesen)).to.be('lesen');
        });
    });
});

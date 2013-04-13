describe('helper.german', function() {
    describe('#modify()', function() {
        it('should return modified word only if it does not start with a tilde', function(){
            expect(d3.helper.german.modifyWord('praktisch', 'meest praktisch')).to.be('meest praktisch');
            expect(d3.helper.german.modifyWord('viel', 'meisten')).to.be('meisten');
        });
        it('should return concatenated base and modified words without tilde when it starts with a tilde', function(){
            expect(d3.helper.german.modifyWord('persönlich', '~sten')).to.be('persönlichsten');
            expect(d3.helper.german.modifyWord('Mädchen', '~')).to.be('Mädchen');
        });
        it('should return a concatenated word of umlauted base and unchanged modified words without tilde when it starts with an umlauted tilde', function(){
            expect(d3.helper.german.modifyWord('Gaste', '⍨')).to.be('Gäste');
            expect(d3.helper.german.modifyWord('hoch', '⍨sten')).to.be('höchsten');
            expect(d3.helper.german.modifyWord('jung', '⍨sten')).to.be('jüngsten');
            expect(d3.helper.german.modifyWord('Apfel', '⍨')).to.be('Äpfel');
            expect(d3.helper.german.modifyWord('Haus', '⍨er')).to.be('Häuser');
            expect(d3.helper.german.modifyWord('Raum', '⍨e')).to.be('Räume');
            expect(d3.helper.german.modifyWord('Umzug', '⍨e')).to.be('Umzüge');
            expect(d3.helper.german.modifyWord('Maus', '⍨e')).to.be('Mäuse');
        });
    });
});

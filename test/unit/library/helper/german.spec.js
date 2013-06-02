define(
    ['helper/german'],
    function(germanHelper) {
        describe('helper/german', function() {
            describe('#modify()', function() {
                it('should return modified word only if it does not start with a tilde', function(){
                    expect(germanHelper.modifyWord('praktisch', 'meest praktisch')).to.equal('meest praktisch');
                    expect(germanHelper.modifyWord('viel', 'meisten')).to.equal('meisten');
                });
                it('should return concatenated base and modified words without tilde when it starts with a tilde', function(){
                    expect(germanHelper.modifyWord('persönlich', '~sten')).to.equal('persönlichsten');
                    expect(germanHelper.modifyWord('Mädchen', '~')).to.equal('Mädchen');
                });
                it('should return a concatenated word of umlauted base and unchanged modified words without tilde when it starts with an umlauted tilde', function(){
                    expect(germanHelper.modifyWord('Gaste', '⍨')).to.equal('Gäste');
                    expect(germanHelper.modifyWord('hoch', '⍨sten')).to.equal('höchsten');
                    expect(germanHelper.modifyWord('jung', '⍨sten')).to.equal('jüngsten');
                    expect(germanHelper.modifyWord('Apfel', '⍨')).to.equal('Äpfel');
                    expect(germanHelper.modifyWord('Haus', '⍨er')).to.equal('Häuser');
                    expect(germanHelper.modifyWord('Raum', '⍨e')).to.equal('Räume');
                    expect(germanHelper.modifyWord('Umzug', '⍨e')).to.equal('Umzüge');
                    expect(germanHelper.modifyWord('Maus', '⍨e')).to.equal('Mäuse');
                });
            });
        });

        return {
            isLoaded: function(){return true;}
        }
    }
);

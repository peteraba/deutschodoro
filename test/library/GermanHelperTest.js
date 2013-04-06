describe('GermanHelper', function() {
    var dict = [
        {english: 'eng1', german: 'ger1', type: 'verb'},
        {english: 'eng2', german: 'ger2', type: 'verb'},
        {english: 'eng3', german: 'ger3', type: 'noun'},
        {english: 'eng4', german: 'ger4', type: 'noun'},
        {english: 'eng5', german: 'ger5', type: 'noun'},
        {english: 'eng4', german: 'ger6', type: 'noun'},
        {english: 'eng5', german: 'ger7', type: 'adj'},
        {english: 'eng5', german: 'ger8', type: 'adj'}
    ];

    describe('#modify()', function() {
        it('should return modified word only if it does not start with a tilde', function(){
            expect(d3.germanHelper.modifyWord('praktisch', 'meest praktisch')).to.be('meest praktisch');
            expect(d3.germanHelper.modifyWord('viel', 'meisten')).to.be('meisten');
        });
        it('should return concatenated base and modified words without tilde when it starts with a tilde', function(){
            expect(d3.germanHelper.modifyWord('persönlich', '~sten')).to.be('persönlichsten');
            expect(d3.germanHelper.modifyWord('Mädchen', '~')).to.be('Mädchen');
        });
        it('should return a concatenated word of umlauted base and unchanged modified words without tilde when it starts with an umlauted tilde', function(){
            expect(d3.germanHelper.modifyWord('Gaste', '⍨')).to.be('Gäste');
            expect(d3.germanHelper.modifyWord('hoch', '⍨sten')).to.be('höchsten');
            expect(d3.germanHelper.modifyWord('jung', '⍨sten')).to.be('jüngsten');
            expect(d3.germanHelper.modifyWord('Apfel', '⍨')).to.be('Äpfel');
            expect(d3.germanHelper.modifyWord('Haus', '⍨er')).to.be('Häuser');
            expect(d3.germanHelper.modifyWord('Raum', '⍨e')).to.be('Räume');
            expect(d3.germanHelper.modifyWord('Umzug', '⍨e')).to.be('Umzüge');
            expect(d3.germanHelper.modifyWord('Maus', '⍨e')).to.be('Mäuse');
        });
    });

    describe('#findFirstWord()', function() {
        it('should find the first word matching the search options', function(){
            expect(d3.germanHelper.findFirstWord(dict, {})).to.be(dict[0]);
            expect(d3.germanHelper.findFirstWord(dict, {english: 'eng4'})).to.be(dict[3]);
            expect(d3.germanHelper.findFirstWord(dict, {english: 'eng4', german: 'ger6'})).to.be(dict[5]);
        });
    });

    describe('#findRandomWord()', function() {
        it('should return a random word matching the search options', function(){
            expect(d3.germanHelper.findFirstWord(dict, {english: 'eng4'}).english).to.be('eng4');
            expect(d3.germanHelper.findFirstWord(dict, {english: 'eng4'}).german).to.be.in(['ger4', 'ger6']);
        });
    });
});

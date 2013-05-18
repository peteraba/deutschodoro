define(
    ['helper/english', 'vendor/underscore'],
    function(englishHelper, _) {
        var stubs, context, loaded = false;

        stubs = {
            'helper/english' : englishHelper
        };

        context = requireHelper.createContext(stubs, _);

        context(['english/noun'], function (englishNoun) {
            describe('english/noun', function() {
                describe('#getPlural()', function() {
                    it('should return pluralized nouns', function(){
                        expect(englishNoun.getPlural('table')).to.equal('tables');
                        expect(englishNoun.getPlural('person')).to.equal('people');
                    });
                });

                describe('#getArticle()', function() {
                    it('should return article', function(){
                        expect(englishNoun.getArticle('table', false, 'nom')).to.equal('the');
                        expect(englishNoun.getArticle('table', true, 'nom')).to.equal('a');
                        expect(englishNoun.getArticle('apple', true, 'nom')).to.equal('an');
                        expect(englishNoun.getArticle('apple', true, 'nom')).to.equal('an');

                        expect(englishNoun.getArticle('apple', 'my', 'nom')).to.equal('my');
                        expect(englishNoun.getArticle('apple', 'my', 'dat')).to.equal('mine');
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

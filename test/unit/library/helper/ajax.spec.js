define(
    [],
    function() {
        var stubs, context, loaded = false;

        stubs = {
            'vendor/jquery': {
                'post': sinon.stub()
            }
        };

        context = requireHelper.createContext(stubs, _);

        context(['helper/ajax'], function (ajaxHelper) {
            describe('helper/ajax', function() {
                describe('#vote()', function() {
                    it('should call jQuery post method for set page of given site', function(){
                    });
                });
            });

            loaded = true;
        });


        return {
            isLoaded: function(){return true;}
        }
    }
);
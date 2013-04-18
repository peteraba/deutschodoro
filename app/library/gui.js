define(
    ['vendor/jquery', 'vendor/jquery-layout/jquery.layout-latest.min'],
    function($){

        var loaded = false;

        function init(){
            $(document).ready(function(){
                var $doc = $(document);
                $doc.ready(function () {
                    var layout = $('body').layout({ applyDefaultStyles: true });
                    $(this).data('layout', layout);
                });
                $('#toggler').click(function() {
                    $doc.data('layout').toggle('east');
                });

                loaded = true;
            });
        }

        function isLoaded() {
            return loaded;
        }

        init();

        return {
            isLoaded: isLoaded
        }
    }
);
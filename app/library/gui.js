define(
    ['vendor/jquery', 'vendor/jquery-layout/jquery.layout-latest.min'],
    function($){

        var ready = false, layout, $doc = $(document), $window = $(window), domCache = {};

        function init(){
            layout = $('body').layout({ applyDefaultStyles: true });

            $('#toggler').click(function() {
                layout.toggle('east');
            });

            ready = true;
        }

        function resize(){
            var minEastWidth = Math.min(300, Math.floor($doc.width()/4));

            layout.sizePane("east", minEastWidth);
        }

        function getDom(selector) {
            if (!domCache[selector]) {
                domCache[selector] = $(selector);
            }
            return domCache[selector];
        }

        function isReady() {
            return ready;
        }

        function displayGame(html) {
            if (isReady()) {
                getDom('#center').empty().append(html);
            }
        }

        $doc.ready(function(){
            init();
            $window.resize();
        });

        $window.resize(resize);

        return {
            isReady: isReady,
            displayGame: displayGame
        }
    }
);
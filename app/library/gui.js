define(
    ['vendor/jquery'],
    function($){
        var ready = false, layout, $doc = $(document), $window = $(window), domCache = {};

        function init(){
            $('#toggler').click(function() {
                toggle('#east');
            });

            ready = true;
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

        function toggle(selector) {
            getDom(selector).toggle();
        }

        function resize(){
            var east, width;

            east = getDom('#east');

            if (east.is(":visible")) {
                width = Math.min(300, Math.floor($doc.width()/4));

                east.width(width);
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
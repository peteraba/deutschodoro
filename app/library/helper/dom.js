define(
    ['vendor/jquery'],
    function($){
        var domCache = {};

        function get(selector, base) {
            base = typeof base == 'undefined' ? false : base;

            return base ? $(selector, base) : $(selector);
        }

        function getCached(selector) {
            if (!domCache[selector]) {
                domCache[selector] = $(selector);
            }
            return domCache[selector];
        }

        function clearCached(selector) {
            if (!domCache[selector]) {
                delete domCache[selector];
            }
            return true;
        }

        function getDocument(pure) {
            pure = typeof pure == 'undefined' ? false : pure;

            return pure ? document : $(document);
        }

        function getWindow(pure) {
            pure = typeof pure == 'undefined' ? false : pure;

            return pure ? window : $(window);
        }

        return {
            get: get,
            getCached: getCached,
            clearCached: clearCached,
            getDocument: getDocument,
            getWindow: getWindow
        }
    }
);
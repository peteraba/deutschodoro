requirejs.config({
    baseUrl: '../library',
    paths: {
        vendor: '../../vendor/js',
        dict: '../../dictionary'
    },
    shim: {
        'vendor/jquery-layout/jquery.layout-latest.min': ['vendor/jquery']
    }
});

// Start the main app logic.
requirejs(
    ['vendor/jquery', 'vendor/jquery-layout/jquery.layout-latest.min'],
    function() {
        $(document).ready(function(){
            var $doc = $(document);
            $doc.ready(function () {
                var layout = $('body').layout({ applyDefaultStyles: true });
                $(this).data('layout', layout);
            });
            $('#toggler').click(function() {
                $doc.data('layout').toggle('east');
            });
        });
    }
);

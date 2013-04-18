requirejs.config({
    baseUrl: './app/library',
    paths: {
        vendor: '../../vendor/js',
        controller: '../controller',
        dict: '../../dictionary'
    },
    deps: [
        'vendor/underscore',
        'vendor/jquery'
    ],
    shim: {
        'underscore': {
            exports: '_'
        },
        'vendor/jquery': {
            exports: '$'
        },
        'vendor/jquery-layout/jquery.layout-latest.min': {
            deps: [
                'vendor/jquery'
            ]
        }
    }
    //,urlArgs: "bust=" +  (new Date()).getTime()
});

// Start the main app logic.
require(
    ['controller/main'],
    function(mainController) {
        mainController.indexAction();
    }
);
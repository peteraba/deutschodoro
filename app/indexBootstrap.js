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
        'vendor/underscore': {
            exports: '_'
        },
        'vendor/jquery': {
            exports: '$'
        }
    }
    ,urlArgs: "bust=" +  (new Date()).getTime()
});

// Start the main app logic.
require(
    ['controller/main'],
    function(mainController) {
        mainController.indexAction();
    }
);
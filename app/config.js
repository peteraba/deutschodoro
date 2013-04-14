requirejs.config({
    baseUrl: '.',
    paths: {
        vendor: '../vendor/js',
        dict: '../dictionary',
        unit: '../test/unit'
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
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});
({
    baseUrl: "./app/library",
    paths: {
        vendor: '../../vendor/js',
        controller: '../controller',
        dict: '../../dictionary'
    },
    include: "../settingsBootstrap",
    name: "../../almond",
    out: "build/options.js",
    shim: {
        'vendor/underscore': {
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
})
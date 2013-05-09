({
    baseUrl: "./app/library",
    paths: {
        vendor: '../../vendor/js',
        controller: '../controller',
        dict: '../../dictionary'
    },
    include: "../bootstrap",
    name: "../../almond",
    out: "build/deutschodoro.js",
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
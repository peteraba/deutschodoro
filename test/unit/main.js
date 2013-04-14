requirejs.config({
    baseUrl: '../../app/library',
    paths: {
        vendor: '../../vendor/js',
        dict: '../../dictionary',
        unit: '../../test/unit/library',
        helper: '../../app/library/helper'
    },
    deps: [
        'vendor/underscore',
        'vendor/jquery',
        //'app',
        //'wordFinder',
        'vendor/Squire'
    ],
    //urlArgs: "bust=" +  (new Date()).getTime(),
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
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require([
    'unit/wordFinder.spec',
    'unit/helper/word.spec',
    'unit/helper/english.spec',
    'unit/helper/german.spec',
    'unit/german/noun.spec',
    'unit/german/verb.spec',
    'unit/english/noun.spec',
    'unit/english/verb.spec',
    'unit/game/derDieDas.spec',
    'unit/game/pluralize.spec',
    'unit/game/wordToEnglish.spec',
    'unit/game/wordToGerman.spec'
], function(){
    mocha.run();
});
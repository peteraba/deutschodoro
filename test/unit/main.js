var requireData = {
    baseUrl: '../../app/library',
    paths: {
        vendor: '../../vendor/js',
        unit: '../../test/unit/library',
        dict: '../dictionary',
        helper: '../../app/library/helper'
    },
    deps: [
        'vendor/underscore',
        'vendor/jquery'
    ],
    urlArgs: "bust=" +  (new Date()).getTime(),
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
};

function getTs() {
    return Math.round((new Date()).getTime() / 1000);
}

function checkRequire(args, ts) {
    var i, result, ts2;

    for (i = 0; i < args.length; i++) {
        if (!args[i] || typeof args[i].isLoaded == 'undefined') {
            console.error(i, args[i]);
            continue;
        }
        result = args[i].isLoaded();

        if (!result) {
            break;
        }
    }

    if (result || getTs()-ts > 10) {
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        } else {
            mocha.run();
        }
    } else {
        setTimeout(function(){checkRequire(args, ts);}, 50);
    }
}

function createContext(stubs, _) {
    var map = {}, context, requireData2;

    requireData2 = {
        context: Math.floor(Math.random() * 1000000),
        map: {
            "*": map
        }
    };

    _.each(requireData, function(value, key){
        requireData2[key] = value;
    });

    /**
     * create a new map which will override the path to a given dependencies
     * so if we have a module in m1, requiresjs will look now unter
     * stub_m1
     **/
    _.each(stubs, function (value, key) {
        var stubName = 'stub_' + key;

        map[key] = stubName;
    });

    /**
     * create a new context with the new dependency paths
     **/
    context = require.config(requireData2);

    /**
     * create new definitions that will return our passed stubs or mocks
     **/
    _.each(stubs, function (value, key) {
        var stubname = 'stub_' + key;

        define(stubname, function () {
            return value;
        });
    });

    return context;

}

requirejs.config(requireData);

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require([
    'unit/helper/word.spec',
    'unit/helper/english.spec',
    'unit/helper/german.spec',
    'unit/german/noun.spec',
    'unit/german/verb.spec',
    'unit/english/noun.spec',
    'unit/english/verb.spec',
    'unit/base/games.spec',
    'unit/game/derDieDas.spec',
    'unit/game/pluralize.spec',
    'unit/game/wordToEnglish.spec',
    'unit/game/wordToGerman.spec',
    'unit/base/wordFinder.spec',
    'unit/base/dictionary.spec',
    'unit/base/stat.spec',
    'unit/base/logger.spec',
    'unit/base/timer.spec',
    'unit/base/gui.spec',
    'unit/app.spec',
    'unit/settings/dictionary.spec',
    'unit/settings/mainOptions.spec'
], function(){
    checkRequire(_.toArray(arguments), getTs());
});
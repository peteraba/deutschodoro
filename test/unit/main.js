requirejs.config(requireHelper.getRequireData());

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
    'unit/german/adjective.spec',
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
    requireHelper.checkRequire(_.toArray(arguments), requireHelper.getTs());
});
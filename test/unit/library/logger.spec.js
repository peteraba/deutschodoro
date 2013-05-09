define(
    ['logger'],
    function (logger) {
        var dumbConsole, noFilter, keyFilter, OK = 'ok', FAIL = 'fail';

        dumbConsole = {
            debug: function() {},
            info: function() {},
            log: function() {},
            warn: function() {},
            error: function() {}
        };

        noFilter = function() {return true};
        keyFilter = function(message, key) {return key==OK;};

        logger.setConsole(dumbConsole);

        describe('logger', function() {
            beforeEach(function(){
                logger.setFilter(noFilter);
            });

            describe('#debug()', function() {
                it('should not log by default', function(){
                    logger.setLogLevel(logger.NONE);
                    expect(logger.debug()).to.equal(false);
                });
                it('should log at debug level', function(){
                    logger.setLogLevel(logger.DEBUG);
                    expect(logger.debug()).to.equal(true);
                });
                it('should apply filter', function(){
                    logger.setLogLevel(logger.DEBUG);
                    logger.setFilter(keyFilter);
                    expect(logger.debug('hello', OK)).to.equal(true);
                    expect(logger.debug('hello', FAIL)).to.equal(false);
                });
            });

            describe('#info()', function() {
                it('should not log by default', function(){
                    logger.setLogLevel(logger.NONE);
                    expect(logger.info()).to.equal(false);
                });
                it('should not log at error level', function(){
                    logger.setLogLevel(logger.ERROR);
                    expect(logger.info()).to.equal(false);
                });
                it('should log from info level', function(){
                    logger.setLogLevel(logger.INFO);
                    expect(logger.info()).to.equal(true);
                });
                it('should apply filter', function(){
                    logger.setLogLevel(logger.INFO);
                    logger.setFilter(keyFilter);
                    expect(logger.info('hello', OK)).to.equal(true);
                    expect(logger.info('hello', FAIL)).to.equal(false);
                });
            });

            describe('#log()', function() {
                it('should not log by default', function(){
                    logger.setLogLevel(logger.NONE);
                    expect(logger.log()).to.equal(false);
                });
                it('should not log at error level', function(){
                    logger.setLogLevel(logger.ERROR);
                    expect(logger.log()).to.equal(false);
                });
                it('should log from info level', function(){
                    logger.setLogLevel(logger.INFO);
                    expect(logger.log()).to.equal(true);
                });
                it('should apply filter', function(){
                    logger.setLogLevel(logger.INFO);
                    logger.setFilter(keyFilter);
                    expect(logger.log('hello', OK)).to.equal(true);
                    expect(logger.log('hello', FAIL)).to.equal(false);
                });
            });

            describe('#warn()', function() {
                it('should not log by default', function(){
                    logger.setLogLevel(logger.NONE);
                    expect(logger.warn()).to.equal(false);
                });
                it('should not log at error level', function(){
                    logger.setLogLevel(logger.ERROR);
                    expect(logger.warn()).to.equal(false);
                });
                it('should log from warning level', function(){
                    logger.setLogLevel(logger.WARNING);
                    expect(logger.warn()).to.equal(true);
                });
                it('should apply filter', function(){
                    logger.setLogLevel(logger.WARNING);
                    logger.setFilter(keyFilter);
                    expect(logger.warn('hello', OK)).to.equal(true);
                    expect(logger.warn('hello', FAIL)).to.equal(false);
                });
            });

            describe('#error()', function() {
                it('should not log by default', function(){
                    logger.setLogLevel(logger.NONE);
                    expect(logger.error()).to.equal(false);
                });
                it('should log from error level', function(){
                    logger.setLogLevel(logger.ERROR);
                    expect(logger.error()).to.equal(true);
                });
                it('should apply filter', function(){
                    logger.setLogLevel(logger.ERROR);
                    logger.setFilter(keyFilter);
                    expect(logger.error('hello', OK)).to.equal(true);
                    expect(logger.error('hello', FAIL)).to.equal(false);
                });
            });
        });

        return {
            isLoaded: function(){return true;}
        }
    }
);
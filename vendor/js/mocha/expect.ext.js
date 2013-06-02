

/**
 * Assert in list
 *
 * @param {Array} list
 * @api public
 */

window.expect.Assertion.prototype.in = function (list) {
    var str = '[' + list.join(', ') + ']';
    this.assert(
        list.indexOf(this.obj) > -1
        , function(){ return 'expected ' + this.obj + ' to be in ' + str }
        , function(){ return 'expected ' + this.obj + ' to not be in ' + str });
    return this;
};
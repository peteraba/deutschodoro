d3.germanVerb = (function($, _){
    var verbTypes = {}, prefixes;

    /**
     * @type {Array}
     */
    prefixes = [
        "ab", "an",  "auf", "aus", "be", "bei", "dar", "ein", "ent", "er", "ge", "hin", "nach", "nieder", "über", "um",
        "unter", "ver", "vor", "weg", "wider", "zer", "zu", "zusammen"
    ];

    /**
     *
     * @param {String} p3
     * @return {String}
     */
    function getEnding(p3) {
        return p3.substr(p3.length - 2);
    }

    /**
     *
     * @param {String} p3
     * @return {String}
     */
    function getBase(p3) {
        var ending = getEnding(p3);

        if ('en' == ending) {
            return p3.substr(0, p3.length - 2);
        } else if ('ln' == ending || 'rn' == ending) {
            return p3.substr(0, p3.length - 1);
        }

        throw new Exception('Unable to define base for: `' + p3 + '`');
    }

    /**
     *
     * @param {String} p3
     * @return {Boolean}
     */
    function getPrefix(p3) {
        var result = false;

        _.each(prefixes, function(elem){
            if (p3.indexOf(elem)==0) {
                result = elem;
            }
        });

        return result;
    }

    /**
     *
     * @param {String} p3
     * @param {String} person
     * @return {String}
     */
    verbTypes.default = function(p3, person) {
        var base = getBase(p3);

        switch (person) {
            case 's1':
                return base + 'e';
            case 's2':
                return base + 'st';
            case 's3':
            case 'p2':
                return base + 't';
            case 'p1':
            case 'p3':
            default:
                return p3;
        }
    };

    /**
     *
     * @param {String} p3
     * @param {String} person
     * @param {String} type
     * @param {*} present
     * @return {*}
     */
    function present(p3, person, type, present){
        if (present) {
            switch (person) {
                case 's1':
                    return present[0];
                case 's2':
                    return present[1];
                case 's3':
                    return present[2];
                case 'p1':
                    return present[3];
                case 'p2':
                    return present[4];
                case 'p3':
                    return present[5];
            }
        } else {
            switch (type) {
                case 's2':
                case 's3':
                case 's4':
                case 's5':
                case 's6':
                case 's7':
                    break;
                case 's1':
                case 'w':
                    return verbTypes.default(p3, person);
                case 'irr':
                    throw 'No list is provided for irregular verb: `' + p3 + '`';
                default:
                    throw 'Unable to find present tense for: `' + p3 + '`, type: `' + type + '`';
            }
        }
    }

    return {
        present: present
    };
})(jQuery, _);
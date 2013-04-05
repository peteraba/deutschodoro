var GermanVerb = (function($, _){
    var getBase, getEnding, verbTypes = {}, present, prefixes, getPrefix;

    prefixes = [
        "ab", "an",  "auf", "aus", "be", "bei", "dar", "ein", "ent", "er", "ge", "hin", "nach", "nieder", "über", "um",
        "unter", "ver", "vor", "weg", "wider", "zer", "zu", "zusammen"
    ];

    getEnding = function(p3) {
        return p3.substr(p3.length-2);
    };

    getBase = function(p3) {
        var ending = getEnding(p3);

        if ('en' == ending) {
            return p3.substr(0, p3.length - 2);
        } else if ('ln' == ending || 'rn' == ending) {
            return p3.substr(0, p3.length - 1);
        }

        throw new Exception('Unable to define base for: `' + p3 + '`');
    };

    getPrefix = function(p3) {
        var result = false;

        _.each(prefixes, function(elem){
            if (p3.indexOf(elem)==0) {
                result = elem;
            }
        });

        return result;
    };

    verbTypes.default = function(p3, person) {
        var base = getBase(p3);

        switch (person) {
            case 's1':
                return base + 'e';
            case 's2':
                return base + 'st';
            case 's3':
                return base + 't';
            case 'p1':
                return p3;
            case 'p2':
                return base + 't';
            case 'p3':
                return p3;
        }
    };

    present = function(p3, person, type){
        switch (type) {
            case '':
                break;
            case '':
                break;
            case '':
                break;
            case '':
                break;
            case 's3':
                break;
            case 's1':
            case 'w':
                return verbTypes.default(p3, person);
            default:
                throw new Exception('Unable to find present tense for: `' + p3 + '`, type: `' + type + '`');
        }
    };

    return {
        present: present
    };
})(jQuery, _);
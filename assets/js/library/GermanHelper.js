var GermanHelper = (function($, _){
    var modify, umlauter, find;

    umlauter = function(base){
        var indexToChange, charToChange, newChar, result;

        indexToChange = Math.max(
            base.lastIndexOf('a'),
            base.lastIndexOf('o'),
            base.lastIndexOf('u'),
            base.lastIndexOf('A'),
            base.lastIndexOf('O'),
            base.lastIndexOf('U')
        );

        charToChange = base.substr(indexToChange, 1);

        switch (charToChange) {
            case 'a':
                newChar = 'ä';
                break;
            case 'o':
                newChar = 'ö';
                break;
            case 'u':
                newChar = 'ü';
                break;
            case 'A':
                newChar = 'Ä';
                break;
            case 'O':
                newChar = 'Ö';
                break;
            case 'U':
                newChar = 'Ü';
                break;
            default:
                newChar = '';
        }

        result = false;
        if (indexToChange > 0) {
            result = base.substr(0, indexToChange) + newChar + base.substr(indexToChange + 1);
        } else if (indexToChange == 0) {
            result = newChar + base.substr(1);
        }

        return result;
    };

    modify = function(base, modified) {
        if (modified == '' || modified == '–') {
            return false;
        }
        if (modified.substr(0, 1) == '~') {
            return base + modified.substr(1);
        }
        if (modified.substr(0, 1) == '⍨') {
            return umlauter(base) + modified.substr(1);
        }

        return modified.substr(0, 1);
    };

    find = function(dict, searchData) {
        var result = false;

        _.each(dict, function(word) {
            var found = true;

            _.each(searchData, function(searchOption) {
                if (typeof searchOption != '') {
                    throw new Exception('Search option is not string: ' + searchOption);
                }

            });
        });

        return result;
    };

    return {
        modify: modify,
        find: find
    };
})(jQuery, _);
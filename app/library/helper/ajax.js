define(
    ['vendor/jquery'],
    function($){
        var site = 'http://b.deutschodoro.com';

        function setSite(newSite) {
            site = newSite;
        }

        function vote(hash, vote) {
            $.get(site + '/vote', {word: hash, vote: vote});
        }

        return {
            setSite: setSite,
            vote: vote
        }
    }
);
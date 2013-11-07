(function(){
    chrome.alarms.create('check', {periodInMinutes: 1});

    chrome.alarms.onAlarm.addListener(function() {
        var breakInMinutes, workInMinutes;

        switch (getState()) {
            case 'work':
                breakInMinutes = getBreakInMinutes();
                if (breakInMinutes == 0) {
                    newBreakNotification();
                    setState('break');
                }
                break;
            case 'init':
                newInitNotification();
                setState('break');
                break;
            case 'break':
                workInMinutes = getWorkInMinutes();
                if (workInMinutes == 0) {
                    newWorkNotification();
                    setState('work');
                }
                break;
            default:
                console.log('state', getState());
        }
    });

    setState('init');
    setLastMessage('');

    function newBreakNotification() {
        var notification, workInMinutes = getWorkInMinutes();

        if (getLastMessage() == 'break') return;

        if (workInMinutes > 180) {
            notification = webkitNotifications.createNotification(
                'images/icon-48.png',
                'Beer time!',
                'Enough for today...'
            );
        } else {
            notification = webkitNotifications.createNotification(
                'images/icon-48.png',
                'Break time!',
                'You have ' + getBreakInMinutes() +' minutes.'
            );
        }

        setLastMessage('break');

        notification.show();
    }

    function newWorkNotification() {
        var notification;

        if (getLastMessage() == 'work') return;

        notification = webkitNotifications.createNotification(
            'images/icon-48.png',
            'Break is over!',
            'You have ' + getWorkInMinutes() +' minutes to work.'
        );

        setLastMessage('work');

        notification.show();
    }

    function newInitNotification() {
        var notification;

        notification = webkitNotifications.createNotification(
            'images/icon-48.png',
            'Get a coffee',
            'You have ' + getWorkInMinutes() +' minutes until the first pomodoro.'
        );

        notification.show();
    }

    function getBreakInMinutes() {
        var workingHours = getWorkingHours(), curTime = (new Date()).getTime(), i, sec;

        for (i = 0; i < workingHours.length; i++) {
            // find first break time that hasn't been reached
            if (workingHours[i][1].getTime() >= curTime) {
                // if the work time belonging to it has been reached, than there is still some time left
                if (workingHours[i][0].getTime() >= curTime) {
                    sec = workingHours[i][1].getTime() - curTime;
                    return Math.ceil(sec / 60000);
                } else {
                    return 0;
                }
            }
        }

        return 0;
    }

    function getWorkInMinutes() {
        var workingHours = getWorkingHours(), curTime = (new Date()).getTime(), i, sec;

        for (i = 0; i < workingHours.length; i++) {
            // find first work time that hasn't been reached
            if (workingHours[i][0].getTime() >= curTime) {
                sec = workingHours[i][0].getTime() - curTime;
                return Math.ceil(sec / 60000);
            }
        }

        if (workingHours.length) {
            // Next work session must be tomorrow...
            sec = workingHours[0][0].getTime() + 24 * 3600 - curTime;

            return Math.ceil(sec / 60000);
        }

        return 0;
    }

    function getWorkingHours() {
        var udWorkingHours = getUserDefinedWorkingHours(), workingHours = [], cur, end, i, workLength, breakLength, d1, d2;

        workLength = 1500000; // 25 minutes
        breakLength = 300000;  // 5 minutes

        for (i = 0; i < udWorkingHours.length; i++) {
            cur = udWorkingHours[i][0].getTime();
            end = udWorkingHours[i][1].getTime();

            while (cur < end) {
                d1 = new Date();
                d1.setTime(cur);
                d2 = new Date();
                d2.setTime(cur + workLength);
                workingHours.push([d1, d2]);
                cur += workLength + breakLength;
            }
        }

        return workingHours;
    }

    function getUserDefinedWorkingHours() {
        var workingHours = [['9:15', '12:30'], ['13:30', '18:00'], ['21:00', '6:00']], i;

        for (i = 0; i < workingHours.length; i++) {
            workingHours[i][0] = getWorkDate(workingHours[i][0]);
            workingHours[i][1] = getWorkDate(workingHours[i][1]);

            if (workingHours[i][0].valueOf() > workingHours[i][1].valueOf()) {
                workingHours[i][1].setTime(workingHours[i][1].getTime() + 1000 * 3600 * 24);
            }
        }

        return workingHours;
    }

    function getWorkDate(userTime) {
        var date = new Date(), timeParts;

        timeParts = userTime.split(':');

        if (timeParts.length < 2) {
            timeParts.push(0);
        }

        timeParts[0] = Math.min(23, Math.max(0, parseInt(timeParts[0])));
        timeParts[1] = Math.min(59, Math.max(0, parseInt(timeParts[1])));

        date.setHours(timeParts[0]);
        date.setMinutes(timeParts[1]);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }

    function getState() {
        var state = sessionStorage.getItem('state');

        return state == 'work' ? 'work' : 'break';
    }

    function setState(state) {
        sessionStorage.setItem('state', state);
    }

    function setLastMessage(state) {
        sessionStorage.setItem('lastMessage', state);
    }

    function getLastMessage() {
        var state = sessionStorage.getItem('lastMessage');

        return state == 'work' ? 'work' : 'break';
    }
})();

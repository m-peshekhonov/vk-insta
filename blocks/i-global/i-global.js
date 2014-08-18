BN.addDecl('i-global').staticProp({

    page: '',

    timeAgo: function(time, short) {
        var round = Math.round,
            date = Math.abs(time * 1000),
            seconds = round((new Date - date) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            weeks = round(days / 7),
            month = round(days / 30),
            years = round(days / 365),
            timeAgo;

        function getTime() {
            if (years > 1) {
                return years + ' г.';
            }
            if (month > 1) {
                return month + ' мес.';
            }
            if (weeks > 1) {
                return weeks + ' нед.';
            }
            if (days > 1) {
                return days + ' д.';
            }
            if (hours > 1) {
                return hours + ' ч.';
            }
            if (minutes > 1) {
                return minutes + ' мин.';
            }
            if (seconds > 1) {
                return seconds + ' сек.';
            }
        };

        return getTime() + (short ? '' : ' назад');
    },

    declination: function(a, b, c, s) {
        var words = [a, b, c]
            index = s % 100;

        if (index >= 11 && index <= 14) { index = 0; }
        else {
            index = (index %= 10) < 5 ? (index > 2 ? 2 : index) : 0;
        }

        return(words[index]);
    }

});

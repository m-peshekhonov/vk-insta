BN.addDecl('banner').onSetMod({
    'js': function() {
        // localStorage.removeItem('close');

        var _this = this,
            now = new Date(),
            count = 11;
            counter = setInterval(timer, 1000);
            storage = localStorage.getItem('close'),
            dateNow = Math.round(now / 1000 / 60 / 60), // текущая дата в часах
            storageDate = Math.round(storage / 1000 / 60 / 60), // дата в сторадже в часах
            timerNum = this.elem('timer-sec'),
            timerText = this.elem('timer-text');

        function timer() {
            count--;

            if (count == 0) {
                clearInterval(counter);
                _this._close(now);

                return;
            }

            timerNum.html(count);
            timerText.html(BN('i-global').declination('секунд', 'секунду', 'секунды', count));
        };

        /* Если пользователь закрыл попапу с рекламой больше,
           чем 5 часов назад, показыаем опять =] */
        if((dateNow - storageDate > 3) && BN('i-insta').isAuth()) this.setMod('show', 'yes');

        this.bindTo('close', 'click', function() {
            this._close(now);
        }.bind(this));

    }
}).instanceProp({

    _close: function(now) {
        this.delMod('show');

        // Записываем дату в числовом формате(в милисекундах)
        localStorage.setItem('close', +now);
    }

});

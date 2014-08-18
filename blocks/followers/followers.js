BN.addDecl('followers').onSetMod({
    'js': function() {
        this._id = this.params.id;

        this._page = this.findBlockOutside('b-page');
        this._pageInner = this._page.elem('inner');
        this._getPeopleMethod = this.params.type == 'follows' ? 'getFollows' : 'getFollowers';

        this.firstLoad();
        this._page.bindTo('inner', 'scroll', jQuery.throttle(this._onScroll.bind(this), 400));
    }
}).instanceProp({
    firstLoad: function() {
        this._page.setMod('loading', 'yes');
        this.loadPortion(null, true);
    },

    // загружаем порцию фоток
    loadPortion: function(url, force) {
        BN('api-insta')[this._getPeopleMethod](this._id, url).then(function(data) {

            if (!data.data.length) {
                this._showMessage();
                this._page.delMod('loading');
                return;
            }

            var users = data.data.map(function(item) {
                return {
                    block: 'user',
                    data: item
                };
            }, this),
            action = force ? 'update' : 'append';

            BN('i-content')[action](this.domElem, users);
            this._afterLoad(data.pagination);
            this._page.delMod('loading');
        }.bind(this)).fail(function(err) {
            this._page.delMod('loading');
        }.bind(this));
    },

    _afterLoad: function(pager) {
        this._progress = false;
        // есть ли ссылка на следующую порцию
        this._nextUrl = pager && pager.next_url;
        // последняя ли это страница
        this._isLastPage = pager && !pager.next_url;
    },

    _onScroll: function() {
        // если это последняя страница, то перестаем подгрузку юзеров
        if (this._isLastPage) return;

        var scrollTop = this._pageInner.scrollTop(),
            viewport = this._pageInner.height() + scrollTop,
            scrollHeight = this._pageInner.prop('scrollHeight');

        if (viewport >= scrollHeight - 600 && !this._progress) {
            this._progress = true;

            this.loadPortion(this._nextUrl);
        }
    },

    _showMessage: function() {
        BN('i-content').append(this.domElem, {
            block: 'followers',
            elem: 'message',
            content: 'По данному запросу ничего не найдено.'
        });
    }
});

BN.addDecl('feed').onSetMod({
    'js': function() {
        this._type = this.params.type,
        this._id = this.params.id;
        this._tag = this.params.tag;
        this.picsArray = [];

        this._from = this._type || this._id || this._tag;
        this._getPicsMethod = this._type ?
            'getPics' : this._id ?
                'getUserPics' : this._tag ?
                    'getPicsByTag' : null;
        this._page = this.findBlockOutside('b-page');
        this._pageInner = this._page.elem('inner');

        if (!this._from || !this._getPicsMethod) return;
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
        BN('api-insta')[this._getPicsMethod](this._from, url).then(function(data) {
            if (!data.data.length) {
                this._showMessage();
                this._page.delMod('loading');
                return;
            }

            var pics = data.data.map(function(pic) {
                this.picsArray.push(pic.id);

                return {
                    block: 'box',
                    id: this._id,
                    type: this._type,
                    data: pic
                }
            }, this),
            action = force ? 'update' : 'append';

            BN('i-content')[action](this.domElem, pics);
            this._afterLoad(data.pagination);
            this._page.delMod('loading');

        }.bind(this)).fail(function(err) {
            this._page.delMod('loading');
        }.bind(this));
    },

    _afterLoad: function(pager) {
        this._progress = false;
        // есть ли ссылка на следующую порцию
        // нету в "популярные" так как там рандомные фотки
        this._nextUrl = pager && pager.next_url;
        // последняя ли это страница
        this._isLastPage = pager && !pager.next_url;
    },

    _onScroll: function() {
        // если это последняя страница, то перестаем подгрузку фоток
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
        BN('i-content').update(this.domElem, {
            block: 'feed',
            elem: 'message',
            content: 'По данному запросу ничего не найдено.'
        });
    }
});

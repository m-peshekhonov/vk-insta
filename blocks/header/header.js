BN.addDecl('header').onSetMod({
    'js': function() {
        var updater = this.findBlockInside('updater'),
            _this = this;

        this._input = this.findBlockInside('input');

        this._menu = this.findBlockInside('menu');
        this._page = this.findBlockOutside('b-page');
        this._people = this._page.findBlockInside('people-search');

        this._setActivePage();

        updater && updater.bindTo('click', function() {
            this._updatePage();
        }.bind(this));

        this._menu.bindTo(this._menu.elem('item', 'type', 'olymp'), 'click', function() {
            _this._searchTag('Олимпиада');
        });

        this._input && this._input.bindTo('keydown keyup', function(e) {
            var val = this.domElem.val();
            this.domElem.val(val.replace(/[^((\w)|(А-Яа-я-)|(\s))]/g, ''));
            e.keyCode == '13' && val !='' && _this._searchTag(this.domElem.val());
        });

        this.bindTo('vkinvite', 'click', function() {
            BN('i-vk').invite();
        });

        BEM.channel('i-router').on('update', function() {
            this._setActivePage();
        }.bind(this));
    }
}).instanceProp({
    _updatePage: function() {
        this._page.findBlockInside('feed').firstLoad();
        this._profile = this._page.findBlockInside('profile');
        this._profile && this._profile.loadProfile();

        this._page.elem('inner').scrollTop(0);
    },

    _setActivePage: function() {
        var item = this._menu.findElem('item', 'type', BN('i-global').page),
            logo = this.findBlockInside('logo'),
            isFeed = this._page.findBlockInside('feed'),
            searchReq = BN('i-router').get('matchers')[3],
            page = BN('i-global').page;

        this._prevItem && this._menu.delMod(this._prevItem, 'active');
        this._menu.setMod(item, 'active', 'yes');

        isFeed && logo.bindTo('click', function() {
            this._updatePage();
        }.bind(this));

        page != 'tag' && this._input.domElem.val().length &&
            this._input.domElem.val('');

        if (page != 'users') {

            this.bindTo(item, 'click', function() {
                this._updatePage();
            }.bind(this));
        }

        this._people.hasMod('visibility') && this._people.delMod('visibility');

        this._prevItem && this._prevItem.unbind('click');
        this._prevItem = item;
    },

    _searchTag: function(tag) {
        BN('i-router').setPath('/search/tag/' + tag);
    }
}).staticProp({
    live: function() {
        this.liveBindTo('people', 'click', function() {
            this._people.toggleMod('visibility', 'visible');

            return false;
        });

        return false;
    }
});

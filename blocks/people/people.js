BN.addDecl('people').onSetMod({
    'js': function() {
        this._page = this.findBlockOutside('b-page');

        this._name = this.params.user;
        this._loadPeople();
    }
}).instanceProp({
    _loadPeople: function() {
        BN('api-insta').getUsers(this._name).then(function(data) {
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
            }, this);

            this._page.delMod('loading');

            BN('i-content').append(this.domElem, users);
        }.bind(this));
    },

    _showMessage: function() {
        BN('i-content').update(this.domElem, {
            block: 'people',
            elem: 'message',
            content: 'По данному запросу ничего не найдено.'
        });
    }
});

BN.addDecl('b-page').onSetMod({
    'js': function() {
        var cmBlock;
        BN('i-global').page = BN('i-router').get('matchers')[1] || 'feed';

        this._checkAuth();

        BEM.channel('i-router').on('update', function() {
            BN('i-global').page = BN('i-router').get('matchers')[1] || 'feed';
            this._checkAuth();
        }.bind(this));

        BN('api-insta').getUser('self').then(function(data) {
           BN('i-global').userId = data.data.id;
        });

        // if (BN('i-insta').isAuth()) {
        //     cmBlock = new CMBlockVK;
        //     cmBlock.setupPreroll(23578, {});
        // }
    }
}).instanceProp({
    _checkAuth: function() {
        if (!BN('i-insta').isAuth() && BN('i-global').page != 'popular') {
            BN('i-router').replacePath('/popular');
            this._showLoginPage();
        } else if (!BN('i-insta').isAuth()) {
            this._showLoginPage();
        }
    },
    _showLoginPage: function() {
        this.setMod('type', 'login');

        BN('i-content').append(this.elem('inner'), [
            { block: 'login' },
            {
                block: 'paranja',
                mods: { theme: 'light', show: 'yes' }
            }
        ]);
    }
});

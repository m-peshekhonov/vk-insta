BN.addDecl('i-insta').staticProp({

    _authHost: 'https://api.instagram.com/oauth/authorize/?',
    _clientId: BN('i-global__config').instaClientId,
    _retPath: BN('i-global__config').retPath,
    _scope: ['likes', 'comments', 'relationships'].join('+'),

    // достаем токен из хеша и записываем его в куку
    init: function() {
        this._token = BN('i-router').getHashVal('access_token');

        if (this._token) {
            BN('i-cookie').set('instaToken', this._token, { expires: 365 });
            return;
        }

        // если нету токена в хеше, пробуем достать из кук
        this._token = BN('i-cookie').get('instaToken');

        // если достали токен из кук, то записываем его в хранилище контакта
        this._token ?
            BN('i-vk').setStorage('instaToken', this._token).then(function() {
                // this._clearCookie();
            }) :
            BN('i-vk').getStorage('instaToken').then(function(res) {
                this._token = res;
            });
    },

    login: function() {
        var urlParams = [
            'client_id=' + this._clientId,
            'redirect_uri=' + this._retPath,
            'scope=' + this._scope,
            'response_type=token'
        ],
        url = this._authHost + urlParams.join('&'),
        winLeft = ($(document).width() / 2) - 300;

        // открываем окно с авторизацией
        this._authWindow = window.open(url, 'Instagram auth',
            'menubar=no, location=no, resizable=no, scrollbars=no ,status=no, width=600, height=400, top=200,left=' + winLeft);

        // опрашиваем о авторизации
        this._checkAuthInterval = setInterval(function() {
            this._checkAuth();
        }.bind(this), 100);
    },

    // при выходе очищаем токен
    exit: function() {
        this._token = null;
        this._clearCookie();
        BN('i-vk').setStorage('instaToken', '');
        BN('i-router').setPath('/popular', true);
        BN('i-router').reload();
    },

    // если есть токен, то юзер авторизован
    isAuth: function() {
        return this._token ? 1 : 0;
    },

    // проверяем, авторизовался ли пользователь уже
    // если да, то закрываем всплывающее окно и перезагружаем страницу
    _checkAuth: function() {
        this._token = BN('i-cookie').get('instaToken');

        (this._token && this._authWindow) && this._onAuth();
    },

    // выполняется когда юзер авторизовался и еще открыто окно авторизации
    _onAuth: function() {
        clearInterval(this._checkAuthInterval);
        this._authWindow.close();
        BN('i-router').setPath('/');
        BN('i-router').reload();
    },

    _clearCookie: function() {
        BN('i-cookie').set('instaToken', null);
    }

}).done();

BN('i-insta').init();

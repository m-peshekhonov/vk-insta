BN.addDecl('api-insta').staticProp({
    // TODO: подумать как сделать лучше, с bem-node api
    _apiHost: 'https://api.instagram.com/v1/',
    _params: {
        access_token: BN('i-insta')._token,
        client_id: BN('i-insta')._clientId
    },

    _request: function(url, dataType, options) {
        var params = this._params,
            promise = Vow.promise();

        // TODO: подумать как переделать
        // type && (type = !!~['GET', 'POST', 'PUT', 'DELETE'].indexOf(type.toUpperCase()) ? type : 'GET');

        jQuery.ajax({
            type: 'GET',
            url: url,
            dataType : dataType || 'jsonp',
            cache: true,
            timeout: 20000,
            data: options ? jQuery.extend(params, options) : params,
            success: function(data) {
                // TODO: доделать обработку ошибок
                data.meta.code == '400' &&
                    promise.reject(data.meta.error_message);

                promise.fulfill(data);
            },
            error: function(err) { promise.reject(err); }
        });

        return promise;
    },

    // список фоток (мой|популярные и тд)
    getPics: function(val, url) {
        var endPoint = {
                my: 'users/self/media/recent',
                feed: 'users/self/feed',
                popular: 'media/popular',
                likes: 'users/self/media/liked'
            }[val],
            url = url || this._apiHost + endPoint;

        return this._request(url);
    },

    // конкретная фотография
    showPic: function(id) {
        var url = this._apiHost + 'media/' + id;
        return this._request(url);
    },

    // инфо о юзере
    getUser: function(id) {
        var url = this._apiHost + 'users/' + id;
        return this._request(url);
    },

    // фотки юзера
    getUserPics: function(id, url) {
        var url = url || this._apiHost + 'users/' + id + '/media/recent';
        return this._request(url);
    },

    // фотки по тегу
    getPicsByTag: function(tag, url) {
        var url = url || this._apiHost + 'tags/' + tag + '/media/recent';
        return this._request(url);
    },

    // коменнты с фотки
    getPicComments: function(id) {
        var url = this._apiHost + 'media/' + id + '/comments';
        return this._request(url);
    },

    // лайки с фотки
    getPicLikes: function(id) {
        var url = this._apiHost + 'media/' + id + '/likes';
        return this._request(url);
    },

    // теги
    getTags: function(tag) {
        var url = this._apiHost + 'tags/search?q=' + tag;
        return this._request(url);
    },

    // поиск фоток по тегу
    getPicsByTag: function(tag, url) {
        var url = url || this._apiHost + 'tags/' + tag + '/media/recent';
        return this._request(url);
    },

    // проверка статуса пользователя
    isFollowed: function(id) {
        var url = this._apiHost + 'users/' + id + '/relationship';
        return this._request(url);
    },

    // подписки юзера
    getFollows: function(id, url) {
        var url = url || this._apiHost + 'users/' + id + '/follows';
        return this._request(url);
    },

    // подписчики юзера
    getFollowers: function(id, url) {
        var url = url || this._apiHost + 'users/' + id + '/followed-by';
        return this._request(url);
    },

    // лайкнуть
    likePic: function(id, url) {
        var url = url || 'http://' + BN('i-router').getHost() + '/api/user/like';
        return this._request(url, null, { id: id });
    },

    // отменить лайк
    unLikePic: function(id, url) {
        var url = url || 'http://' + BN('i-router').getHost() + '/api/user/unlike';
        return this._request(url, 'json', { id: id });
    },

    // зафоловить
    follow: function(id, url) {
        var url = url || 'http://' + BN('i-router').getHost() + '/api/user/follow';
        return this._request(url, 'json', { id: id, action: 'follow' });
    },

    // не фоловить
    unfollow: function(id, url) {
        var url = url || 'http://' + BN('i-router').getHost() + '/api/user/unfollow';
        return this._request(url, 'json', { id: id, action: 'unfollow' });
    },

    getUsers: function(name) {
        var url = this._apiHost + 'users/search?q=' + name;
        return this._request(url);
    }
});



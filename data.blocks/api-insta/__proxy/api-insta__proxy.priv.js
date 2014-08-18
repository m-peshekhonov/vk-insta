(function() {

    var request = require('request');

    BN.addDecl('api__proxy', 'page', {
        route: /^\/api\/user\/(like|unlike|follow|unfollow)\/?$/
    }).staticProp({
        _apiHost: 'https://api.instagram.com/v1/',

        init: function(matchers, req, res) {
            // нужен для отображения определенного фида (feed, popular)
            var params = BN('i-router').get('params'),
                action = params.action,
                endPoint,
                reqMethod;

            switch(matchers[1]) {
                case 'like':
                    endPoint = 'media/' + params.id + '/likes';
                    reqMethod = request.post;
                break;

                case 'unlike':
                    endPoint = 'media/' + params.id + '/likes';
                    reqMethod = request.del;
                break;

                case 'follow':
                    endPoint = 'users/' + params.id + '/relationship';
                    reqMethod = request.post;
                break;

                case 'unfollow':
                    endPoint = 'users/' + params.id + '/relationship';
                    reqMethod = request.del;
                break;
            }

            var url = this._apiHost + endPoint + '?access_token=' +
                params.access_token + (params.action ? '&action=' + params.action : '');

            reqMethod({ url: url, timeout: 5000 }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    BN('i-response').json(body);
                } else {
                    console.error('INSTAGRAM API ERROR: ' + response.statusCode);
                    // console.log(response.headers);
                }
            });

            return Vow.fulfill();
        }
    });

}());

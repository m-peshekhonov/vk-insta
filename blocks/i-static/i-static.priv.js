(function () {

    var static = require('node-static'),
        file = new static.Server('.'),
        CONTENT_TYPES = ['css', 'js', 'png', 'gif', 'jpg', 'svg', 'ico', 'ttf', 'otf', 'woff', 'eot', 'txt', 'html', 'json'],
        route = new RegExp('^.*\\.(' + CONTENT_TYPES.join('|') + ')$');

    BN.addDecl('static', 'page', {
        route: route
    }).staticProp({
        init: function(matchers, req, res) {
            file.serve(req, res, function(err, res) {
                if (err) {
                    console.error('Error serving ' + req.url + ' - ' + err.message)
                    BN('i-response').error(err);
                }
            });

            return Vow.fulfill();
        }
    });

}());

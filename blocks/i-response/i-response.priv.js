BEM.decl('i-response', null, {
    _getResponseHeaders: function (status, body, contentType) {
        return {
            'Content-Type': contentType + '; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
        };
    },
});

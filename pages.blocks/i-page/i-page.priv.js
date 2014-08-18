/**
 * Overrides some methods
 */
var pathPrefix = (function() {
    var staticPrefix = '',
    matches = process.argv[1].match(/([\w\-]+)\/([\w\-]+)\/\2.server.js$/),
    folder = matches[1],
    pageName = matches[2];

    return [staticPrefix, folder, pageName, '_' + pageName].join('/');
}());

BN.addDecl('i-page').staticProp({
    /**
     * @override
     */
    getPageJson: function(json) {
        return {
            block: 'b-page',
            content: [
                {
                    block: 'content',
                    content: json
                }
            ]
        };
    },

    /**
     * Getting prefixes for page static files.
     * @ex prefix for ex page in app is "/app/ex/_ex"
     * @return {String}
     */
    getPathPrefix: function() {
        return pathPrefix;
    }
});

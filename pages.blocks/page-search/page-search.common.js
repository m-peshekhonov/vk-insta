BN.addDecl('page-search', 'page', {
    route: /^\/search\/(tag|users)\/(.*)$/
}).staticProp({
    init: function(matchers) {
        // нужен для отображения определенного фида (feed, popular)
        var type = matchers[1],
            name = matchers[2],
            content = {
                tag: {
                    block: 'feed',
                    js: { tag: name }
                },
                users: {
                    block: 'people',
                    js: { user: name }
                }
            }[type];

        return this.out(content);
    }
});

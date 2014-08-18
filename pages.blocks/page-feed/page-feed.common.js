BN.addDecl('page-feed', 'page', {
    route: /^\/(popular|likes)?$/
}).staticProp({
    init: function(matchers) {
        // нужен для отображения определенного фида (feed, popular)
        var type = matchers[1] || 'feed';

        return this.out({
            block: 'feed',
            js: { type: type }
        });
    }
});

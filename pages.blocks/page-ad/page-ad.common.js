BN.addDecl('page-ad', 'page', {
    route: /^\/(ad)?$/
}).staticProp({
    init: function() {
        return this.out({ block: 'catalog' });
    }
});

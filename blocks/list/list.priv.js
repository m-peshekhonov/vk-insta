BN.addDecl('list').blockTemplate(function(ctx) {
    ctx.tag('ul');
}).elemTemplate({
    'item': function(ctx) {
        ctx.tag('li');
    }
});

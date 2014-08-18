BN.addDecl('link').blockTemplate(function(ctx) {
    var json = ctx.json();

    ctx.tag('a')
        .attr('href', json.url || '')
        .attr('target', json.target);
});

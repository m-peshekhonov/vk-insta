BN.addDecl('input').blockTemplate(function(ctx) {
    ctx.tag('input')
        .attr('placeholder', ctx.json().hint);
});

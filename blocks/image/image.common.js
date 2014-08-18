BN.addDecl('image').blockTemplate(function(ctx) {
    ctx.tag('img')
        .attr('src', ctx.json().src);
});

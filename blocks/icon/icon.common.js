BN.addDecl('icon').blockTemplate(function(ctx) {
    var json = ctx.json();

    json.type && ctx.mod('type', json.type);
});

BN.addDecl('like').blockTemplate(function(ctx) {
    var mix = ctx.mix() || [];

    return {
        block: 'icon',
        type: 'like',
        mix: mix.concat({ block: 'like', mods: ctx.mods() }),
        content: ctx.content()
    };
});

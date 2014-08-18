BN.addDecl('userpic').blockTemplate(function(ctx) {
    var json = ctx.json(),
        url = json.url,
        style = 'background-image: url('+json.img+')',
        mix = ctx.mix() || [];

    if (!url) {
        ctx.attr('style', style);
        return;
    }

    return {
        block: 'link',
        mix: mix.concat({ block: 'userpic' }),
        attrs: { style: style },
        url: url,
        content: ''
    };
});

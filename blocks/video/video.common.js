BN.addDecl('video').blockTemplate(function(ctx) {
    ctx.tag('video').attr('controls', 'controls');

    ctx.content({
        elem: 'source',
        tag: 'source',
        attrs: { src: ctx.json().src, type: 'video/mp4' }
    });
});

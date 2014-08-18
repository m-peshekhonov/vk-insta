BN.addDecl('loader').blockTemplate(function(ctx) {

    ctx.content([
        {
            elem: 'spinner',
            content: [
                {
                    elem: 'item',
                    mods: { type: 'left' }
                },
                {
                    elem: 'item',
                    mods: { type: 'right' }
                }
            ]
        }
    ]);

});

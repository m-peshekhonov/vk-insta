BN.addDecl('menu').blockTemplate(function(ctx) {

    ctx.tag('ul');

}).elemTemplate({

    'item': function(ctx) {
        var json = ctx.json();

        ctx.tag('li')
            .content({
                block: 'link',
                url: json.url,
                target: json.target,
                content: [
                    {
                        block: 'icon',
                        mods: { type: json.icon }
                    },
                    {
                        block: 'menu',
                        elem: 'item-text',
                        content: ctx.content()
                    }
                ]
            }, true);
    }

});

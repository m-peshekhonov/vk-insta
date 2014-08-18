BN.addDecl('banner').blockTemplate(function(ctx) {
    var json = ctx.json();

    ctx.js(true)
        .content([
            {
                elem: 'title',
                mix: [{ block: 'cf' }],
                content: [
                    {
                        elem: 'title-text',
                        content: 'Партнерское предложение'
                    },
                    {
                        elem: 'close',
                        content: '✕'
                    }
                ]
            },
            {
                block: 'link',
                url: '//www.instaphoto.ru/if1',
                target: '_blank',
                mix: [{ block: 'banner', elem: 'image' }]
            },
            {
                elem: 'timer',
                content: [
                    'Окно закроется через',
                    {
                        elem: 'timer-sec'
                    },
                    {
                        elem: 'timer-text'
                    }
                ]
            }
    ])
});

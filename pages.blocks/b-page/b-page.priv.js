/**
 * Override
 */
BEM.JSON.decl('b-page', {
    onBlock: function(ctx) {
        var pathPrefix = BN('i-page').getPathPrefix(),
            headStatic,
            footStatic;

        headStatic = [
            { elem: 'css', url: pathPrefix + '.css', ie: false }
        ];

        footStatic = [
            { elem: 'js', url: '//vk.com/js/api/xd_connection.js?5.3' },
            // { elem: 'js', url: '/common.blocks/i-vk/cmblockvk.js' },
            { elem: 'js', url: '//api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU' },
            { block: 'i-jquery', elem: 'core' },
            { elem: 'js', url: pathPrefix + '.js' }
        ];

        ctx.param('x-ua-compatible', false);
        ctx.param('head', headStatic);

        ctx.content([
            ctx.content(),
            footStatic
        ], true);

        ctx.stop();
    }
});

BN.addDecl('b-page').blockTemplate(function(ctx) {
    ctx.js(true);

    ctx.content({
        elem: 'inner',
        content: [
            // {
            //     block: 'link',
            //     target: '_blank',
            //     url: 'http://www.instaphoto.ru/if1',
            //     mix: [{ block: 'ad', mods: { show: 'yes' } }],
            //     content: [
            //         {
            //             elem: 'pic'
            //         },
            //         {
            //             elem: 'text',
            //             content: 'Подушки, чехлы для iPhone, магнитики, зонты, часы из ваших Instagram фоток!'
            //         }
            //     ]
            // },
            {
                block: 'header'
            },
            {
                block: 'people-search'
            },
            ctx.content(),
            {
                block: 'loader'
            },
            {
                block: 'paranja'
            }
        ]
    }, true);
});

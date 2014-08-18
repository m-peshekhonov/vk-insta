BN.addDecl('header').blockTemplate(function(ctx) {

    ctx.js(true);

    ctx.content([
        {
            elem: 'inner',
            content: [
                {
                    block: 'link',
                    url: '/',
                    content: { block: 'logo' }
                },
                {
                    block: 'menu',
                    mods: { type: 'header' },
                    content: [
                        {
                            elem: 'item',
                            mods: { type: 'feed' },
                            icon: 'home',
                            url: '/',
                            content: 'Лента'
                        },
                        {
                            elem: 'item',
                            mods: { type: 'popular' },
                            icon: 'star',
                            url: '/popular',
                            content: 'Популярное'
                        },
                        {
                            elem: 'item',
                            mods: { type: 'likes' },
                            icon: 'like',
                            url: '/likes',
                            content: 'Понравилось!'
                        }
                    ]
                },
                {
                    elem: 'search',
                    content: {
                        block: 'input',
                        mods: { type: 'header' },
                        hint: 'Поиск фотографий'
                    }
                }
            ]
        }
    ]);

});

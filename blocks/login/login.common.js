BN.addDecl('login').blockTemplate(function(ctx) {
    ctx.js(true);

    ctx.content([
        {
            elem: 'inner',
            content: [
                {
                    elem: 'icon'
                },
                {
                    elem: 'content',
                    content: [
                        {
                            elem: 'logo'
                        },
                        {
                            block: 'list',
                            mix: [{ block: 'login', elem: 'list' }],
                            content: [
                                {
                                    elem: 'item',
                                    content: 'Просматривайте свои и фото Ваших друзей'
                                },
                                {
                                    elem: 'item',
                                    content: 'Ставьте лайки, читайте комментарии'
                                },
                                {
                                    elem: 'item',
                                    content: 'Популярные фотографии, поиск людей, поиск по тэгам'
                                },
                                {
                                    elem: 'item',
                                    content: [
                                        'Все подробности ', {
                                            block: 'link',
                                            target: '_blank',
                                            url: 'http://vk.com/instappvk',
                                            content: 'в нашей группе ВКонтакте'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            elem: 'button',
                            content: 'Войти'
                        }
                    ]
                }
            ]
        }
        // {
        //     elem: 'notice',
        //     mods: { type: 'developers' },
        //     content: [
        //         {
        //             elem: 'notice-text',
        //             content: 'Разработчики приложения: '
        //         },
        //         {
        //             block: 'link',
        //             target: '_blank',
        //             mods: { type: 'boss' },
        //             url: '//vk.com/m.peshekhonov',
        //             content: 'Михаил Пешехонов'
        //         },
        //         {
        //             elem: 'notice-text',
        //             content: ' и '
        //         },
        //         {
        //             block: 'link',
        //             target: '_blank',
        //             url: '//vk.com/id7301483',
        //             content: 'Дмитрий Кокорев'
        //         },
        //     ]
        // }
    ])
});

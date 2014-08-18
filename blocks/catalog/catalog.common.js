BN.addDecl('catalog').blockTemplate(function(ctx) {

    ctx.content([
        {
            elem: 'description',
            content: 'Вы можете создать разнообразные сувениры и аксессуары с вашими фотографиями из <b>Instagram</b>: чехлы для iPhone, подушку, летнюю сумку, магнитики на холодильник, зонт, наклейки и многое другое!'
        },
        {
            elem: 'items',
            content: [
                {
                    elem: 'item',
                    name: 'Косметичка',
                    type: 'cosm',
                    price: '590',
                    url: 'http://www.instaphoto.ru/catalog/instagram-kosmetichka/if1'
                },
                {
                    elem: 'item',
                    name: 'Чехол для iPhone',
                    type: 'iphone',
                    price: '1290',
                    url: 'http://www.instaphoto.ru/catalog/instagram-chehol-dlya-iphone/if1'
                },
                {
                    elem: 'item',
                    name: 'Зонт',
                    type: 'ambrella',
                    price: '2390',
                    url: 'http://www.instaphoto.ru/catalog/originalniy-zont-instagram/if1'
                },
                {
                    elem: 'item',
                    name: 'Чехол для девайса',
                    type: 'device-bag',
                    price: '990',
                    url: 'http://www.instaphoto.ru/catalog/instagram-chehol-dlya-telefona/if1'
                },
                {
                    elem: 'item',
                    name: 'Будильник',
                    type: 'bud',
                    price: '1190',
                    url: 'http://www.instaphoto.ru/catalog/instagram-budilnik/if1'
                },
                {
                    elem: 'item',
                    name: 'Настенные часы',
                    type: 'wall-clock',
                    price: '1490',
                    url: 'http://www.instaphoto.ru/catalog/nastennie-chasy-s-foto-instagram/if1'
                },
                {
                    elem: 'item',
                    name: 'Чехол для iPad',
                    type: 'ipad',
                    price: '2490',
                    url: 'http://www.instaphoto.ru/catalog/kozhanniy-chehol-dlya-ipad/if1'
                },
                {
                    elem: 'item',
                    name: 'Летняя сумка',
                    type: 'summer-bag',
                    price: '1480',
                    url: 'http://www.instaphoto.ru/catalog/letnyaya-sumka-instagram/if1'
                },
                {
                    elem: 'item',
                    name: 'Подушка',
                    type: 'pellow',
                    price: '1490',
                    url: 'http://www.instaphoto.ru/catalog/foto-pechat-na-podushke-instagram/if1'
                }
            ]
        },
        {
            elem: 'footer',
            content: {
                block: 'link',
                mix: [{ block: 'catalog', elem: 'more-items' }],
                target: 'blank',
                url: 'http://www.instaphoto.ru/catalog/if1',
                content: 'Просмотреть все товары'
            }
        }
    ]);

}).elemTemplate({
    'item': function(ctx) {
        var json = ctx.json(),
            url = json.url;

        ctx.content([
            {
                block: 'link',
                url: url,
                target: 'blank',
                content: [
                    {
                        block: 'catalog',
                        elem: 'title',
                        content: json.name
                    },
                    {
                        block: 'catalog',
                        mods: { type: json.type },
                        elem: 'image'
                    }
                ]
            },
            {
                elem: 'price',
                content: json.price + ' руб.'
            },
            {
                block: 'link',
                mix: [{ block: 'catalog', elem: 'button' }],
                url: url,
                target: 'blank',
                content: 'Купить'
            }
        ]);
    }
});

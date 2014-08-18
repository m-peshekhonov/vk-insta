BN.addDecl('like-box').onSetMod({
    'js': function() {
        var popup = this.findBlockOutside('popup'),
            likeBoxParanja = popup.findBlockInside('like-box-paranja');

        likeBoxParanja.bindTo('click', function() {
            this._destroy();
        }.bind(this));

        this.bindTo('close', 'click', function() {
            this._destroy();
        })

    }
}).instanceProp({
    _destroy: function() {
        this.delMod('show');
    }
}).blockTemplate(function(ctx) {
    ctx.content([
        {
            elem: 'title',
            content: [
                {
                    elem: 'title-text',
                    content: 'Оценили фотографию'
                },
                {
                    elem: 'close',
                    content: 'Закрыть'
                }
            ]
        },
        {
            elem: 'inner',
            content: ctx.content()
        },
        {
            elem: 'paranja'
        }
    ])
})
.elemTemplate({
    'item': function(ctx) {
        var data = ctx.json().data;
        ctx.content([
            {
                block: 'link',
                url: '/user/' + data.id,
                mix: [
                    {
                        block: 'like-box',
                        elem: 'avatar'
                    },
                    {
                        block: 'popup',
                        elem: 'close-popup'
                    }
                ],
                attrs: { style: 'background-image: url('+data.profile_picture+')' },
                content: {
                    block: 'like-box',
                    elem: 'username',
                    content: data.username
                }
            }
        ]);
    }
});

BN.addDecl('box').onSetMod({
    'js': function() {
        this._page = this.findBlockOutside('b-page');
        this._like = this.findBlockInside('like');
        this._picId = this.params.picId;
    }
}).blockTemplate(function(ctx) {
    var json = ctx.json(),
        pic = json.data,
        type = pic.type,
        userUrl = json.id ? '' : '/user/' + pic.user.id;

    ctx.js({ picId: pic.id });
    ctx.mod('type', type);
    ctx.mod('id', pic.id);

    ctx.content([
        {
            block: 'image',
            mix: [{ block: 'box', elem: 'photo' }],
            src: pic.images.low_resolution.url
        },
        {
            block: 'icon',
            type: 'like',
            mix: [{
                block: 'box',
                elem: 'like',
                mods: { type: 'big', liked: pic.user_has_liked ? 'yes' : '' }
            }]
        },
        pic.type == 'video' && {
            elem: 'video',
            content: {
                block: 'icon',
                type: 'video'
            }
        },
        {
            block: 'like',
            mods: { liked: pic.user_has_liked ? 'yes' : '' },
            mix: [{ block: 'box', elem: 'like' }]
        },
        {
            block: 'box',
            elem: 'bottom-panel',
            content: {
                elem: 'user-info',
                content: [
                    {
                        block: 'userpic',
                        mix: [{ block: 'box', elem: 'user-pic' }],
                        img: pic.user.profile_picture,
                        url: userUrl
                    },
                    {
                        block: 'box',
                        elem: 'user-activity',
                        content: [
                            {
                                elem: 'user-name',
                                content: {
                                    block: 'link',
                                    url: userUrl,
                                    content: pic.user.username
                                }
                            },
                            {
                                elem: 'likes',
                                content: [
                                    {
                                        block: 'icon',
                                        type: 'like',
                                        mix: [{
                                            block: 'box',
                                            elem: 'likeicon',
                                            mods: { liked: pic.user_has_liked ? 'yes' : '' }
                                        }]
                                    },
                                    {
                                        block: 'box',
                                        elem: 'like-count',
                                        content: pic.likes.count
                                    }
                                ]
                            },
                            {
                                elem: 'comments',
                                content: [
                                    {
                                        block: 'icon',
                                        type: 'comment'
                                    },
                                    {
                                        block: 'box',
                                        elem: 'comment-count',
                                        content: pic.comments.count
                                    }
                                ]
                            },
                            pic.location && {
                                elem: 'geo',
                                content: [
                                    {
                                        block: 'icon',
                                        type: 'location'
                                    }
                                ]
                            },
                            {
                                elem: 'date',
                                content: [
                                    {
                                        block: 'icon',
                                        type: 'date'
                                    },
                                    {
                                        block: 'box',
                                        elem: 'date-post',
                                        content: BN('i-global').timeAgo(pic.created_time, true)
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ]);
}).instanceProp({
    _showPopup: function() {
        BN('api-insta').showPic(this._picId).then(function(data) {
            BN('i-content').append(this._page.domElem, [{
                block: 'popup',
                data: data.data
            }, { block: 'paranja' }]);
        }.bind(this));
    },

    _likeUnlike: function() {
        var cnt = parseInt(this.elem('like-count').text()),
            action;

        if (this._like.hasMod('liked', 'yes')) {
            action = 'unLikePic';
            this._like.delMod('liked');
            this.delMod(this.elem('likeicon'), 'liked');
            cnt--;
        } else {
            action = 'likePic';
            this._like.setMod('liked', 'yes');
            this.setMod(this.elem('likeicon'), 'liked', 'yes');
            cnt++;
        }

        BN('api-insta')[action](this._picId);
        BN('i-content').update(this.elem('like-count'), cnt);
    }
}).staticProp({
    live:  function() {
        this.liveBindTo('like', 'click', function(e) {
            this._likeUnlike();
        });

        this.liveBindTo('photo video', 'click', function() {
            BN('i-global').isPopupOpen || this._showPopup();
            BN('i-global').isPopupOpen = true;
        });

        return false;
    }
});

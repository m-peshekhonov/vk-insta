BN.addDecl('popup').onSetMod({
    'js': function() {
        this._page = this.findBlockOutside('b-page');
        this._page.setMod('overflow', 'yes');
        this.setMod('visibility', 'visible');
        this._likeBox = this.findBlockInside('like-box');

        this._picId = this.params.picId;
        this._bigPicture = this.elem('photo');
        this._paranja = this._page.findBlockInside('paranja');

        this._picsArray = this._page.findBlockInside('feed').picsArray;
        this._picPos = this._picsArray.indexOf(this._picId);
        this._lastPicPos = this._picsArray.length - 1;

        var _this = this; 

        this.bindToDoc('keyup', function(e) {
            e.which == '27' && this.destroy();
            BEM.DOM.doc.unbind('keyup');
        }.bind(this));

        $('.paranja').on('click', function() {
            _this.destroy();
        });

        this._picLoad(); // Показываем большое фото, когда оно полностью загружено
        this._moreLikes(); // Подгружаем 7 лайков, т.к в данных приходит только 4
    }
}).instanceProp({
    destroy: function() {
        this.destruct();
        this._paranja.destruct();
        this._page.delMod('overflow');
        BN('i-global').isPopupOpen = false;
    },

    _picLoad: function() {
        var pic = this.findElem('photo');

        pic.load(function() {
            this.delMod(pic, 'hide');
            this.findElem('spinner').remove();
        }.bind(this));
    },

    _showAllLikes: function() {
        this._likeBox.setMod('show', 'yes');

        var likes = this._allLikes.map(function(item) {
            return {
                block: 'like-box',
                elem: 'item',
                data: item
            };
        });

        BN('i-content').append(this._likeBox.elem('inner'), likes);

    },

    _likeUnlike: function() {
        var countLikes = this.findElem('count-likes'),
            cnt = parseInt(countLikes.text()),
            boxPic = this._page.findBlockInside({ block: 'box', modName: 'id', modVal: this._picId }),
            boxPicLike = boxPic.elem('likeicon'),
            like = this.findBlockInside('like'),
            likeButton = this.findElem('like-button'),
            action;

        if (like.hasMod('liked', 'yes')) {
            action = 'unLikePic';
            like.delMod('liked');
            this.delMod(likeButton, 'liked');
            boxPic.delMod(boxPicLike, 'liked');
            cnt--;
        } else {
            action = 'likePic';
            like.setMod('liked', 'yes');
            this.setMod(likeButton, 'liked', 'yes');
            boxPic.setMod(boxPicLike, 'liked', 'yes');
            cnt++;
        }

        BN('api-insta')[action](this._picId);
        BN('i-content').update(countLikes, cnt);
        BN('i-content').update(boxPic.findElem('like-count'), cnt);
    },

    _moreLikes: function(argument) {
        BN('api-insta').getPicLikes(this._picId).then(function(data) {
            this._allLikes = data.data;

            var likes = this._allLikes.slice(0, 7).map(function(item) {
                return {
                    block: 'link',
                    url: '/user/' + item.id,
                    attrs: {
                        'data-name': item.username,
                        style: 'background-image: url('+item.profile_picture+')'
                    },
                    mix: [
                        {
                            block: 'popup',
                            elem: 'piclike'
                        },
                        {
                            block: 'popup',
                            elem: 'close-popup'
                        }
                    ]
                };
            });

            BN('i-content').append(this.findElem('likes'), likes);
        }.bind(this));
    },

    _showMoreComments: function() {
        var commentsInner = this.elem('comments-inner');

        BN('api-insta').getPicComments(this._picId).then(function(data) {
            var comments = data.data.map(function(item) {
                return {
                    block: 'popup',
                    elem: 'item-comment',
                    data: item
                };
            });

            BN('i-content').update(commentsInner, comments);
            this.setMod(this.elem('more-comments'), 'hide', 'yes');
            this.setMod(commentsInner, 'more', 'hide');
        }.bind(this));
    },

    _showNextPic: function() {
        var nextPos = this._picPos + 1,
            nextId = this._picsArray[nextPos];

        if (nextPos <= this._lastPicPos) {
            this._getNextPic(nextId);
            this._picId = nextId;
            this._picPos = nextPos;
        }
    },

    _getNextPic: function(id) {
        BN('api-insta').showPic(id).then(function(data) {
            BN('i-content').update(this.elem('inner'), [{
                block: 'popup',
                elem: 'content',
                data: data.data
            }]).always(function() {
                this.delMod(this.findElem('photo'), 'hide');
                this.findElem('spinner').remove();
                this._moreLikes();
            }.bind(this));
        }.bind(this));
    },
}).staticProp({
    live: function() {
        this.liveBindTo('close close-popup', 'click', function() {
            this.destroy();
        });

        this.liveBindTo('like-button', 'click', function() {
            this._showAllLikes();
        });

        this.liveBindTo('like', 'click', function() {
            this._likeUnlike();
        });

        // подругружаем еще пачку комментариев
        this.liveBindTo('more-comments', 'click', function() {
            this._showMoreComments();
        });

        // По клику на местоположение туглим блок с картой.
        this.liveBindTo('public-location close-map', 'click', function() {
           this.toggleMod(this.findElem('location'), 'show', 'yes');
        });

        this.liveBindTo('photo video-click', 'click', function() {
            this._showNextPic();
        });

        return false;
    }
}).blockTemplate(function(ctx) {
    var data = ctx.json().data;

    ctx.js({ picId: data.id });

    ctx.content([
        {
            elem: 'inner',
            content: {
                elem: 'content',
                data: data
            }
        },
        {
            block: 'like-box'
        },
        {
            block: 'like-box-paranja'
        }
    ]);
}).elemTemplate({
    'content': function(ctx) {
        var data = ctx.json().data,
            userUrl = '/user/' + data.user.id,
            isVideo = data.type == 'video',
            isPhoto = data.type == 'image',
            commentsCount = data.comments.count,
            dataMap = {
                map: data.location,
                username: data.user.full_name,
                userpic: data.user.profile_picture,
                image: data.images.low_resolution
            },
            adv = ['magnite', 'iphone', 'poduwka'];

        return [
            {
                elem: 'media',
                js: { id: data.id },
                content: [
                    isPhoto && {
                        block: 'image',
                        mix: [{ block: 'popup', elem: 'photo', mods: { hide: 'yes' } }],
                        src: data.images.standard_resolution.url
                    },
                    isVideo && [
                        {
                            block: 'video',
                            mix: [{ block: 'popup', elem: 'video' }],
                            src: data.videos.standard_resolution.url
                        },
                        {
                            block: 'popup',
                            elem: 'video-click'
                        }
                    ],
                    {
                        block: 'like',
                        mods: { liked: data.user_has_liked ? 'yes' : '' },
                        mix: [{ block: 'popup', elem: 'like' }]
                    },
                        data.caption && {
                        elem: 'description',
                        mods: { video:  isVideo ? 'yes' : '' },
                        content: BN('i-emoji').smiles(data.caption.text)
                    },
                    isPhoto && {
                        elem: 'spinner'
                    }
                ]
            },
            {
                elem: 'info',
                content: [
                    {
                        elem: 'top',
                        content: [
                            {
                                block: 'link',
                                mix: [
                                    {
                                        block: 'popup',
                                        elem: 'popup-author-pic'
                                    },
                                    {
                                        block: 'popup',
                                        elem: 'close-popup'
                                    }
                                ],
                                url: userUrl,
                                content: {
                                    block: 'image',
                                    mix: [{ block: 'popup', elem: 'author-pic' }],
                                    src: data.user.profile_picture
                                }
                            },
                            {
                                elem: 'user-info-inner',
                                content: [
                                    {
                                        elem: 'user-info-top',
                                        mix: [{ block: 'cf' }],
                                        content: [
                                            {
                                                block: 'link',
                                                url: userUrl,
                                                mix: [
                                                    {
                                                        block: 'popup',
                                                        elem: 'author-name'
                                                    },
                                                    {
                                                        block: 'popup',
                                                        elem: 'close-popup'
                                                    }
                                                ],
                                                content: data.user.username
                                            },
                                            {
                                                elem: 'date',
                                                content: [
                                                    {
                                                        block: 'box',
                                                        elem: 'date-post',
                                                        content: BN('i-global').timeAgo(data.created_time, true)
                                                    }
                                                ]
                                            },
                                            {
                                                elem: 'close',
                                                attrs: { 'data-name': 'Нажмите Esc для выхода' }
                                                // content: '✕'
                                            }
                                        ]
                                    },
                                    data.location && {
                                        elem: 'public-location',
                                        content: [
                                            {
                                                block: 'icon',
                                                mods: { type: 'location' }
                                            },
                                            {
                                                elem: 'loc-text',
                                                content: data.location.name ?
                                                    data.location.name :
                                                    'Показать на карте'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        elem: 'likes',
                        mix: [{ block: 'cf' }],
                        content: [
                            {
                                elem: 'like-button',
                                mods: { liked: data.user_has_liked ? 'yes' : '' },
                                content: [
                                    {
                                        block: 'icon',
                                        mods: { type: 'like', },
                                    },
                                    {
                                        elem: 'count-likes',
                                        content: data.likes.count
                                    }
                                ]
                            }
                        ]
                    },
                    // {
                    //     elem: 'vk',
                    //     content: [
                    //         {
                    //             block: 'select',
                    //             mix: [{ block: 'popup', elem: 'vk-button', mods: { type: 'to-album' } }],
                    //             content: [
                    //                 {
                    //                     elem: 'button',
                    //                     content: 'Сохранить в альбом'
                    //                 },
                    //                 {
                    //                     elem: 'content',
                    //                     content: [
                    //                         {
                    //                             elem: 'item',
                    //                             content: 'Новый год 2013'
                    //                         },
                    //                         {
                    //                             elem: 'item',
                    //                             content: 'Ялта Женщина и Я'
                    //                         },
                    //                         {
                    //                             elem: 'item',
                    //                             content: 'Фотодневник'
                    //                         },
                    //                         {
                    //                             elem: 'item',
                    //                             content: 'Мой новый альбом с длинным названием'
                    //                         }
                    //                     ]
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             elem: 'vk-button',
                    //             mods: { type: 'to-wall' },
                    //             content: 'На стену'
                    //         },
                    //         {
                    //             elem: 'vk-button',
                    //             mods: { type: 'to-avatar', pos: 'last' },
                    //             content: 'На аватарку'
                    //         }
                    //     ]
                    // },
                    {
                        elem: 'location',
                        content: [
                            {
                                block: 'map',
                                js: { data: dataMap }
                            },
                            {
                                elem: 'close-map',
                                content: '✕'
                            }
                        ]
                    },
                    // {
                    //     block: 'link',
                    //     target: '_blank',
                    //     url: 'http://www.instaphoto.ru/if2',
                    //     mix: [{ block: 'ad', mods: { type: 'popup' } }],
                    //     content: [
                    //         {
                    //             elem: 'pic'
                    //         },
                    //         {
                    //             elem: 'text',
                    //             content: 'Создай  подушку из фотографий Instagram!'
                    //         }
                    //     ]
                    // },
                    {
                        elem: 'comments',
                        content: [
                            {
                                elem: 'comments-inner',
                                mods: { more: data.comments.count < 9 ? 'hide' : '' },
                                content: [
                                    commentsCount > 0 && data.comments.data.map(function(item) {
                                        return {
                                            elem: 'item-comment',
                                            data: item
                                        };
                                    }),
                                    // commentsCount == 0 && {
                                    //     block: 'popup-adv',
                                    //     mods: { type: adv[Math.round(Math.random()*2)] },
                                    //     content: [
                                    //         {
                                    //             block: 'link',
                                    //             target: '_blank',
                                    //             mix: [{ block: 'popup-adv', elem: 'link' }],
                                    //             url: 'http://www.instaphoto.ru/if2'
                                    //         },
                                    //         {
                                    //             block: 'link',
                                    //             target: '_blank',
                                    //             url: 'http://www.instaphoto.ru/if2',
                                    //             mix: [{ block: 'popup-adv', elem: 'text' }],
                                    //             content: 'Создай продукт из своих Instagram фоток.'
                                    //         }
                                    //     ]
                                    // },
                                    commentsCount > 8 && {
                                        elem: 'more-comments',
                                        content: 'Показать еще комментарии' // TODO сделать вывод всех комментариев
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        elem: 'new-comment',
                        content: [
                            {
                                block: 'form',
                                content: [
                                    {
                                        block: 'input',
                                        mods: { type: 'comment' }
                                    },
                                    {
                                        block: 'button',
                                        mods: { type: 'comment' },
                                        content: 'Отправить'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    },

    'item-comment': function(ctx) {
        var item = ctx.json().data;

        ctx.content([
            {
                block: 'link',
                mix: [
                    {
                        block: 'popup',
                        elem: 'comment-author'
                    },
                    {
                        block: 'popup',
                        elem: 'close-popup'
                    }
                ],
                url: '/user/' + item.from.id,
                attrs: { style: 'background-image: url('+item.from.profile_picture+')' }
            },
            {
                elem: 'comment-info',
                content: [
                    {
                        block: 'link',
                        url: '/user/' + item.from.id,
                        mix: [
                            {
                                block: 'popup',
                                elem: 'comment-author-name'
                            },
                            {
                                block: 'popup',
                                elem: 'close-popup'
                            }
                        ],
                        content: item.from.username
                    },
                    {
                        elem: 'comment-date',
                        content: BN('i-global').timeAgo(item.created_time, true)
                    },
                    {
                        elem: 'comment-desc',
                        content: BN('i-emoji').smiles(item.text)
                    }
                ]
            }
        ]);
    }
});

BN.addDecl('user').blockTemplate(function(ctx) {
    var json = ctx.json(),
        data = json.data,
        bio = data.bio.replace(/[^a-z A-Z а-я А-Я 0-9 \.\/:,-]/g, ''),
        fullName = data.full_name.replace(/[^a-z A-Z а-я А-Я 0-9 \.\/:,-]/g, '');

    ctx.js(true);

    console.log(data);

    if(data.profile_picture == "http://images.ak.instagram.com/profiles/anonymousUser.jpg")
        data.profile_picture = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwP/wgALCACWAJYBAREA/8QAGwABAQEAAwEBAAAAAAAAAAAAAAgHAwUGBAr/2gAIAQEAAAAA/ZwAAAAAAAAAAAAAAAAAAABhcm9j2FeaSAAkqRC5KMAA8fJ+J8fda7UHuQAJhlDT8rvTXgAHW5hx/ZqnKAATxjGw0aAAMUnOuffAAAAAAAAAAAAAAAAAAAAP/8QAOxAAAgIBAwIDBQQFDQAAAAAAAQIDBAUGBxESIQAiMQgTFDJBFTBAUTRgYWKBFiAjJUNjcnOCkaGy8f/aAAgBAQABPwD9ed9NfZ7Q+HxC6elr1beYtW4ZLssCWJq0NWGFyascweuJHaccs6vwB2HJ5A3g3LVuoauyXPf1Woy9/wB1qxUf7eK++e6NccDUxmHf9IxeGlPc8/M2P6/+fCe0DuanzZWhJ6fPh8eOeP8ALhj9fG0+r72ttGUs1lBW+0RZuUrhqIYomkqzcRuYi7+6kkrujMAeOTyAAQB997Uj8po2Pn5XzT8f4xjV5I/0fzPZmm69D5eE/wBjqe0wP7suLxPH7PmjP32stPZnP0YRgNT5HTGUpvJLWsVCslOyzqqmHJVWU/EQgL5SDyjEnhvTxuRoPevLfCnOwx6trYhbC1L+Fjo/ESRTPGf6WlBBSyE8nYcAQv0+bueSTNo3V1dis+l9Qwsp4Ilw2RThu/l81cebt6evhNJ6pkJEem8+5HHITD5BmHPoSq1yQCfT8/FHbLcHIusdbR+fBfnpe1j56EB47fpF9a0A/i3jSWzu9GJb+r8yukYpXE1iNc/IUeQL0gzVMV8ZVsyAADzcjj6+NFae1Rg4J21RrC3qi3YSELE1SrWpUvdg9XuGSIW55HYkF2ZVK8eTnv8Afe0wcjUxmlMnQtXaghyGRpzS1J5YB12q0E0Ad4nRgxWpJ0/mOfyHhdYatQdK6o1CFHcL9s5HpB9OVX4jhWH0I7jxn6urMLt1pDWX8r9YfF6it3obsEmbufCQwiSw2L9x0TJYDWKlZpT1M6nnt08eaTVOp5TzLqPOyH+8y+Qf/tYPjYyG2m2+Gs3ZLMtnI2MneeS1LLNKyPfnggbqlZ26Hr10ZfoQefr9/lsPi87QmxmYo1sjQsdPvatqMSxMUYOjgHukkbgFWUhlI5BB8ZbbPZvBVGyGaweExdNGCmxeyNytCZCCViT3l9RJK4U8IoLNx2B8WNb7K5zEQ6ZtZnT0uG6YK8GPsR2aVSBaw5r9EkkNZafuRH5XDpx6c9++O2q2kyNeK/jNPYbIVJe8Vmret3K0nB79Lpekibg+o8Qww1oYq9eKKvXrxRwwQQxpFDDDEgSKKKJAqRxRooCqAAAOB+A11Q0tnt28Fg9c2w+Fk0hJLhcdJdtUqkuelydhZhYnq2IXryzUa/MZLRrMyKnUW6UfSlvZfP6wGFm0HeoYzJWJq2NyF3VmUeKAoHNVrFOJq0tQXUTz9VuyIpGABK8sNg62KpXtx6WCycmSwlXPUosXIzlkNQJkPdzr2VXaUDoaVVVZREGA44/A7s7QwbhCtksfahxuoaUPwyT2FkNS7U62kSvbMSySxNA7s0bqrHzEEEcFavs57iTWxBOuGp1+rhr0mSEsPTwSWSKCKS0x7cAFF7n6Dkjbzb3E7eYZsdQdrd220c2VykqCOW/YjVljAjDOIKtcOwijBPSGJJLMxP4T+PH7f/eR+s3/2Q==';

    ctx.content([
        {
            elem: 'inner',
            content: [
                {
                    block: 'link',
                    url: '/user/' + data.id,
                    mix: [{ block: 'user', elem: 'avatar' }],
                    attrs: { style: 'background-image: url('+ data.profile_picture +')' }
                },
                {
                    elem: 'info',
                    content: [
                        {
                            block: 'link',
                            url: '/user/' + data.id,
                            mix: [{ block: 'user', elem: 'name' }],
                            content: data.username
                        }
                    ]
                }
            ]
        }
    ]);
});
